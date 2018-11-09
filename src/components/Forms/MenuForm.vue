<template>
    <div>
        <form>
            <md-card>
                <md-card-header :data-background-color="dataBackgroundColor">
                    <h4 class="title">Add a Menu</h4>
                    <p class="category">This will create a new menu/section</p>
                </md-card-header>
                <md-card-content>
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item  md-size-35">
                            <md-field>
                                <label for="menu-type">Menu Type</label>
                                <md-select v-model="menuType" name="menu-type" id="menu-type">
                                    <md-option value="Food">Food</md-option>
                                    <md-option value="Drink">Drink</md-option>
                                </md-select>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-size-50">
                            <md-field>
                            <label>Menu Name</label>
                            <md-input v-model="menuName" type="text"></md-input>
                            </md-field>
                        </div>
                    </div>
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item">
                            <md-field>
                            <label>Menu Description</label>
                            <md-textarea v-model="menuDesc"></md-textarea>
                            <md-icon>description</md-icon>
                            </md-field>
                        </div>
                    </div>
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item md-size-50">
                            <md-field>
                            <label>Menu ETA <small>( ETA is in minutes )</small></label>
                            <md-input v-model="menuETA" type="number"></md-input>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-size-100 text-right">
                            <md-button class="md-raised md-success" @click="submit()">Add Menu</md-button>
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
  name: "menu-form",
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
        menuType: "",
        menuName: "",
        menuETA: 0,
        menuDesc: ""
    }),
    methods: {
        submit: function(){
          var data = {
                MenuName: this.menuName,
                MenuDescription: this.menuDesc,
                MenuType: this.menuType,
                EstimatedTime: this.menuETA
            };
          axios
            .post(
            "https://mayfieldgolfapi.azurewebsites.net/api/Menus",
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
                message: 'Menu was added',
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