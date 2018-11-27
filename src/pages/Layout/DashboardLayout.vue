<template>
  <div class="wrapper" :class="{'nav-open': $sidebar.showSidebar}">
    <div v-if="boolean">
      <notifications></notifications>
      <side-bar>
        <mobile-menu slot="content"></mobile-menu>
        <sidebar-link to="/dashboard">
          <md-icon>dashboard</md-icon>
          <p>Dashboard</p>
        </sidebar-link>
        <md-divider></md-divider>
        <md-subheader style="color: white">Menu Controls</md-subheader>
        <sidebar-link to="/products">
          <md-icon>fastfood</md-icon>
          <p>Products</p>
        </sidebar-link>
        <sidebar-link to="/menus">
          <md-icon>restaurant</md-icon>
          <p>Menus</p>
        </sidebar-link>
        <md-divider></md-divider>
        <md-subheader style="color: white">Orders</md-subheader>
        <sidebar-link to="/pending">
          <md-icon>schedule</md-icon>
          <p>Pending Orders</p>
        </sidebar-link>
        <sidebar-link to="/inprogress">
          <md-icon>local_dining</md-icon>
          <p>In Progress Orders</p>
        </sidebar-link>
        <sidebar-link to="/fulfilled">
          <md-icon>check_circle</md-icon>
          <p>Fulfilled Orders</p>
        </sidebar-link>
        <md-divider></md-divider>
        <md-subheader style="color: white">Billing</md-subheader>
        <sidebar-link to="/invoices">
          <md-icon>assignment</md-icon>
          <p>Invoices</p>
        </sidebar-link>
        <md-divider></md-divider>
        <md-subheader style="color: white">Account</md-subheader>
        <sidebar-link to="/accounts">
          <md-icon>account_circle</md-icon>
          <p>Users</p>
        </sidebar-link>
      </side-bar>

      <div class="main-panel">
        <top-navbar></top-navbar>

        <dashboard-content>

        </dashboard-content>

        <content-footer v-if="!$route.meta.hideFooter"></content-footer>
      </div>
    </div>

    <div v-if="!boolean">
        <login-form>
        </login-form>
    </div>
  </div>
</template>
<style lang="scss">

</style>
<script>
import TopNavbar from './TopNavbar.vue'
import ContentFooter from './ContentFooter.vue'
import DashboardContent from './Content.vue'
import MobileMenu from '@/pages/Layout/MobileMenu.vue'

import {
  LoginForm,
  SignupForm
} from '@/components'

export default {
  components: {
    TopNavbar,
    DashboardContent,
    ContentFooter,
    MobileMenu,
    LoginForm,
    SignupForm
  },
  data() {
    return {
      boolean: sessionStorage.authenticated
    }
  },
  created(){
  }
}
</script>

<style lang="scss" scoped>
.white-text{
  color: #000;
}
</style>
