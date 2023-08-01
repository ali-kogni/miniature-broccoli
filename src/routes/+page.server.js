import { redirect } from '@sveltejs/kit';

export function load({ locals }) {
	if (locals?.session?.data?.usr) throw redirect(302, '/dashboard');
}
