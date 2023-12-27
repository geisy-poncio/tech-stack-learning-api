import crypto from "crypto";

export async function getSecretHash(username: string) {
    console.log("getSecretHash::creating secret hash");
    const hasher = crypto.createHmac('sha256', String(process.env.COGNITO_CLIENT_SECRET));
    hasher.update(`${username}${process.env.COGNITO_CLIENT_ID}`);
    const secretHash = hasher.digest('base64');
    console.log("getSecretHash::secret hash created with success:", secretHash);

    return secretHash;
}