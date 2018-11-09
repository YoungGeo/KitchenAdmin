<template>
  <div class="content">
      <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">Menus</h4>
            <p class="category">Below are a list of all your menus</p>
          </md-card-header>
          <md-card-content>
            <md-button class="md-primary" href="#/addmenu" >Add a menu</md-button>
            <menu-table table-header-color="green"></menu-table>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>

import {
  MenuTable
} from '@/components'

export default{
  components: {
    MenuTable
  }
}
</script>
