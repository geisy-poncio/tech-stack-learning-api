import serverlessHttp from "serverless-http"

import {app} from "./app"

const h = serverlessHttp(app)

export async function handler (event: any, context: any) {
    const result = await h(event, context);
    return result;
} 
