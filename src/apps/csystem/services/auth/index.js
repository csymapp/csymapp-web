'use strict';

const axios = require('axios')
// const config = require('../../../services/config')
import config from '@/services/config'
import to from 'await-to-js';

class auth{
  constructor() {

  }

  async emailLogin(options) {
    return new Promise(function(resolve, reject) {
      let apiRoot = config.get('/apiRoot');
      let url = apiRoot + 'csymapp/auth/login'
      let params = {
        "email": options.email,
        "password":options.password
      }
		  axios.post(url, params)
			.then(function (response) {
				return resolve(response);
			})
			.catch(function (error) {
				return reject(error.response || {data:{error:error.message}});
			});
		});
    
  }

  async githubLogin(state) {
    let self = this,
      token = state.token,
      uid = self.getUid(state.user.userdata)
      if(token === null)
      return new Promise(function(resolve, reject) {
        let apiRoot = config.get('/apiRoot');
        let url = apiRoot + 'csymapp/auth/github'

        // redirect
        let href = window.location.href
        url += '?redirect='+href
        // console.log(url)
        window.location = url
       
      });

  }

  getUid(user) {
    return user.uid || 0;
  }
  async emailRegister(options) {
    let self = this,
      state = options.state,
      token = self.getToken(state),
      uid = options.uid
    if(token === null)
      return new Promise(function(resolve, reject) {
        let apiRoot = config.get('/apiRoot');
        let url = apiRoot + 'csymapp/user/'
        let params = {
          "email": options.email,
          "password":options.password,
          "cpassword":options.cpassword
        }
        axios.post(url, params)
        .then(function (response) {
          return resolve(response);
        })
        .catch(function (error) {
          return reject(error.response || {data:{error:error.message}});
        });
      });
    else 
    return new Promise(function(resolve, reject) {
      let apiRoot = config.get('/apiRoot');
      let url = apiRoot + 'csymapp/user/' + uid
      let params = {
        "email": options.email,
        "password":options.password,
        "cpassword":options.cpassword
      }
      let headers = {
        'content-type': 'application/json',
        'Authorization': `bearer ${token}`
      }
      axios.post(url, params,  {headers: headers})
      .then(function (response) {
        return resolve(response);
      })
      .catch(function (error) {
        return reject(error.response || {data:{error:error.message}});
      });
    });
    
  }

  getUserEmail(user) {
    let emails = [];
    let tuser = user.userdata;
    if(tuser.Emailprofiles) 
      for(let i in tuser.Emailprofiles)
        emails.push(tuser.Emailprofiles[i].Email)
    
    if(tuser.Githubs) 
      for(let i in tuser.Githubs)
        emails.push(tuser.Githubs[i].Email)
    
    
    if(tuser.Facebooks) 
      for(let i in tuser.Facebooks)
        emails.push(tuser.Facebooks[i].Email)
    console.log(tuser)
    if(emails.length) return emails[Math.floor(Math.random()*emails.length)];
    return user.defaultEmail;

  }

  async loginusingToken(token) {
    function sendToken(token) {
      return new Promise(function(resolve, reject) {
        let apiRoot = config.get('/apiRoot');
        let url = apiRoot + 'csymapp/auth/token'
        let params = {
          token: token
        }
        let headers = {
          'content-type': 'application/json',
          'Authorization': `bearer ${token}`
        }
        url += '?token=' + token
        axios.get(url, params,  {headers: headers})
        .then(function (response) {
          return resolve(response);
        })
        .catch(function (error) {
          return reject(error.response || {data:{error:error.message}});
        });
      });
    }
    let [err, care] = await to(sendToken(token))
    if(err) throw(err)
    return care;
  }

  getUserName(user) {
    let tuser = user.userdata;
    return tuser.Name || 'Guest'

  }

  getToken(state) {
    if(state.isLoggedIn === false) return null;
    return state.token
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