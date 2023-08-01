import RequestClientBE from '$lib/clients/backend';

export const POST = async ({ locals, request }) => {
	const { official_id_document_front_file } = await request.json();

	const url = '/companies/registries/';

	const requestClient = new RequestClientBE({
		url,
		locals,
		method: 'POST',
		body: {
			official_id_document_front_file
		}
	});

	const { response, responseData } = await requestClient.performRequest();

	return new Response(JSON.stringify({ ...responseData }), { status: response.status });
};
