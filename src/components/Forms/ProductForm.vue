<template>
    <div>
        <form>
            <md-card>
                <md-card-header :data-background-color="dataBackgroundColor">
                    <h4 class="title">Add a Product</h4>
                    <p class="category">This will create a new menu item</p>
                </md-card-header>

                <md-card-content>
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item  md-size-35">
                            <md-field>
                                <label for="product-type">Product Type</label>
                                <md-select v-model="productType" name="product-type" id="product-type">
                                    <md-option value="Food">Food</md-option>
                                    <md-option value="Drink">Drink</md-option>
                                </md-select>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-size-50">
                            <md-field>
                            <label>Product Name</label>
                            <md-input v-model="productName" type="text"></md-input>
                            </md-field>
                        </div>
                    </div>
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item">
                            <md-field>
                            <label>Product Description</label>
                            <md-textarea v-model="productDesc"></md-textarea>
                            <md-icon>description</md-icon>
                            </md-field>
                        </div>
                    </div>
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item md-size-50">
                            <md-field>
                            <label>Product Price</label>
                            <md-input v-model="productPrice" type="number"></md-input>
                            </md-field>
                        </div>
                        <div class="md-layout-item  md-size-50">
                            <md-field>
                                <label for="product-menu">Menu</label>
                                <md-select v-model="menuid" name="product-type" id="product-type" md-dense>
                                    <md-option v-for="menu in menus" :key="menu.MenuId" v-bind:value="menu.MenuId" v-if="menu.MenuType == productType">{{menu.MenuName}}</md-option>
                                </md-select>
                            </md-field>
                        </div>
                    <!--
                        <div class="md-layout-item">
                            <md-checkbox v-model="productIsAlcohol">Is this alcoholic beverage</md-checkbox>
                        </div>
                    -->
                        <div class="md-layout-item md-size-100 text-right">
                            <md-button class="md-raised md-success" @click="submit()">Add Product</md-button>
                        </div>
                    </div>
                </md-card-content>
            </md-card>
        </form>
    </div>
</template>

<script>
import axios from "axios";
import qs from "qs";


export default {
  name: "product-form",
  props: {
    dataBackgroundColor: {
      type: String,
      default: ''
    }
  },
   data() {
    return {
      menus: [],
      types: ['', 'info', 'success', 'warning', 'danger'],
      notifications: {
        topCenter: false
      },
        productType: "",
        productName: "",
        productPrice: 0.00,
        menuid: 0,
        menuname: "",
        productDesc: "",
        productIsAlcohol: false,
        productImgPath: "None",
        productIsAvalible: true,
        errors: []
      } 
    },
    created() {
        axios.get(`https://mayfieldgolfapi.azurewebsites.net/api/Menus`)
          .then(response => {
            // JSON responses are automatically parsed.
            this.menus = response.data
          })
          .catch(e => {
            console.log(e)
          });
    },
    methods: {
        submit: function(){
            
        for(var a = 0; a < this.menus.length; a++){
            if(this.menus[a].MenuId == this.menuid){
                this.menuname = this.menus[a].MenuName
                a = 9999;
            }
        }
            var data = {
                ProductType: this.productType,
                ProductName: this.productName,
                ProductDescription: this.productDesc,
                ProductImagePath: "None",
                ProductPrice: this.productPrice,
                MenuId: this.menuid,
                MenuName: this.menuname,
                ProductIsAvailble: true
            };

            axios
            .post(
            "https://mayfieldgolfapi.azurewebsites.net/api/Products",
            qs.stringify(data)
            ).then(response => {
                this.notifySuccess("top","center")
                this.$router.go(-1);
            })
            .catch(function(error) {
            console.log(error);
            });
        },
        notifySuccess (verticalAlign, horizontalAlign) {
            var color = Math.floor((Math.random() * 4) + 1)
            this.$notify(
            {
                message: 'Product was added',
                icon: 'alert',
                horizontalAlign: horizontalAlign,
                verticalAlign: verticalAlign,
                type: this.types[color]
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