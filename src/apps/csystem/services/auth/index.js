'use strict';

const axios = require('axios')

class auth{
  constructor() {

  }

  async emailLogin(options) {
    return new Promise(function(resolve, reject) {
      let url = 'http://localhost:3000/csymapp/auth/login'
      let params = {
        "email": options.email,
        "password":options.password
      }
		  axios.post(url, params)
			.then(function (response) {
				return resolve(response);
			})
			.catch(function (error) {
        console.log(error.response)
				return reject(error.response);
			});
		});
    
  }
}

function authFunc() {
  // return new 

}

let authInstance = new auth();

// exports.authService = function (key) {

//   return authInstance;
// };

export default function authService() {
  return authInstance;
};