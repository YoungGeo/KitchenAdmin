<template>
    <div>
        <form>
            <md-card class="md-layout-item md-medium-size-100 md-size-75"> 
                <md-card-header :data-background-color="dataBackgroundColor">
                    <h4 class="title">Update a Product</h4>
                    <p class="category">This will update an existing menu item</p>
                </md-card-header>

                <md-card-content>
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item  md-size-35">
                            <md-field>
                                <label for="product-type">Product Type</label>
                                <md-select v-model="products.ProductType" name="product-type" id="product-type" disabled>
                                    <md-option value="Food">Food</md-option>
                                    <md-option value="Drink">Drink</md-option>
                                </md-select>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-size-50">
                            <md-field>
                            <label>Product Name</label>
                            <md-input v-model="products.ProductName" type="text"></md-input>
                            </md-field>
                        </div>
                    </div>
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item">
                            <md-field>
                            <label>Product Description</label>
                            <md-textarea v-model="products.ProductDescription"></md-textarea>
                            <md-icon>description</md-icon>
                            </md-field>
                        </div>
                    </div>
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item md-size-50">
                            <md-field>
                            <label>Product Price</label>
                            <md-input v-model="products.ProductPrice" type="number"></md-input>
                            </md-field>
                        </div>
                        <div class="md-layout-item  md-size-50">
                            <md-field>
                                <label for="product-menu">Menu</label>
                                <md-select v-model="products.MenuId" name="product-type" id="product-type" md-dense>
                                    <md-option v-for="menu in menus" :key="menu.MenuId" v-bind:value="menu.MenuId">{{menu.MenuName}}</md-option>
                                </md-select>
                            </md-field>
                        </div>
                    <!--
                        <div class="md-layout-item">
                            <md-checkbox v-model="productIsAlcohol">Is this alcoholic beverage</md-checkbox>
                        </div>
                    -->
                        <div class="md-layout-item md-size-100 text-right">
                            <md-button class="md-raised md-success" @click="updateProduct()">Update Product</md-button>
                        </div>
                    </div>
                </md-card-content>
            </md-card>
        </form>
    </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios';
import qs from 'qs';

export default {
  name: "product-form",
  props: {
    dataBackgroundColor: {
      type: String,
      default: ''
    }
  },
  data: () => ({
      products: [],
      menus: []
    }),
    created() {
        axios.get(`https://mayfieldgolfapi.azurewebsites.net/api/Menus`)
          .then(response => {
            // JSON responses are automatically parsed.
            this.menus = response.data
          })
          .catch(e => {
            console.log(e)
          });
        axios.get(`https://mayfieldgolfapi.azurewebsites.net/api/Products/${sessionStorage.edititemid}`)
          .then(response => {
            // JSON responses are automatically parsed.
            this.products = response.data
          })
          .catch(e => {
            console.log(e)
        });
  },
    methods: {
      updateProduct() {
          var productToUpdate = qs.stringify({
                ProductId: this.products.ProductId,
                ProductType: this.products.ProductType,
                ProductName: this.products.ProductName,
                ProductDescription: this.products.ProductDescription,
                ProductImagePath: this.products.ProductImagePath,
                ProductPrice: this.products.ProductPrice,
                MenuId: this.products.MenuId,
                ProductIsAvailble: this.products.ProductIsAvailble,
                MenuName: this.products.MenuName,
                IsAlcohol: this.products.IsAlcohol
          });
          axios({
                method: "put",
                url: `https://mayfieldgolfapi.azurewebsites.net/api/Products/${sessionStorage.edititemid}`,
                contentType: "application/raw",
                data: productToUpdate,
            }).then(response => {
                this.$router.go(-1);
                })
                .catch(e => {
                    console.log(e);
            })
      }
    }
};
</script>

<style lang="scss" scoped>
.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}
  .md-checkbox {
    display: flex;
  }
</style>