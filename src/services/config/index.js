'use strict';
const Confidence = require('confidence');
const Dotenv = require('dotenv');


Dotenv.config({ silent: false });

const criteria = {
  env: process.env.NODE_ENV
};


const config = {
  name: 'vipimo',
  defaultPath: 'csystem/home',
  defaultAppName: 'CSYMAPP',
  version: '3.0.1',
  apiRoot: 'http://localhost:3000/',
  myRoot: 'http://localhost:8080/'

};


const store = new Confidence.Store(config);


exports.get = function (key) {

  return store.get(key, criteria);
};


exports.meta = function (key) {

  return store.meta(key, criteria);
};