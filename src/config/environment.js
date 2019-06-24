require('dotenv').config();

const env = {
  PORT: process.env.PORT || 5000,
  DATABASE_URL: process.env.NODE_ENV == 'test'? process.env.DATABASE_URL_TEST : process.env.DATABASE_URL,
  NODE_ENV: process.env.NODE_ENV || 'production',
};

module.exports = env;
