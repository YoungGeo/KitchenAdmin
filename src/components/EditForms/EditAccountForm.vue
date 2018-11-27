<template>
    <div>
        <form>
            <md-card>
                <md-card-header :data-background-color="dataBackgroundColor">
                    <h4 class="title">Add a staff member account</h4>
                    <p class="category">This will create a new account</p>
                </md-card-header>
                <md-card-content>
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item md-size-50">
                            <md-field>
                            <label>First Name</label>
                            <md-input v-model="account.FirstName" type="text"></md-input>
                            </md-field>
                        </div>

                        <div class="md-layout-item md-size-50">
                            <md-field>
                            <label>Last Name</label>
                            <md-input v-model="account.LastName" type="text"></md-input>
                            </md-field>
                        </div>
                    </div>
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item  md-size-35">
                            <md-field>
                                <label for="role-type">Role</label>
                                <md-select v-model="account.Role" name="role-type" id="role-type">
                                    <md-option value=1>Super User </md-option>
                                    <md-option value=2>Admin </md-option>
                                    <md-option value=3>Staff </md-option>
                                </md-select>
                            </md-field>
                        </div>
                  <p class="category">Roles Help: <br>Super user: No restrictions 
                  <br>Admin: Able to do everything except add, delete, edit accounts
                  <br>Staff: Only able to view </p>
                    </div>
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item md-size-50">
                            <md-field>
                            <label>Username</label>
                            <md-input v-model="account.username" type="text"></md-input>
                            </md-field>
                        </div>
                    </div>
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item md-size-50">
                            <md-field>
                            <label>Password</label>
                            <md-input v-model="password" type="password"></md-input>
                            </md-field>
                        </div>

                        <div class="md-layout-item md-size-50">
                            <md-field>
                            <label>Re-type Password</label>
                            <md-input v-model="repassword" type="password"></md-input>
                            </md-field>
                        </div>
                    </div>
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item md-size-100 text-right">
                            <md-button class="md-raised md-success" @click="signUp()">Add Account</md-button>
                        </div>
                    </div>
                </md-card-content>
            </md-card>
        </form>
    </div>
</template>

<script>
import Firebase from "firebase";
import axios from "axios";
import qs from "qs";

export default {
  name: "edit-Account-form",
  props: {
    dataBackgroundColor: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: false,
      types: ['', 'info', 'success', 'warning', 'danger'],
      notifications: {
        topCenter: false
      },
      account: [],
      username: "",
      FirstName: "",
      LastName: "",
      role: 0,
      password: "",
      repassword: ""
    };
  },
  created() {
    axios.get(`https://mayfieldgolfapi.azurewebsites.net/api/staffaccounts/${sessionStorage.EditUserId}`)
      .then(response => {
        // JSON responses are automatically parsed.
        this.account = response.data
        console.log(this.account)
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
       sessionStorage.signedup = true;
       location.reload();
     }else{
       sessionStorage.signedup = false
     }
    },

    signUp: function() {

      var passmatch = (this.password == this.repassword)

      if(passmatch == true){
        var used = false;

        for (var i = 0; i < this.accounts.length; i++) { 
          if(this.username.toLowerCase() == this.accounts[i].username.toLowerCase()){
            used = true
            console.log(used)
          }
        }
        if(used == false)
                {
                  var data = {
                        FirstName: this.FirstName,
                        LastName: this.LastName,
                        username: this.username.toLowerCase(),
                        Token: this.password,
                        Role: this.Role
                    };
                  axios
                    .post(
                    "https://mayfieldgolfapi.azurewebsites.net/api/staffaccounts",
                    qs.stringify(data)
                    ).then(response => {
                        this.notifySuccess("top","center")
                        this.$router.go(-1);
                    })
                    .catch(function(error) {
                    console.log(error);
                    });
                }
                else{
                  this.notifyFailed("top","center","Username has been used already, please try again")
                }
          }
          else{
            this.notifyFailed("top","center","Password does not match, please try again")
          }
    },
    notifySuccess (verticalAlign, horizontalAlign) {
        var color = Math.floor((Math.random() * 4) + 1)
        this.$notify(
        {
            message: 'Account was created',
            icon: 'alert',
            horizontalAlign: horizontalAlign,
            verticalAlign: verticalAlign,
            type: this.types[color]
        })
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
}
</style>