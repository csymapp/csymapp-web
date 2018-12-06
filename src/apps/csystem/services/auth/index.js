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
  async telephoneLogin(options) {
    return new Promise(function(resolve, reject) {
      let apiRoot = config.get('/apiRoot');
      let url = apiRoot + 'csymapp/telephoneprofile/'
      let params = {
        "phone": options.phone,
        "code":options.code,
        "pin":options.pin,
        "type":"login"
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
  
  async getTelephoneCode(phone) {
    return new Promise(function(resolve, reject) {
      let apiRoot = config.get('/apiRoot');
      let url = apiRoot + 'csymapp/telephoneprofile/'+phone
     
		  axios.get(url)
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
      // if(token === null)
      return new Promise(function(resolve, reject) {
        let apiRoot = config.get('/apiRoot');
        let url = apiRoot + 'csymapp/auth/github'

        // redirect
        let href = window.location.href
        if(token !==null)
          url += `?token=${token}&redirect=${href}`
        else url += '?redirect='+href
        
        window.location = url
       
      });
      // else 

  }

  
  async googleLogin(state) {
    let self = this,
      token = state.token,
      uid = self.getUid(state.user.userdata)
      // if(token === null)
      return new Promise(function(resolve, reject) {
        let apiRoot = config.get('/apiRoot');
        let url = apiRoot + 'csymapp/auth/google'

        // redirect
        let href = window.location.href
        if(token !==null)
          url += `?token=${token}&redirect=${href}`
        else url += '?redirect='+href
        // console.log(url)
        window.location = url
       
      });

  }

  
  async linkedinLogin(state) {
    let self = this,
      token = state.token,
      uid = self.getUid(state.user.userdata)
      // if(token === null)
      return new Promise(function(resolve, reject) {
        let apiRoot = config.get('/apiRoot');
        let url = apiRoot + 'csymapp/auth/linkedin'

        // redirect
        let href = window.location.href
        if(token !==null)
          url += `?token=${token}&redirect=${href}`
        else url += '?redirect='+href
        // console.log(url)
        window.location = url
       
      });

  }



  
  async facebookLogin(state) {
    let self = this,
      token = state.token,
      uid = self.getUid(state.user.userdata)
      // if(token === null)
      return new Promise(function(resolve, reject) {
        let apiRoot = config.get('/apiRoot');
        let url = apiRoot + 'csymapp/auth/facebook'

        // redirect
        let href = window.location.href
        if(token !==null)
          url += `?token=${token}&redirect=${href}`
        else url += '?redirect='+href
        console.log(url)
        window.location = url
       
      });

  }

  
  async twitterLogin(state) {
    let self = this,
      token = state.token,
      uid = self.getUid(state.user.userdata)
      // if(token === null)
      return new Promise(function(resolve, reject) {
        let apiRoot = config.get('/apiRoot');
        let url = apiRoot + 'csymapp/auth/twitter'

        // redirect
        let href = window.location.href
        if(token !==null)
          url += `?token=${token}&redirect=${href}`
        else url += '?redirect='+href
        console.log(url)
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
    else {
      // console.log('having token....')
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
    
  }
  async phoneRegister(options) {
    let self = this,
      state = options.state,
      token = self.getToken(state),
      uid = options.uid
    if(token === null)
      return new Promise(function(resolve, reject) {
        let apiRoot = config.get('/apiRoot');
        let url = apiRoot + 'csymapp/user/'
        let params = {
          "phone": options.phone,
          "pin":options.pin,
          "cpin":options.cpin,
          "profile":"phone"
        }
        console.log(params)
        axios.post(url, params)
        .then(function (response) {
          return resolve(response);
        })
        .catch(function (error) {
          return reject(error.response || {data:{error:error.message}});
        });
      });
    else {
      // console.log('having token....')
    return new Promise(function(resolve, reject) {
      let apiRoot = config.get('/apiRoot');
      let url = apiRoot + 'csymapp/user/' + uid
      let params = {
        "phone": options.phone,
        "pin":options.pin,
        "cpin":options.cpin,
        "profile":"phone"
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
    
  }

  async fetchUser(options) {
    let self = this,
      state = options.state,
      token = self.getToken(state),
      uid = options.uid
      if(token === null) return {};
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
        axios.get(url, params,  {headers: headers})
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

  findValuesHelper(obj, key, list) {
    let self = this
    if (!obj) return list;
    if (obj instanceof Array) {
      for (var i in obj) {
          list = list.concat(self.findValuesHelper(obj[i], key, []));
      }
      return list;
    }
    if (obj[key]) list.push(obj[key]);
  
    if ((typeof obj == "object") && (obj !== null) ){
      var children = Object.keys(obj);
      if (children.length > 0){
        for (i = 0; i < children.length; i++ ){
            list = list.concat(self.findValuesHelper(obj[children[i]], key, []));
        }
      }
    }
    return list;
  }

  async inactivateEmail(state, emailid) {
    let self = this,
      token = self.getToken(state),
      uid = state.user.userdata.uid
      if(token === null) token = '';

      return new Promise(function(resolve, reject) {
        let apiRoot = config.get('/apiRoot');
        let url = apiRoot + 'csymapp/emailprofile/' + emailid
        let params = {
          "IsActive": false
        }
        let headers = {
          'content-type': 'application/json',
          'Authorization': `bearer ${token}`
        }
        axios.patch(url, params,  {headers: headers})
        .then(function (response) {
          return resolve(response);
        })
        .catch(function (error) {
          return reject(error.response || {data:{error:error.message}});
        });
      });
  }

  
  async deactivateTelephone(state, puid) {
    let self = this,
      token = self.getToken(state),
      uid = state.user.userdata.uid
      if(token === null) token = '';

      return new Promise(function(resolve, reject) {
        let apiRoot = config.get('/apiRoot');
        let url = apiRoot + 'csymapp/telephoneprofile/' + puid
        let params = {
          "IsActive": false
        }
        let headers = {
          'content-type': 'application/json',
          'Authorization': `bearer ${token}`
        }
        axios.patch(url, params,  {headers: headers})
        .then(function (response) {
          return resolve(response);
        })
        .catch(function (error) {
          return reject(error.response || {data:{error:error.message}});
        });
      });
  }



  
  async inactivateGoogle(state, guid) {
    let self = this,
      token = self.getToken(state),
      uid = state.user.userdata.uid
      if(token === null) token = '';

      return new Promise(function(resolve, reject) {
        let apiRoot = config.get('/apiRoot');
        let url = apiRoot + 'csymapp/googleprofile/' + guid
        let params = {
          "IsActive": false
        }
        let headers = {
          'content-type': 'application/json',
          'Authorization': `bearer ${token}`
        }
        axios.patch(url, params,  {headers: headers})
        .then(function (response) {
          return resolve(response);
        })
        .catch(function (error) {
          return reject(error.response || {data:{error:error.message}});
        });
      });
  }

  
  async inactivateFacebook(state, guid) {
    let self = this,
      token = self.getToken(state),
      uid = state.user.userdata.uid
      if(token === null) token = '';

      return new Promise(function(resolve, reject) {
        let apiRoot = config.get('/apiRoot');
        let url = apiRoot + 'csymapp/facebookprofile/' + guid
        let params = {
          "IsActive": false
        }
        let headers = {
          'content-type': 'application/json',
          'Authorization': `bearer ${token}`
        }
        axios.patch(url, params,  {headers: headers})
        .then(function (response) {
          return resolve(response);
        })
        .catch(function (error) {
          return reject(error.response || {data:{error:error.message}});
        });
      });
  }

  async inactivateLinkedin(state, guid) {
    let self = this,
      token = self.getToken(state),
      uid = state.user.userdata.uid
      if(token === null) token = '';

      return new Promise(function(resolve, reject) {
        let apiRoot = config.get('/apiRoot');
        let url = apiRoot + 'csymapp/linkedinprofile/' + guid
        let params = {
          "IsActive": false
        }
        let headers = {
          'content-type': 'application/json',
          'Authorization': `bearer ${token}`
        }
        axios.patch(url, params,  {headers: headers})
        .then(function (response) {
          return resolve(response);
        })
        .catch(function (error) {
          return reject(error.response || {data:{error:error.message}});
        });
      });
  }

  
  async inactivateTwitter(state, guid) {
    let self = this,
      token = self.getToken(state),
      uid = state.user.userdata.uid
      if(token === null) token = '';

      return new Promise(function(resolve, reject) {
        let apiRoot = config.get('/apiRoot');
        let url = apiRoot + 'csymapp/twitterprofile/' + guid
        let params = {
          "IsActive": false
        }
        let headers = {
          'content-type': 'application/json',
          'Authorization': `bearer ${token}`
        }
        axios.patch(url, params,  {headers: headers})
        .then(function (response) {
          return resolve(response);
        })
        .catch(function (error) {
          return reject(error.response || {data:{error:error.message}});
        });
      });
  }





  
  async inactivateGithub(state, guid) {
    let self = this,
      token = self.getToken(state),
      uid = state.user.userdata.uid
      if(token === null) token = '';

      return new Promise(function(resolve, reject) {
        let apiRoot = config.get('/apiRoot');
        let url = apiRoot + 'csymapp/githubprofile/' + guid
        let params = {
          "IsActive": false
        }
        let headers = {
          'content-type': 'application/json',
          'Authorization': `bearer ${token}`
        }
        axios.patch(url, params,  {headers: headers})
        .then(function (response) {
          return resolve(response);
        })
        .catch(function (error) {
          return reject(error.response || {data:{error:error.message}});
        });
      });
  }

  async activateTelephone(state, puid, Code) {
    let self = this,
      token = self.getToken(state),
      uid = state.user.userdata.uid
      if(token === null) token = '';

      return new Promise(function(resolve, reject) {
        let apiRoot = config.get('/apiRoot');
        let url = apiRoot + 'csymapp/telephoneprofile/' + puid
        let params = {
          "IsActive": true,
          Code
        }
        let headers = {
          'content-type': 'application/json',
          'Authorization': `bearer ${token}`
        }
        axios.patch(url, params,  {headers: headers})
        .then(function (response) {
          return resolve(response);
        })
        .catch(function (error) {
          return reject(error.response || {data:{error:error.message}});
        });
      });
  }



  

  async activateEmail(state, emailid) {
    let self = this,
      token = self.getToken(state),
      uid = state.user.userdata.uid
      if(token === null) token = '';

      return new Promise(function(resolve, reject) {
        let apiRoot = config.get('/apiRoot');
        let url = apiRoot + 'csymapp/emailprofile/' + emailid
        let params = {
          "IsActive": true
        }
        let headers = {
          'content-type': 'application/json',
          'Authorization': `bearer ${token}`
        }
        axios.patch(url, params,  {headers: headers})
        .then(function (response) {
          return resolve(response);
        })
        .catch(function (error) {
          return reject(error.response || {data:{error:error.message}});
        });
      });
  }


  

  async activateGoogle(state, emailid) {
    let self = this,
      token = self.getToken(state),
      uid = state.user.userdata.uid
      if(token === null) token = '';

      return new Promise(function(resolve, reject) {
        let apiRoot = config.get('/apiRoot');
        let url = apiRoot + 'csymapp/googleprofile/' + emailid
        let params = {
          "IsActive": true
        }
        let headers = {
          'content-type': 'application/json',
          'Authorization': `bearer ${token}`
        }
        axios.patch(url, params,  {headers: headers})
        .then(function (response) {
          return resolve(response);
        })
        .catch(function (error) {
          return reject(error.response || {data:{error:error.message}});
        });
      });
  }

  
  async activateFacebook(state, emailid) {
    let self = this,
      token = self.getToken(state),
      uid = state.user.userdata.uid
      if(token === null) token = '';

      return new Promise(function(resolve, reject) {
        let apiRoot = config.get('/apiRoot');
        let url = apiRoot + 'csymapp/facebookprofile/' + emailid
        let params = {
          "IsActive": true
        }
        let headers = {
          'content-type': 'application/json',
          'Authorization': `bearer ${token}`
        }
        axios.patch(url, params,  {headers: headers})
        .then(function (response) {
          return resolve(response);
        })
        .catch(function (error) {
          return reject(error.response || {data:{error:error.message}});
        });
      });
  }
  async activateLinkedin(state, emailid) {
    let self = this,
      token = self.getToken(state),
      uid = state.user.userdata.uid
      if(token === null) token = '';

      return new Promise(function(resolve, reject) {
        let apiRoot = config.get('/apiRoot');
        let url = apiRoot + 'csymapp/linkedinprofile/' + emailid
        let params = {
          "IsActive": true
        }
        let headers = {
          'content-type': 'application/json',
          'Authorization': `bearer ${token}`
        }
        axios.patch(url, params,  {headers: headers})
        .then(function (response) {
          return resolve(response);
        })
        .catch(function (error) {
          return reject(error.response || {data:{error:error.message}});
        });
      });
  }



  
  async activateGithub(state, emailid) {
    let self = this,
      token = self.getToken(state),
      uid = state.user.userdata.uid
      if(token === null) token = '';

      return new Promise(function(resolve, reject) {
        let apiRoot = config.get('/apiRoot');
        let url = apiRoot + 'csymapp/githubprofile/' + emailid
        let params = {
          "IsActive": true
        }
        let headers = {
          'content-type': 'application/json',
          'Authorization': `bearer ${token}`
        }
        axios.patch(url, params,  {headers: headers})
        .then(function (response) {
          return resolve(response);
        })
        .catch(function (error) {
          return reject(error.response || {data:{error:error.message}});
        });
      });
  }

  async activateTwitter(state, emailid) {
    let self = this,
      token = self.getToken(state),
      uid = state.user.userdata.uid
      if(token === null) token = '';

      return new Promise(function(resolve, reject) {
        let apiRoot = config.get('/apiRoot');
        let url = apiRoot + 'csymapp/twitterprofile/' + emailid
        let params = {
          "IsActive": true
        }
        let headers = {
          'content-type': 'application/json',
          'Authorization': `bearer ${token}`
        }
        axios.patch(url, params,  {headers: headers})
        .then(function (response) {
          return resolve(response);
        })
        .catch(function (error) {
          return reject(error.response || {data:{error:error.message}});
        });
      });
  }



  
  async changepwd(state, emailid, password) {
    let self = this,
      token = self.getToken(state),
      uid = state.user.userdata.uid
      if(token === null) token = '';

      return new Promise(function(resolve, reject) {
        let apiRoot = config.get('/apiRoot');
        let url = apiRoot + 'csymapp/emailprofile/' + emailid
        let params = {
          "Password": password,
          "Cpassword": password
        }
        let headers = {
          'content-type': 'application/json',
          'Authorization': `bearer ${token}`
        }
        axios.patch(url, params,  {headers: headers})
        .then(function (response) {
          return resolve(response);
        })
        .catch(function (error) {
          return reject(error.response || {data:{error:error.message}});
        });
      });
  }

  
  async changePin(state, phoneid, pin) {
    let self = this,
      token = self.getToken(state),
      uid = state.user.userdata.uid
      if(token === null) token = '';

      return new Promise(function(resolve, reject) {
        let apiRoot = config.get('/apiRoot');
        let url = apiRoot + 'csymapp/telephoneprofile/' + phoneid
        let params = {
          "Pin": pin,
          "Cpin": pin
        }
        let headers = {
          'content-type': 'application/json',
          'Authorization': `bearer ${token}`
        }
        axios.patch(url, params,  {headers: headers})
        .then(function (response) {
          return resolve(response);
        })
        .catch(function (error) {
          return reject(error.response || {data:{error:error.message}});
        });
      });
  }
  
  async deleteEmail(state, emailid) {
    let self = this,
      token = self.getToken(state),
      uid = state.user.userdata.uid
      if(token === null) token = '';

      return new Promise(function(resolve, reject) {
        let apiRoot = config.get('/apiRoot');
        let url = apiRoot + 'csymapp/emailprofile/' + emailid
        let params = {
          "IsActive": true
        }
        let headers = {
          'content-type': 'application/json',
          'Authorization': `bearer ${token}`
        }
        axios.delete(url,  {headers: headers})
        .then(function (response) {
          return resolve(response);
        })
        .catch(function (error) {
          return reject(error.response || {data:{error:error.message}});
        });
      });
  }

  async deleteTelephone(state, puid) {
    let self = this,
      token = self.getToken(state),
      uid = state.user.userdata.uid
      if(token === null) token = '';

      return new Promise(function(resolve, reject) {
        let apiRoot = config.get('/apiRoot');
        let url = apiRoot + 'csymapp/telephoneprofile/' + puid
        let params = {
          "IsActive": true
        }
        let headers = {
          'content-type': 'application/json',
          'Authorization': `bearer ${token}`
        }
        axios.delete(url,  {headers: headers})
        .then(function (response) {
          return resolve(response);
        })
        .catch(function (error) {
          return reject(error.response || {data:{error:error.message}});
        });
      });
  }

  async deleteGoogle(state, emailid) {
    let self = this,
      token = self.getToken(state),
      uid = state.user.userdata.uid
      if(token === null) token = '';

      return new Promise(function(resolve, reject) {
        let apiRoot = config.get('/apiRoot');
        let url = apiRoot + 'csymapp/googleprofile/' + emailid
        let params = {
          "IsActive": true
        }
        let headers = {
          'content-type': 'application/json',
          'Authorization': `bearer ${token}`
        }
        axios.delete(url,  {headers: headers})
        .then(function (response) {
          return resolve(response);
        })
        .catch(function (error) {
          return reject(error.response || {data:{error:error.message}});
        });
      });
  }

  
  async deleteFacebook(state, emailid) {
    let self = this,
      token = self.getToken(state),
      uid = state.user.userdata.uid
      if(token === null) token = '';

      return new Promise(function(resolve, reject) {
        let apiRoot = config.get('/apiRoot');
        let url = apiRoot + 'csymapp/facebookprofile/' + emailid
        let params = {
          "IsActive": true
        }
        let headers = {
          'content-type': 'application/json',
          'Authorization': `bearer ${token}`
        }
        axios.delete(url,  {headers: headers})
        .then(function (response) {
          return resolve(response);
        })
        .catch(function (error) {
          return reject(error.response || {data:{error:error.message}});
        });
      });
  }
  async deleteLinkedin(state, emailid) {
    let self = this,
      token = self.getToken(state),
      uid = state.user.userdata.uid
      if(token === null) token = '';

      return new Promise(function(resolve, reject) {
        let apiRoot = config.get('/apiRoot');
        let url = apiRoot + 'csymapp/linkedinprofile/' + emailid
        let params = {
          "IsActive": true
        }
        let headers = {
          'content-type': 'application/json',
          'Authorization': `bearer ${token}`
        }
        axios.delete(url,  {headers: headers})
        .then(function (response) {
          return resolve(response);
        })
        .catch(function (error) {
          return reject(error.response || {data:{error:error.message}});
        });
      });
  }

  async deleteTwitter(state, emailid) {
    let self = this,
      token = self.getToken(state),
      uid = state.user.userdata.uid
      if(token === null) token = '';

      return new Promise(function(resolve, reject) {
        let apiRoot = config.get('/apiRoot');
        let url = apiRoot + 'csymapp/twitterprofile/' + emailid
        let params = {
          "IsActive": true
        }
        let headers = {
          'content-type': 'application/json',
          'Authorization': `bearer ${token}`
        }
        axios.delete(url,  {headers: headers})
        .then(function (response) {
          return resolve(response);
        })
        .catch(function (error) {
          return reject(error.response || {data:{error:error.message}});
        });
      });
  }



  async deleteGithub(state, emailid) {
    let self = this,
      token = self.getToken(state),
      uid = state.user.userdata.uid
      if(token === null) token = '';

      return new Promise(function(resolve, reject) {
        let apiRoot = config.get('/apiRoot');
        let url = apiRoot + 'csymapp/githubprofile/' + emailid
        let params = {
          "IsActive": true
        }
        let headers = {
          'content-type': 'application/json',
          'Authorization': `bearer ${token}`
        }
        axios.delete(url,  {headers: headers})
        .then(function (response) {
          return resolve(response);
        })
        .catch(function (error) {
          return reject(error.response || {data:{error:error.message}});
        });
      });
  }



  getUserName(user) {
    let tuser = user.userdata;
    return tuser.Name || 'Guest'

  }

  getToken(state) {
    if(state.isLoggedIn === false) return null;
    return state.token
  }

  getProfilePic(user) {
    let self = this
    let profilePics = [];
    profilePics = self.findValuesHelper(user.userdata, 'ProfilePic', profilePics)
    let tmp = [];
    for(let i in profilePics) if(profilePics[i] !== '')tmp.push(profilePics[i])
    profilePics = tmp;
    if(!profilePics.length)
      profilePics.push(user.defaultprofilepic)
      console.log(profilePics)
    return profilePics[Math.floor(Math.random()*profilePics.length)];
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