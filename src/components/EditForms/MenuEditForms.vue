<template>
    <div>
        <form>
            <md-card>
                <md-card-header :data-background-color="dataBackgroundColor">
                    <h4 class="title">Update a Menu</h4>
                    <p class="category">This will update an existing menu/section</p>
                </md-card-header>
                <md-card-content>
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item  md-size-35">
                            <md-field>
                                <label for="menu-type">Menu Type</label>
                                <md-select v-model="menus.MenuType" name="menu-type" id="menu-type" disabled>
                                    <md-option value="Food">Food</md-option>
                                    <md-option value="Drink">Drink</md-option>
                                </md-select>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-size-50">
                            <md-field>
                            <label>Menu Name</label>
                            <md-input v-model="menus.MenuName" type="text"></md-input>
                            </md-field>
                        </div>
                    </div>
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item">
                            <md-field>
                            <label>Menu Description</label>
                            <md-textarea v-model="menus.MenuDescription"></md-textarea>
                            <md-icon>description</md-icon>
                            </md-field>
                        </div>
                    </div>
                    <div class="md-layout md-gutter">
                        <div class="md-layout-item md-size-50">
                            <md-field>
                            <label>Menu ETA <small>( ETA is in minutes )</small></label>
                            <md-input v-model="menus.EstimatedTime" type="number"></md-input>
                            </md-field>
                        </div>
                        <div class="md-layout-item md-size-100 text-right">
                            <md-button class="md-raised md-success" @click="updateMenu()">Update Menu</md-button>
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
  name: "menu-edit-form",
  props: {
    dataBackgroundColor: {
      type: String,
      default: ''
    }
  },
    data: () => ({
        menus: [],
        types: ['', 'info', 'success', 'warning', 'danger'],
        notifications: {
          topCenter: false
        }
        }),
    created() {
        axios.get(`https://mayfieldgolfapi.azurewebsites.net/api/Menus/${sessionStorage.editmenuid}`)
        .then(response => {
            // JSON responses are automatically parsed.
            this.menus = response.data
        })
        .catch(e => {
            console.log(e)
        });
    },
    methods: {
        updateMenu() {
          var menuToUpdate = qs.stringify({
                MenuId: this.menus.MenuId,
                MenuName: this.menus.MenuName,
                MenuType: this.menus.MenuType,
                MenuDescription: this.menus.MenuDescription,
                EstimatedTime: this.menus.EstimatedTime
          });

          axios({
                method: "put",
                url: `https://mayfieldgolfapi.azurewebsites.net/api/Menus/${sessionStorage.editmenuid}`,
                contentType: "application/raw",
                data: menuToUpdate,
            }).then(response => {
                this.notifySuccess("top","center")
                this.$router.go(-1);
                })
                .catch(e => {
                    console.log(e);
            })
        },
        notifySuccess (verticalAlign, horizontalAlign) {
            var color = Math.floor((Math.random() * 4) + 1)
            this.$notify(
            {
                message: 'Menu was updated',
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