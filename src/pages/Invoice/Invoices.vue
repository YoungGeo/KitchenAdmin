<template>
  <div class="content">
      <div class="md-layout">
        <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
            <md-card>
            <md-card-header data-background-color="blue">
                <h4 class="title">Invoices</h4>
                <p class="category">Below are a list of all invoices created</p>
            </md-card-header>
            <md-card-content>
                <md-table v-model="invoices">
                    <md-table-row slot="md-table-row" slot-scope="{ item }">
                        <md-table-cell md-label="Order #">{{ item.OrderId }}</md-table-cell>
                        <md-table-cell md-label="Customer" v-for="cust in custusers" :key="cust.CustId" v-if="cust.CustId == item.UserId">{{ cust.FirstName }} {{ cust.LastName }}</md-table-cell>
                        <md-table-cell md-label="Total">${{ item.TotalAfterTax.toFixed(2) }}</md-table-cell>
                        <md-table-cell md-label="Payment Status">{{ item.PaymentStatus }}</md-table-cell>
                        <md-table-cell md-label="View"><md-button class="md-success" @click="view(item)">View</md-button></md-table-cell>
                        </md-table-row>
                </md-table>
            </md-card-content>
            </md-card>
        </div>
      </div>
  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios'

export default {
  name: "invoice-table",
  prodName: "",
  prodId: 0,
  data() {
    return {
      deleteConfirmActive: false,
      invoices: [],
      type: ['', 'info', 'success', 'warning', 'danger'],
      notifications: {
        topCenter: false
      },
      errors: [],
      custusers: []
    }
  },// Fetches posts when the component is created.
  created() {
    axios.get(`https://mayfieldgolfapi.azurewebsites.net/api/invoices`)
      .then(response => {
        // JSON responses are automatically parsed.
        this.invoices = response.data
        axios.get(`https://mayfieldgolfapi.azurewebsites.net/api/custusers`)
        .then(response => {
            // JSON responses are automatically parsed.
            this.custusers = response.data
        })
        .catch(e => {
            console.log(e)
        });
      })
      .catch(e => {
        console.log(e)
      });
  },
  methods: {
      view(item){
        sessionStorage.viewinvid = item.InvoiceId;
        this.$router.push('viewinvoices')
      }
    }
  }
</script>
