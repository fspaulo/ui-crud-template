<!--
  Component responsible for the side menu
  According to the current interface
   @property currentInterface,
  the menu is molded.
 -->
<template>
  <v-navigation-drawer
    v-if="isAuthenticated"
    v-model="drawerFlag"
    :clipped="clipped"
    app
    fixed
    :color="!isDarkTheme ? '#fafafa' : '' "
  >
    <v-list dense shaped>
      <v-list-item class="mb-1">
        <v-text-field
          v-model="menuSearch"
          :label="this.$t('search')"
          filled
          outlined
          dense
          clearable
        ></v-text-field>
      </v-list-item>

      <v-list-item to="/">
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Home</v-list-item-title>
      </v-list-item>

      <!-- MAIN GROUP -->
      <!-- If search field is empty -->
      <v-list-group v-if="!menuSearch"
                    v-for="item in filteredItems"
                    :value="true"
                    :key="item.title"
                    :prepend-icon="item.icon">
        <template v-slot:activator>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </template>

        <!--  If subItem does not have the attribute items, link directly to the page  -->
        <v-list-item v-if="typeof subItem.items === 'undefined'"
                     v-for="subItem in item.subItems"
                     :key="subItem.title"
                     :to="subItem.to"
                     router link>
          <v-list-item-icon>
            <v-icon v-text="subItem.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-title v-text="subItem.title"></v-list-item-title>
        </v-list-item>

        <!-- SUB-SUB-GROUP -->
        <!-- If subItem has an attribute items, create sub-groups with respective items -->
        <v-list-group v-if="typeof subItem.items !== 'undefined' && subItem.items !== null"
                      v-for="subItem in item.subItems"
                      :key="subItem.title"
                      no-action sub-group>
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>{{ subItem.title }}</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item v-for="item in subItem.items" :key="item.title" :to="item.to" router>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item>
        </v-list-group>

      </v-list-group>

      <!-- If something is searched, render the items -->
      <v-list-item v-if="menuSearch"
                   v-for="(item) in filteredItems"
                   :key="item.title"
                   :to="item.to">
        <v-list-item-title v-text="item.title"></v-list-item-title>
      </v-list-item>

    </v-list>

  </v-navigation-drawer>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "Drawer",

  props: {
    drawer: Boolean,
    clipped: Boolean,
  },

  data() {
    return {
      menuSearch: null,
      itemsMyWms: [
        {   // items do menu
          title: this.$tc("api", 2),
          icon: "mdi-api",
          subItems: [  // sub-items do menu
            {title: this.$t("covid.covid"), to: "/menu1/api/covid"},
            {title: this.$tc("pokemon", 2), to: "/menu1/api/pokemons"},
            {title: this.$tc("beer", 2), to: "/menu1/api/beers"},
          ],
        },

        {
          title: this.$t("activities"),
          icon: "mdi-clipboard-text-search-outline",
          subItems: [
            {
              title: this.$tc("sports", 2),
              items: [
                {title: this.$tc("sports", 2), to: "/menu1/sports/sports", icon:"mdi-basketball"},
                {title: this.$t("e_sports"), to: "/menu1/sports/e_sports", icon:"mdi-basketball"},
              ]
            },

            {
              title: this.$tc("area", 2),
              items: [
                {title: this.$t("science"), to: "/menu1/areas/science"},
                {title: this.$t("development"), to: "/menu1/areas/development"},
              ]
            },

            {
              title: this.$tc("device", 2),
              items: [
                {title: this.$tc("device", 2), to: "/menu1/devices/device"},
                {title: this.$t("consoles"), to: "/menu1/devices/consoles"},
              ]
            },
          ],
        },

      ], // fim items

      itemsMyBI: [
        {   // items do menu
          title: "Main",
          icon: "mdi-chart-bar",
          subItems: [  // sub-items do menu
            {title: "Dashboard", to: "/menu2/dashboard"},
            // {title: this.$tc("user", 1), to: "/menu1/api/user"},
          ],
        },
      ],
    }
  },

  methods: {},

  computed: {
    ...mapGetters(['getCurrentInterface']),

    isAuthenticated() {
      return this.$store.getters.getLoggedIn;
    },

    filteredItems() {
      if (!this.menuSearch) {
        if (this.getCurrentInterface === 0)
          return this.itemsMyWms;

        else if (this.getCurrentInterface === 1)
          return this.itemsMyBI

        else if (this.getCurrentInterface === 2)
          return null
      }

      let filtered = []

      if (this.getCurrentInterface === 0 || this.getCurrentInterface === 2) { // menu 01
        this.itemsMyWms.filter(item => {
          item.subItems.filter(subItem => {

            /* If it does NOT have 'to' attribute, then it is a subfolder. */
            if (subItem.title.toLowerCase().includes(this.menuSearch) && typeof subItem.to !== 'undefined')
              filtered.push(subItem)

            /* If exists attribute items in subItems... */
            if (typeof subItem.items !== 'undefined') {
              subItem.items.forEach(itemFromSub => {
                if (itemFromSub.title.toLowerCase().includes(this.menuSearch))
                  filtered.push(itemFromSub)
              })
            }
          })
        })
      }
      else if (this.getCurrentInterface === 1) { // menu 02
        this.itemsMyBI.filter(item => {
          item.subItems.filter(subItem => {

            /* If it does NOT have 'to' attribute, then it is a subfolder. */
            if (subItem.title.toLowerCase().includes(this.menuSearch) && typeof subItem.to !== 'undefined')
              filtered.push(subItem)

          })
        })
      }

      return filtered;
    },

    drawerFlag: {
      get: function () {
        return this.drawer
      },
      set: function (val) {
        this.$emit('emitterDrawer', val)
      }
    },

    isDarkTheme() {
      return this.$vuetify.theme.dark === true;
    },
  },

  watch: {}

}
</script>

