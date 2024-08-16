const webpack = require('webpack');
const dotenv = require('dotenv');

const env = dotenv.config().parsed;
const envKeys = Object.keys(env).reduce((acc, val) => {
  acc[`process.env.${val}`] = JSON.stringify(env[val]);
  return acc;
}, {});

module.exports = {
  plugins: [
    new webpack.DefinePlugin(envKeys),
  ],
};