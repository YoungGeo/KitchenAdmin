<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-66">
        <edit-profile-form data-background-color="green">

        </edit-profile-form>
      </div>
      <div class="md-layout-item md-medium-size-100 md-size-33">
        <user-card>

        </user-card>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";

export default {
  data() {
    return {
      name: "Add New Product",
      productName: "",
      productType: "",
      productDescription: "",
      ProductImagePath: "",
      ProductPrice: 0.0,
      ProductETA: 0,
      isAlcoholic: false,
      ProductIsAvailble: true,
      error: [],
      products: []
    };
  },
  methods: {
    submitProductToDatabase() {
      var data = {
        ProductName: this.productName,
        ProductDescription: this.productDescription,
        ProductImagePath: this.ProductImagePath,
        ProductPrice: this.ProductPrice,
        ProductETA: this.ProductETA,
        ProductIsAvailble: true
      };
      var dataRecentProduct = {
        ProductId: 0
      };

      axios
        .post(
          "https://mayfieldgolfapi.azurewebsites.net/api/products",
          qs.stringify(data)
        )
        .then(response => {
          axios
            .get(`https://mayfieldgolf.azurewebsites.net/api/products`)
            .then(response => {
              // JSON responses are automatically parsed.
              this.products = response.data;
              dataRecentProduct.ProductId = this.products[
                this.products.length - 1
              ].ProductId;

              if (this.productType == "Food") {
                //Food Prod
                console.log(dataRecentProduct.ProductId);
                if (dataRecentProduct.ProductId != 0) {
                  var dataFood = {
                    ProductId: dataRecentProduct.ProductId
                  };
                  -axios
                    .post(
                      "https://mayfieldgolf.azurewebsites.net/api/productFoods",
                      qs.stringify(dataFood)
                    )
                    .then(response => {
                      this.$router.go(-1);
                      console.log(response);
                    })
                    .catch(function(error) {
                      console.log(error);
                    });
                }
              } else {
                //Drink Prod
                if (dataRecentProduct.ProductId != 0) {
                  var dataDrink = {
                    DrinkIsAlcohol: this.isAlcoholic,
                    ProductId: dataRecentProduct.ProductId
                  };

                  axios
                    .post(
                      "https://mayfieldgolf.azurewebsites.net/api/productDrinks",
                      qs.stringify(dataDrink)
                    )
                    .then(response => {
                      this.$router.go(-1);
                      console.log(response);
                    })
                    .catch(function(error) {
                      console.log(error);
                    });
                }
              }
            })
            .catch(e => {
              this.errors.push(error);
            });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

