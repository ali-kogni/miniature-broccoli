import { redirect } from '@sveltejs/kit';

export default class RequestClientFE {
	constructor({ fetch, url, method, body, redirectIfRequestFails = true }) {
		this.redirectIfRequestFails = redirectIfRequestFails;
		this.fetch = fetch;
		this.method = method;
		this.url = `${url}`;
		this.body = body;
		this.headers = {
			'Content-Type': 'application/json'
		};
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

	async performRequest() {
		const requestConfig = this.buildFetchConfig();
		console.log(`Sending data to svelte api ${this.url}`, requestConfig);
		let response;

		// if we receive a fetch svelte function, we use it, otherwise standard fetch
		if (this.fetch) {
			response = await this.fetch(this.url, requestConfig);
		} else {
			response = await fetch(this.url, requestConfig);
		}

		const responseData = await response.json();
		console.log('response from Backend in FEClient', {
			data: JSON.stringify(responseData),
			status: response.status
		});

		if (response.status >= 400) {
			console.log('Response error from BE client', responseData?.error);
			switch (responseData?.error) {
				case 1002:
					if (this.redirectIfRequestFails) throw redirect(302, '/phone/configure');
					break;
				case 1001:
					if (this.redirectIfRequestFails) throw redirect(302, '/dashboard/subscriptions');
					break;
				case 1000:
					if (this.redirectIfRequestFails)
						throw redirect(
							302,
							`/login?tlexp=true${
								this.redirectErrorUrlParam ? `&message=${this.redirectErrorUrlParam}` : ''
							}`
						);
					break;
				default:
					break;
			}
			return { success: false, browserError: responseData?.error };
		}

		return { response, responseData, success: true };
	}
}
