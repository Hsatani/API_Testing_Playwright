import {request,  expect} from '@playwright/test';
import {test} from '../utils/fixtures'

let authToken: string;

test.beforeAll('Get token', async ({api}) => {   

   const toeknResponse = await api
        .path('/auth/login')
        .headers({'Content-Type': 'application/json'})
        .body( { username: "michaelw", password: "michaelwpass"})
        .postRequest(200);

    authToken = toeknResponse.accessToken; 
})

test('Get user info using valid token', async ({api}) => {   

    const response = await api
        .path('/auth/me')
        .headers({'Authorization': `Bearer ${authToken}`})
        .getRequest(200);

    console.log(response)

})