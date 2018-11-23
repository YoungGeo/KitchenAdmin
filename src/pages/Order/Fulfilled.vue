<template>
    <div class="card-expansion" >
        <md-layout-item v-for="(item, index) in orders" v-if="item.OrderStatus == 3" :key="item.OrderId">
            <md-card >
                <md-card-content>
                    <h6 class="category text-gray">Order No. : {{item.OrderId}}</h6>
                    <h4 class="card-title" v-for="cust in custs" :key="cust.CustId" v-bind:value="item.CustId" v-if="cust.CustId == item.CustId">Order For: <strong>{{cust.FirstName}} {{cust.LastName}}</strong></h4>
                </md-card-content>
                <md-card-expand>
                    <md-card-actions md-alignment="space-between">
                        <md-card-expand-trigger>
                            <md-button class="md-success">View Order</md-button>
                        </md-card-expand-trigger>
                        <div>
                            <md-button @click="updateOrderStatus(item)" class="md-primary">Customer Received Order</md-button>
                        </div>

                    </md-card-actions>

                    <md-card-expand-content>
                        <div class="card-description">
                            <md-table v-model="consolidatedProducts[index].items">
                                <md-table-row slot="md-table-row" slot-scope="{ item }">
                                    <md-table-cell md-label="Name">{{ item.name }}</md-table-cell>
                                    <md-table-cell md-label="Quantity">{{ item.quantity }}</md-table-cell>
                                </md-table-row>
                            </md-table>
                        </div>
                    </md-card-expand-content>
                </md-card-expand>
            </md-card>
        </md-layout-item>
    </div>
</template>
<script>
/* eslint-disable */

import axios from "axios";
import qs from "qs";


export default {
  name: "user-card",
  data() {
    return {
        types: ['', 'info', 'success', 'warning', 'danger'],
        notifications: {
            topCenter: false
        },
        orders: [],
        custs: [],
        products: [],
        orderitems: [],
        consolidatedOrderItems: [],
        consolidatedProducts: [],
        newArray:[]
    };
  },
  created(){
    this.getSrc();
  },
  mounted(){
    this.getSrc();
  },
  methods: {
      getSrc(){
          axios.get(`https://mayfieldgolfapi.azurewebsites.net/api/custusers`)
        .then(response => {
            // JSON responses are automatically parsed.
            this.custs = response.data
            axios.get(`https://mayfieldgolfapi.azurewebsites.net/api/products`)
            .then(response => {
                // JSON responses are automatically parsed.
                this.products = response.data
                axios.get(`https://mayfieldgolfapi.azurewebsites.net/api/orders`)
                .then(response => {
                    // JSON responses are automatically parsed.
                    this.orders = response.data
                    axios.get(`https://mayfieldgolfapi.azurewebsites.net/api/orderitems`)
                    .then(response => {
                        // JSON responses are automatically parsed.
                        this.orderitems = response.data;
                        this.mergeProdItems(response.data);
                    })
                    .catch(e => {
                        console.log(e)
                    });
                })
                .catch(e => {
                    console.log(e)
                });
            })
            .catch(e => {
                console.log(e)
            });
        })
        .catch(e => {
            console.log(e)
        });
      },
      updateOrderStatus(item) {
          var orderToUpdate = qs.stringify({
              CustId: item.CustId,
              InvoiceId: item.InvoiceId,
              OrderId: item.OrderId,
              OrderStatus: 4
          });

          axios({
                method: "put",
                url: `https://mayfieldgolfapi.azurewebsites.net/api/Orders/${item.OrderId}`,
                contentType: "application/raw",
                data: orderToUpdate,
            }).then(response => {
                this.notifySuccess("top","center")
                location.reload();
                })
                .catch(e => {
                    console.log(e);
            })
        },
        notifySuccess (verticalAlign, horizontalAlign) {
            var color = Math.floor((Math.random() * 4) + 1)
            this.$notify(
            {
                message: 'You have sent the ticket to the kitchen',
                icon: 'alert',
                horizontalAlign: horizontalAlign,
                verticalAlign: verticalAlign,
                type: this.types[color]
            })
        },
        mergeProdItems: function(array){
        
        for(var a = 0; a < this.orders.length; a++)
        {
            if(this.orders[a].OrderStatus == 3)
            {
                this.newArray = []
                for(var b = 0; b < array.length; b++)
                {
                    if(array[b].OrderId == this.orders[a].OrderId){
                        var id = array[b].ProductId;
                        this.newArray.push(id)
                    }
                }
                this.consolidatedOrderItems.push({OrderStatus: this.orders[a].OrderStatus, OrderId: this.orders[a].OrderId, CustId: this.orders[a].CustId, products: this.compressArray(this.newArray)})
            }
        }
        
        for(var a = 0; a < this.consolidatedOrderItems.length; a++)
        {
            this.newArray = []
            for(var b = 0; b < this.consolidatedOrderItems[a].products.length; b++)
            {
                for(var c = 0; c < this.products.length; c++)
                {
                    if(this.consolidatedOrderItems[a].products[b].value == this.products[c].ProductId){
                        this.newArray.push({name: this.products[c].ProductName, prodId: this.products[c].ProductId, quantity: this.consolidatedOrderItems[a].products[b].count})
                    }
                }
            }
            this.consolidatedProducts.push({items: this.newArray})
        }
            console.log(this.consolidatedProducts)
      },
        compressArray(original) 
        {
            var compressed = [];
            // make a copy of the input array
            var copy = original.slice(0);
        
            // first loop goes over every element
            for (var i = 0; i < original.length; i++)
            {
                var myCount = 0;	
                // loop over every element in the copy and see if it's the same
                for (var w = 0; w < copy.length; w++) {
                    if (original[i] == copy[w]) {
                        // increase amount of times duplicate is found
                        myCount++;
                        // sets item to undefined
                        delete copy[w];
                    }
            }
        
            if (myCount > 0) {
                var a = new Object();
                a.value = original[i];
                a.count = myCount;
                compressed.push(a);
            }
        }
	return compressed;
    }
  }
};
</script>
<style lang="scss" scoped>
.center{
    text-align: center;
    margin-left: auto;
    margin-right: auto;
}
</style>
