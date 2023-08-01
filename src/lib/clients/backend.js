import { logToConsole } from '$lib/utils/utils.js';
import * as Sentry from '@sentry/node';

export default class RequestClientBE {
	constructor({ url, method, locals, body, token, redirectIfRequestFails = true }) {
		this.method = method;
		this.redirectIfRequestFails = redirectIfRequestFails;
		this.url = `${import.meta.env.VITE_BE_BASE_URL}${url}`;
		this.body = body;
		this.headers = {
			'Content-Type': 'application/json',
			'x-api-key': import.meta.env.VITE_BE_API_KEY
		};
		this.locals = locals;

		if (locals?.session?.data?.usr?.token) {
			this.headers.Authorization = `Bearer ${locals.session.data.usr.token}`;
		} else if (token) {
			this.headers.Authorization = `Bearer ${token}`;
		}
	}

	buildFetchConfig() {
		let config = {
			method: this.method,
			headers: this.headers,
			credentials: 'include'
		};

		if (this.body) {
			config.body = JSON.stringify(this.body);
		}
		return config;
	}

	destroySessionIfExpired(error_code, status) {
		if (error_code === 'Authentication.InvalidBearerToken') {
			this.locals.session.destroy();
		}

		if (error_code && status !== 422 && error_code !== 'Authentication.InvalidBearerToken') {
			return error_code;
		}
		return null;
	}

	errorShouldBeLogged(errorCode) {
		const errorsThatShouldNotBeLogged = {
			'Authentication.InvalidBearerToken': true,
			'Subscriptions.MembershipExpired': true,
			'Accounts.InvalidLoginCredentials': true,
			'Accounts.AccountNotConfirmed': true,
			'Accounts.CreateAccountEmailTaken': true,
			'Accounts.PhoneAlreadyInUse': true,
			'Twilio.VerifyTokenIsIncorrect': true,
			'Accounts.AccountPhoneNumberMissing': true,
			TooManyRequests: true
		};

		return !Object.hasOwnProperty.call(errorsThatShouldNotBeLogged, errorCode);
	}

	logErrorToSentry(error_code, status, responseData) {
		if (this.errorShouldBeLogged(error_code) && status !== 422) {
			logToConsole('logging error to sentry', error_code);
			Sentry.withScope((scope) => {
				// Add additional context to the captured exception
				scope.setExtras({
					user: {
						id: this?.locals?.session?.usr?.id,
						email: this?.locals?.session?.usr?.email
					},
					environment: import.meta.env.VITE_PUBLIC_ENVIRONMENT
				});

				scope.setFingerprint([this.url, error_code]);

				// Capture the exception
				Sentry.captureException(new Error(JSON.stringify(responseData)));
			});
		}
	}

	async performRequest() {
		const requestConfig = this.buildFetchConfig();
		const response = await fetch(this.url, requestConfig);
		logToConsole(`Sending data to BE ${this.url}`, requestConfig);

		const responseData = await response.json();
		const status = response.status;
		const error_code = responseData?.errors?.error_code || null;
		logToConsole('response from Backend', {
			data: JSON.stringify(responseData),
			status: status,
			error_code
		});

		this.destroySessionIfExpired(error_code, status);

		if (error_code) {
			this.logErrorToSentry(error_code, status, responseData);
			return {
				response: { status: status },
				responseData: {
					error: getClientFacingErrorDescription(error_code)
				}
			};
		}

		// returning success standard response
		return { response: { status: status }, responseData };
	}
}

const GENERIC_ERROR_MESSAGE =
	'Hubo un error al procesar tu solicitud. Por favor, intenta nuevamente.';

export const BROWSER_ERROR_CODES = {
	'Authentication.InvalidBearerToken': 1000,
	'Subscriptions.MembershipExpired': 1001,
	'Accounts.AccountPhoneNumberMissing': 1002,
	'Accounts.PhoneAlreadyInUse': 'Este número de teléfono ya ha sido registrado',
	'Accounts.InvalidLoginCredentials':
		'Correo o contraseña incorrectos. Por favor, intenta nuevamente.',
	'Accounts.CreateAccountEmailTaken': 'Ya existe un registro con este correo.',
	'Accounts.AccountNotConfirmed': 'Por favor, confirma tu cuenta antes de iniciar sesión.',
	TooManyRequests: 'Has enviado varias peticiones en poco tiempo. Por favor espera unos minutos.',
	'Twilio.VerifyTokenIsIncorrect': 'El código de verificación es incorrecto.',
	'WaitingLists.AccountAlreadyInWaitingList': 'Ya te has suscrito a esta lista de espera.'
};

const getClientFacingErrorDescription = (code) =>
	BROWSER_ERROR_CODES[code] || GENERIC_ERROR_MESSAGE;
