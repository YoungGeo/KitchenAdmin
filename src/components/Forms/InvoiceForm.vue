<template>
    <div>
        <form>
            <md-card>
                <md-card-header :data-background-color="dataBackgroundColor">
                    <h4 class="title">Customer Invoice</h4>
                    <p class="category">This is an view only page</p>
                </md-card-header>

                <md-card-content>
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item  md-size-25">
                            <md-field>
                            <label>Invoice Number</label>
                            <md-input v-model="invoice.InvoiceId" type="text" disabled></md-input>
                            </md-field>
                        </div>
                        <div class="md-layout-item  md-size-25">
                            <md-field>
                            <label>Order Number</label>
                            <md-input v-model="invoice.OrderId" type="text" disabled></md-input>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-size-25">
                            <md-field v-for="cust in custs" :key="cust.CustId" v-if="cust.CustId == invoice.UserId" >
                            <label>Customer First Name</label>
                            <md-input type="text" v-model="cust.FirstName" disabled></md-input>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-size-25">
                            <md-field v-for="cust in custs" :key="cust.CustId" v-if="cust.CustId == invoice.UserId" >
                            <label>Customer Last Name</label>
                            <md-input type="text" v-model="cust.LastName" disabled></md-input>
                            </md-field>
                        </div>
                    </div>
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item md-size-50">
                            <md-field v-for="cust in custs" :key="cust.CustId" v-if="cust.CustId == invoice.UserId" >
                            <label>Customer Email</label>
                            <md-input type="text" v-model="cust.Email" disabled></md-input>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-size-50">
                            <md-field v-for="cust in custs" :key="cust.CustId" v-if="cust.CustId == invoice.UserId" >
                            <label>Customer Phone</label>
                            <md-input type="text" v-model="cust.Telephone" disabled></md-input>
                            </md-field>
                        </div>
                    </div>
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item md-size-100">
                            <md-table v-model="consolidatedProducts[0].items">
                                <md-table-row slot="md-table-row" slot-scope="{ item }">
                                    <md-table-cell md-label="Name">{{ item.name }}</md-table-cell>
                                    <md-table-cell md-label="Quantity">{{ item.quantity }}</md-table-cell>
                                    <md-table-cell md-label="Price per item">{{ item.price }}</md-table-cell>
                                    <md-table-cell md-label="Totals" >{{ item.price.toFixed(2) * item.quantity.toFixed(2) }}</md-table-cell>
                                </md-table-row>
                            </md-table>
                        </div>
                    </div>
                    <md-divider></md-divider>
                    <md-divider></md-divider>
                    <br>
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item md-size-80"></div>
                        <div class="md-layout-item md-size-20">
                            <md-field>
                            <label>Total before tax</label>
                            <md-input v-model="invoice.TotalBeforeTax" type="number" disabled></md-input>
                            </md-field>
                        </div>
                    </div>
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item md-size-80"></div>
                        <div class="md-layout-item md-size-20">
                            <md-field>
                            <label>Fees</label>
                            <md-input v-model="invoice.Fees.toFixed(2)" type="number" disabled></md-input>
                            </md-field>
                        </div>
                    </div>
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item md-size-80"></div>
                        <div class="md-layout-item md-size-20">
                            <md-field>
                            <label>Tax</label>
                            <md-input v-model="invoice.Tax.toFixed(2)" type="number" disabled></md-input>
                            </md-field>
                        </div>
                    </div>
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item md-size-80"></div>
                        <div class="md-layout-item md-size-20">
                            <md-field>
                            <label>Total</label>
                            <md-input v-model="invoice.TotalAfterTax.toFixed(2)" type="number" disabled></md-input>
                            </md-field>
                        </div>
                    </div>
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item md-size-100 text-right">
                            <md-button class="md-raised md-danger" @click="back()">Back</md-button>
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
  name: "invoice-form",
  props: {
    dataBackgroundColor: {
      type: String,
      default: ''
    }
  },
  data: () => ({
        types: ['', 'info', 'success', 'warning', 'danger'],
        notifications: {
          topCenter: false
        },
        custName: "",
        custId: 0,
        custEmail: "",
        orderId: 0,
        PaymentStatus: "",
        DateCreated: Date(),
        TotalBeforeTax: 0.00,
        Tax: 0.0,
        TotalAfterTax: 0.00,
        Fees: 0.00,
        TotalAfterTax: 0.00,
        ETA: 0,
        orders: [],
        custs: [],
        products: [],
        orderitems: [],
        consolidatedOrderItems: [],
        consolidatedProducts: [],
        invoice: [],
        newArray:[]
    }),
  created(){
    this.getSrc();
  },
  mounted(){
    this.getSrc();
  },
  methods: {
      getSrc(){
          axios.get(`https://mayfieldgolfapi.azurewebsites.net/api/invoices/${sessionStorage.viewinvid}`)
            .then(response => {
                    // JSON responses are automatically parsed.
                    this.invoice = response.data;
                })
                .catch(e => {
                    console.log(e)
                });

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
        back(){
            this.$router.go(-1);
        },
        mergeProdItems: function(array){
            this.consolidatedOrderItems = []
            this.consolidatedProducts = []

            for(var a = 0; a < this.orders.length; a++)
            {
                if(this.orders[a].OrderId == this.invoice.OrderId)
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
            console.log(this.consolidatedOrderItems)
            
            for(var a = 0; a < this.consolidatedOrderItems.length; a++)
            {
                this.newArray = []
                for(var b = 0; b < this.consolidatedOrderItems[a].products.length; b++)
                {
                    for(var c = 0; c < this.products.length; c++)
                    {
                        if(this.consolidatedOrderItems[a].products[b].value == this.products[c].ProductId){
                            this.newArray.push({name: this.products[c].ProductName, price: this.products[c].ProductPrice, prodId: this.products[c].ProductId, quantity: this.consolidatedOrderItems[a].products[b].count})
                        }
                    }
                }
                this.consolidatedProducts.push({items: this.newArray, orderId: this.consolidatedOrderItems[a].OrderId})
            }
            console.log(this.consolidatedProducts)
            /*
            for(var a = 0; a < this.orders.length; a++)
            {
                if(this.orders[a].OrderStatus == 1)
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
            console.log(this.consolidatedOrderItems)


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
                this.consolidatedProducts.push({items: this.newArray, orderId: this.consolidatedOrderItems[a].OrderId})
            }
            */
            this.Filltext();
        },
        Filltext() 
            {
                
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