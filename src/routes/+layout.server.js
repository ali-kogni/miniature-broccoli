export function load({ locals }) {
	return {
		session: locals?.session?.data ? locals.session.data : null
	};
}
