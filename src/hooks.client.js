import * as SentrySvelte from '@sentry/svelte';

SentrySvelte.init({
	dsn: import.meta.env.VITE_PUBLIC_SENTRY_DNS,
	// Performance Monitoring
	tracesSampleRate: 0.5, // Capture 100% of the transactions, reduce in production!
	// Session Replay
	replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
	replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
	integrations: [new SentrySvelte.BrowserTracing(), new SentrySvelte.Replay()],
	environment: import.meta.env.VITE_PUBLIC_ENVIRONMENT
});

SentrySvelte.setTag('svelteKit', 'browser');

export async function handleError({ error, event }) {
	const errorId = crypto.randomUUID();
	// example integration with https://sentry.io/
	SentrySvelte.captureException(error, { event, errorId });
	return {
		message: error.message,
		errorId
	};
}
