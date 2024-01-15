import { CognitoIdentityProviderClient, DescribeUserPoolClientCommand } from "@aws-sdk/client-cognito-identity-provider";
import crypto from "crypto";

export async function getSecretHash(username: string) {
    console.log("getSecretHash::creating secret hash");

    const client = new CognitoIdentityProviderClient()
    const describeUserPoolClientCommand = new DescribeUserPoolClientCommand({
        ClientId: String(process.env.COGNITO_CLIENT_ID),
        UserPoolId: String(process.env.COGNITO_USER_POOL_ID)
    })

    const result = await client.send(describeUserPoolClientCommand)
    process.env.COGNITO_CLIENT_SECRET = result.UserPoolClient?.ClientSecret
    
    const hasher = crypto.createHmac('sha256', String(process.env.COGNITO_CLIENT_SECRET));
    hasher.update(`${username}${process.env.COGNITO_CLIENT_ID}`);
    const secretHash = hasher.digest('base64');

    console.log("getSecretHash::secret hash created with success:", secretHash);

    return secretHash;
}