export default [
  {
    name: 'APP_LOGIN_SUCCESS',
    callback: function (e) {
      this.snackbar = {
        show: true,
        color: 'green',
        text: 'Logged in successfully.'
      };
      this.$router.push({ path: '/' });
    }
  },
  {
    name: 'APP_REGISTER_SUCCESS',
    callback: function (e) {
      this.snackbar = {
        show: true,
        color: 'green',
        text: 'Account created successfully.'
      };
      this.$router.push({ path: '/' });
    }
  },
  {
    name: 'APP_EMAIL_ADD_SUCCESS',
    callback: function (e) {
      this.snackbar = {
        show: true,
        color: 'green',
        text: 'Account added successfully.'
      };
    }
  },
  {
    name: 'APP_NO_CHANGES',
    callback: function (e) {
      this.snackbar = {
        show: true,
        color: 'primary',
        text: 'No changes have been made'
      };
    }
  },
  {
    name: 'PROFILE_REMOVED',
    callback: function (e) {
      this.snackbar = {
        show: true,
        color: 'black',
        text: `${e} profile has been deleted`
      };
      this.$router.push({ path: '/csystem/redirect' });
    }
  },

  {
    name: 'APP_LOGOUT',
    callback: function (e) {
      
      this.$store.state.token = null
      this.$store.state.isLoggedIn = false
      this.$store.state.user.userdata = {}
      this.$store.state.user.profilepic = null
      this.snackbar = {
        show: true,
        color: 'green',
        text: 'Logged out successfully.'
      };
      this.$router.replace({ path: '/csystem/redirect' });
    }
  },
  {
    name: 'APP_PROFILE_MODIFY_SUCCESS',
    callback: function (e) {
      this.snackbar = {
        show: true,
        color: 'green',
        text: 'Profile modified successfully.'
      };
      this.$router.push({ path: '/csystem/redirect' });
    }
  },
  {
    name: 'APP_PAGE_LOADED',
    callback: function (e) {
    }
  },
  {
    name: 'APP_AUTH_FAILED',
    callback: function (e) {
      this.$router.push('/login');
      this.$message.error('Token has expired');
    }
  },
  {
    name: 'APP_BAD_REQUEST',
    // @error api response data
    callback: function (msg) {
      this.$message.error(msg);
    }
  },
  {
    name: 'APP_ACCESS_DENIED',
    // @error api response data
    callback: function (msg) {
      this.$message.error(msg);
      this.$router.push('/forbidden');
    }
  },
  {
    name: 'APP_RESOURCE_DELETED',
    // @error api response data
    callback: function (msg) {
      this.$message.success(msg);
    }
  },
  {
    name: 'APP_RESOURCE_UPDATED',
    // @error api response data
    callback: function (msg) {
      this.$message.success(msg);
    }
  },
  {
    name: 'ERROR_EVT',
    // @error api response data
    callback: function (msg) {
      this.snackbar = {
        show: true,
        color: 'red',
        text: msg
      };
    }
  },

];
