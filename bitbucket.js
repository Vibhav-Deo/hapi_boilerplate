const { Bitbucket } = require('bitbucket')
const clientOptions = {
      baseUrl: 'https://api.bitbucket.org/2.0',
  request: {
    timeout: 10,
  },
    auth: {
      username: 'GauthamR1993',
      password: 'Gautham$8123',
    },
}
const bitbucket = new Bitbucket(clientOptions)
// process.env.DEBUG = bitbucket;

//const { data, headers } = await bitbucket.repositories.get({ apichecker, GauthamR1993})

 async function handler (){
     
    try {
        var response = {data,headers}
        response = await bitbucket.repositories.getCommit({fc7236b,apichecker,GauthamR1993})
      } catch (err) {
        const { message, error, headers, request, status } = err
      }
      console.log(typeof(response))
};

handler();