// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			session: import('svelte-kit-cookie-session').Session<SessionData>;
		}

		interface PageData {
			session: SessionData;
		}
	}
}

export {};
