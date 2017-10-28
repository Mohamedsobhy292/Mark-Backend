const config = {
  development: {
    database: {
      url: 'mongodb://localhost/marky',
    },
    server: {
      host: '127.0.0.1',
      port: '3422',
    },
  },
  production: {
    // url to be used in link generation
    url: 'http://my.site.com',
    // mongodb connection settings
    database: {
      host: '127.0.0.1',
      port: '27017',
      db: 'site',
    },
    // server details
    server: {
      host: '127.0.0.1',
      port: '3421',
    },
  },
  jwt: {
    secret: 'jwtsecret',
  },
  google: {
    clientId: 'googleClientId',
    secret: 'googleSecret',
  },
  facebook: {
    clientId: 'facebookClientId',
    secret: 'facebookSecret',
  },
};
module.exports = config;
