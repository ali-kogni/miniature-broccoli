import crypto from "crypto"

export const POST = async ({ request }) => {
  const file = await request.text()

  const shasum = crypto.createHash('sha1')
  shasum.update(file)

  const hash = shasum.digest('hex')

  return new Response(hash, { status: 200 });
};
