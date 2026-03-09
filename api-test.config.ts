const processENV = process.env.TEST_ENV
const env = processENV || 'qa'
console.log('Test environment is: ' + env)

const config = {
    apiUrl: 'https://dummyjson.com',
    username: '',
    password: ''
}

if(env === 'qa'){
    config.username = 'michaelw',
    config.password = 'michaelwpass'
}
if(env === 'prod'){
    config.username = '',
    config.password = ''
}


export {config}