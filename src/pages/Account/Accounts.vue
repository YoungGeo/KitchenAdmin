<template>
  <div class="content">
      <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">Accounts</h4>
            <p class="category">Below are a list of all staff accounts</p>
          </md-card-header>
          <md-card-content>
            <md-button class="md-primary" href="#/addaccounts" >Add a account</md-button>
            <div>
              <md-table v-model="users">
                <md-table-row slot="md-table-row" slot-scope="{ item }">
                  <md-table-cell md-label="First Name">{{ item.FirstName }}</md-table-cell>
                  <md-table-cell md-label="Last Name">{{ item.LastName }}</md-table-cell>
                  <md-table-cell md-label="Username">{{ item.username }}</md-table-cell>
                  <md-table-cell md-label="Edit"><md-button class="md-info" @click="edit(item)">Edit</md-button></md-table-cell>
                  <md-table-cell md-label="Delete"><md-button class="md-danger" @click="deleteitem(item)">Delete</md-button></md-table-cell>
                </md-table-row>
              </md-table>
            </div>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "menu-table",
  data() {
    return {
      deleteConfirmActive: false,
      users: [],
      types: ['', 'info', 'success', 'warning', 'danger'],
      notifications: {
        topCenter: false
      },
      localMenuId: "",
      localMenuName: "",
      errors: []
      } 
    },// Fetches posts when the component is created.
  created() {
    axios.get(`https://mayfieldgolfapi.azurewebsites.net/api/staffaccounts`)
      .then(response => {
        // JSON responses are automatically parsed.
        this.users = response.data
      })
      .catch(e => {
        console.log(e)
      });
  },
  methods: {
    edit(item){
      sessionStorage.EditUserId = item.UserId
      this.$router.push('editaccounts')
    },
    deleteitem(item) {
        axios({
            method: "delete",
            url: `https://mayfieldgolfapi.azurewebsites.net/api/staffaccounts/${item.UserId}`
        }).then(response => {
          this.notifyDeleted('top','center')
          location.reload()
        }).catch(e => {
        console.log(e)
        });
    },
    notifyDeleted (verticalAlign, horizontalAlign) {
    this.$notify(
      {
        message: 'Account was deleted',
        icon: 'alert',
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: 'danger'
      })
    }
  }
}
</script>