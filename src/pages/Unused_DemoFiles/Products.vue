<template>
  <div class="content">
      <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">Products</h4>
            <p class="category">Below are a list of all your products</p>
          </md-card-header>
          <md-card-content>
            <md-button class="md-primary" href="#/AddProduct" >Add a product</md-button>
            <products-table table-header-color="green"></products-table>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>

import {
  ProductsTable
} from '@/components'

export default{
  components: {
    ProductsTable
  }
}
</script>
