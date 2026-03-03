import {test,request,  expect} from '@playwright/test';

test('test post request', async ({request}) => {

   const  tokenResponse = await request.post('https://dummyjson.com/auth/login', {
   data: { "username": "michaelw", "password": "michaelwpass"  }   
   });
   const tokenResponseJSON = await tokenResponse.json();
   const authToken = tokenResponseJSON.accessToken;   

   const currentUserResponse = await request.get('https://dummyjson.com/auth/me', {
      headers:{ Authorization : `Bearer ${authToken}`}
   })

   const currentUserResponseJSON = await currentUserResponse.json();
   console.log(currentUserResponseJSON);
   expect(currentUserResponse.status()).toEqual(200);

})

