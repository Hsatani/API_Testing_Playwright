import { request } from "@playwright/test";
import { config } from "../api-test.config";
import { RequestHandler } from "../utils/request-handler";




export async function createToken(email: string, password: string) {

    const context = await request.newContext();
    const api = new RequestHandler(context, config.apiUrl)

    try{
        const tokenResponse = await api
        .path('/auth/login')
        .body({"user": {"email": email, "password": password} })
        .postRequest(200)

        return 'Token'+ tokenResponse.user.token
    } catch(error) {
       // Error.captureStackTrace(error, createToken);
        throw error;
    } finally {
        await context.dispose();
    }
    
}