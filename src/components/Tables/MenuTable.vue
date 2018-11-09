<template>
  <div>
    <md-table v-model="menus">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Name">{{ item.MenuName }}</md-table-cell>
        <md-table-cell md-label="Type">{{ item.MenuType }}</md-table-cell>
        <md-table-cell md-label="Edit"><md-button class="md-info" @click="edit(item)">Edit</md-button></md-table-cell>
        <md-table-cell md-label="Delete"><md-button class="md-danger" @click="deleteitem(item)">Delete</md-button></md-table-cell>
      </md-table-row>
    </md-table>

    <md-dialog-confirm
      :md-active.sync="deleteConfirmActive"
      md-title="Are you sure you want to delete?"
      md-content="Doing this will <strong>DELETE all products still in the menu</strong>"
      md-confirm-text="Yes"
      md-cancel-text="No"
      @md-cancel="onCancel"
      @md-confirm="onConfirm" />

  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "menu-table",
  data() {
    return {
      deleteConfirmActive: false,
      products: [],
      menus: [],
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
    axios.get(`https://mayfieldgolfapi.azurewebsites.net/api/Menus`)
      .then(response => {
        // JSON responses are automatically parsed.
        this.menus = response.data
          axios.get(`https://mayfieldgolfapi.azurewebsites.net/api/Products`)
          .then(response => {
            // JSON responses are automatically parsed.
            this.products = response.data
            console.log(this.products)
          })
          .catch(e => {
            this.errors.push(e)
          });
      })
      .catch(e => {
        console.log(e)
      });
  },
  methods: {
    edit(item){
      sessionStorage.editmenuid = item.MenuId;
      this.$router.push('editmenu')
    },
    deleteitem(item){
      this.localMenuName = item.MenuName;
      this.localMenuId = item.MenuId;
      this.deleteConfirmActive = true
    },
    onConfirm () {
      for(var a = 0; a < this.products.length; a++){
        if(this.products[a].MenuId == this.localMenuId){
          this.deleteProduct(this.products[a].ProductId)
        }
      }
      this.deleteMenu()
    },
    onCancel () {
    },
    deleteProduct(id) {
        axios({
            method: "delete",
            url: `https://mayfieldgolfapi.azurewebsites.net/api/Products/${id}`
        }).then(response => {
          this.notifyDeleted('top','center')
        }).catch(e => {
            console.log(e);
        });
    },
    deleteMenu() {
        axios({
            method: "delete",
            url: `https://mayfieldgolfapi.azurewebsites.net/api/Menus/${this.localMenuId}`
        }).then(response => {
          this.notifyDeleted('top','center')
          location.reload()
        }).catch(e => {
            console.log(e);
        });
    },
    notifyDeleted (verticalAlign, horizontalAlign) {
    var color = Math.floor((Math.random() * 4) + 1)
    this.$notify(
      {
        message: 'Product was deleted',
        icon: 'alert',
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: this.types[color]
      })
    }
  }
}
</script>
