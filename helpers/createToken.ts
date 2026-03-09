import { request } from "@playwright/test";
import { config } from "../api-test.config";
import { RequestHandler } from "../utils/request-handler";




export async function createToken(username: string, password: string) {

    const context = await request.newContext();
    const api = new RequestHandler(context, config.apiUrl)

    try{
        const tokenResponse = await api
        .path('/auth/login')
        .headers({'Content-Type' : 'application/json'})
        .body({ username: "michaelw", password: "michaelwpass" })  // data: { "username": "michaelw", "password": "michaelwpass"  }
        .postRequest(200)
        console.log('Token Response' + tokenResponse.accessToken)

        return 'Bearer'+ tokenResponse.accessToken

    } catch(error) {
       // Error.captureStackTrace(error, createToken);
        throw error;
    } finally {
        await context.dispose();
    }
    
}