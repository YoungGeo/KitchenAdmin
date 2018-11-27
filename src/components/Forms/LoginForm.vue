<template>
  <div class="centered-container">
    <md-content class="md-elevation-3">

      <div class="title">
        <div class="md-title">Admin Site</div>
      </div>

      <div class="form">
        <md-field>
          <label>Username</label>
          <md-input v-model="login.username" autofocus></md-input>
        </md-field>

        <md-field md-has-password>
          <label>Password</label>
          <md-input v-model="login.password" type="password"></md-input>
        </md-field>
      </div>

      <div class="actions md-layout md-alignment-center-space-between">
        <md-button class="md-raised md-primary" @click="SignIn2">Log in</md-button>
      </div>

      <div class="loading-overlay " v-if="loading">
        <md-progress-spinner md-mode="indeterminate" :md-stroke="2"></md-progress-spinner>
      </div>

      <div v-if="showerr" class="err">
      <p><strong> USERNAME OR PASSWORD IS INCCORRECT <br> Please try again</strong></p>
      </div>

    </md-content>
    <div class="background" />
  </div>
</template>

<script>
import Firebase from "firebase";
import axios from 'axios';

export default {
  name: "login-form",
  data() {
    return {
      loading: false,
      accounts: [],
      showerr : false,
      login: {
        username: "",
        password: ""
      }
    };
  },
  created() {
    axios.get(`https://mayfieldgolfapi.azurewebsites.net/api/staffaccounts`)
      .then(response => {
        // JSON responses are automatically parsed.
        this.accounts = response.data
      })
      .catch(e => {
        console.log(e)
      });
  },
  methods: {
    auth() {
      // your code to login user
      // this is only for example of loading
      /*
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 5000);
      */

     if(this.login.username == "admin" && this.login.password == "password"){
       sessionStorage.authenticated = true;
       location.reload();
     }else{
       sessionStorage.authenticated = false
     }
    },

    signUp: function() {

      var email = this.username + "@MFG.ca"

      Firebase.auth()
        .createUserWithEmailAndPassword(email, this.password)
        .then(
          user => {
            sessionStorage.authenticated = true;
            this.$router.replace('dashboard');
            location.reload();
          },
          error => {
            alert(error.message);
            sessionStorage.authenticated = false;
          }
        );
    },

    SignIn2(){

      sessionStorage.authenticated = false;
      var none = []

      for(var i = 0; i < this.accounts.length; i++){
        if(this.accounts[i].username.toLowerCase() == this.login.username.toLowerCase()){
          if(this.accounts[i].Token == this.login.password)
          {
            console.log("success")
            sessionStorage.authenticated = true;
            this.showerr = false;
            none.push(true);
            location.reload();
          }
        }else{
          none.push(false);
        }
      }
      var result = none.includes(true)
      if(!result){
        this.showerr = true
      }
    },

    notifyFailed (verticalAlign, horizontalAlign, message) {

        this.$notify(
        {
            message: message,
            icon: 'alert',
            horizontalAlign: horizontalAlign,
            verticalAlign: verticalAlign,
            type: 'danger'
        })
    },

    signIn: function() {


      var email = this.username + "@MFG.ca"

      Firebase.auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            sessionStorage.userInfo = user
            sessionStorage.authenticated = true;
            location.reload();
          },
          error => {
            alert(error.message);
            sessionStorage.authenticated = false;
          }
        );
    }
  }
};
</script>

<style lang="scss">
.centered-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100vh;
  .title {
    text-align: center;
    margin-bottom: 30px;
    img {
      margin-bottom: 16px;
      max-width: 80px;
    }
  }
  .actions {
    .md-button {
      margin: 0;
    }
  }
  .form {
    margin-bottom: 60px;
  }
  .background {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 0;
  }
  .md-content {
    z-index: 1;
    padding: 40px;
    width: 100%;
    max-width: 400px;
    position: relative;
  }
  .loading-overlay {
    z-index: 10;
    top: 0;
    left: 0;
    right: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .err {
    padding: 10pt;
    color: red;
    font-size: 20px;
  }
}
</style>