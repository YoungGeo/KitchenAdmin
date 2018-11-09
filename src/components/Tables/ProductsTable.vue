<template>
  <div>
    <md-table v-model="(products)">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Name">{{ item.ProductName }}</md-table-cell>
        <md-table-cell md-label="Price">{{ item.ProductPrice }}</md-table-cell>
        <md-table-cell md-label="Menu">{{ item.MenuName }}</md-table-cell>
        <md-table-cell md-label="Edit"><md-button class="md-info" @click="edit(item)">Edit</md-button></md-table-cell>
        <md-table-cell md-label="Delete"><md-button class="md-danger" @click="deleteitem(item)">Delete</md-button></md-table-cell>
      </md-table-row>
    </md-table>

    <md-dialog-confirm
      :md-active.sync="deleteConfirmActive"
      md-title="Are you sure you want to delete?"
      md-confirm-text="Yes"
      md-cancel-text="No"
      @md-cancel="onCancel"
      @md-confirm="onConfirm" />
  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios'

export default {
  name: "products-table",
  prodName: "",
  prodId: 0,
  data() {
    return {
      deleteConfirmActive: false,
      products: [],
      type: ['', 'info', 'success', 'warning', 'danger'],
      notifications: {
        topCenter: false
      },
      errors: [],
      menus: []
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
      sessionStorage.edititemid = item.ProductId;
      this.$router.push('editproduct')
    },
    deleteitem(item){
      this.prodName = item.ProductName;
      this.prodId = item.ProductId;
      this.deleteConfirmActive = true
    },
    onConfirm () {
      this.deleteProduct()
    },
    onCancel () {
    },
    deleteProduct() {
        axios({
            method: "delete",
            url: `https://mayfieldgolf.azurewebsites.net/api/Products/${this.prodId}`
        }).then(response => {
          this.notifyDeleted('top','center')
        }).catch(e => {
            print(e);
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
        type: this.type[color]
      })
    }
  }
}
</script>
