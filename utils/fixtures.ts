import {test as base} from '@playwright/test'
import { RequestHandler } from './request-handler'
import { config } from '../api-test.config';
import { createToken } from '../helpers/createToken';


export type TestOptions = {
    api: RequestHandler
    config: typeof config    

}

// export type WorkerFixture = {
//     authToken : string
// }

export const test = base.extend<TestOptions>({

    // authToken: [ async({}, use) => {
    //     const authToken = await createToken(config.username, config.password);
    //     await use(authToken);
    // }, {scope: 'worker'}],

    api: async({request}, use) => {
        const requestHandler = new RequestHandler(request, config.apiUrl);
        await use(requestHandler);
    },
    config: async({}, use) => {
        await use(config);
    }


})