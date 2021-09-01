<template>
  <v-navigation-drawer
    transition="scroll-y-reverse-transition"
    v-if="showPropertiesTableFlag"
    :clipped="false"
    app
    right
    fixed
    :class="this.$vuetify.theme.dark === true ? 'property-table-dark' : 'property-table-light'"
  >

    <!-- TABELA DE PROPRIEDADES PARA VISUALIZAÇÃO -->
    <template v-slot:prepend>
      <v-toolbar color="primary" class="font-weight-medium" dark dense>
        <v-icon class="mr-2 font-weight-thin" color="white">mdi-server</v-icon>
        <v-toolbar-title>{{ $t('properties').toUpperCase() }}</v-toolbar-title>
        <v-spacer/>
        <v-icon class="indigo--text" @click="hidePropertiesTable">
          mdi-chevron-triple-right
        </v-icon>
      </v-toolbar>

      <v-list class="ml-2 mr-2" height="100%">
        <v-tabs
          v-model="active_tab"
          class="mt-2 rounded-t-lg elevation-5"
          :background-color="isDarkTheme ? '#272727' : ''"
          fixed-tabs
          icons-and-text
          height="48px"
        >
          <v-tabs-slider/>
          <v-tab v-for="item in items" :key="item.tab">
            <v-icon class="mr-1" v-text="item.icon"></v-icon>
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="active_tab" class="elevation-1">
          <v-tab-item>
            <v-simple-table class="properties py-2" :height="maxHeight">
              <tr>
                <th class="properties-table-header" colspan="2">
                  {{ $t(tableName).toUpperCase() }}
                </th>
              </tr>

              <tr
                v-for="header in headers"
                :key="header.text"
              >
                <td v-if="!showHeaders(header)"
                    class="table-data" colspan="2">
                  <label>{{ header.text }}:</label>
                  <div v-if="selectedItem[header.value].length > 45">
                    <textarea class="table-fields" disabled rows="5" :value="selectedItem[header.value]"/>
                  </div>
                  <div v-else>
                    <input class="table-fields" disabled :value="selectedItem[header.value]"/>
                  </div>
                </td>
              </tr>
            </v-simple-table>
          </v-tab-item>

          <v-tab-item>
            <v-simple-table class="properties py-2" :height="maxHeight">
              <tr>
                <th class="properties-table-header" colspan="2">
                  {{ $t(tableName).toUpperCase() }}<br>{{ $t('recordDetails') }}
                </th>
              </tr>

              <tr
                v-for="header in headers"
                :key="header.text"
              >
                <td v-if="showHeaders(header)"
                    class="table-data" colspan="2">
                  <label>{{ header.text }}:</label>
                  <div v-if="selectedItem[header.value].length > 45">
                    <textarea class="table-fields" disabled rows="5" :value="selectedItem[header.value]"/>
                  </div>
                  <div v-else>
                    <input class="table-fields" disabled :value="selectedItem[header.value]"/>
                  </div>
                </td>
              </tr>
            </v-simple-table>
          </v-tab-item>
        </v-tabs-items>

      </v-list>
    </template>

  </v-navigation-drawer>
</template>

<script>
import "~/assets/styles.scss"

export default {
  name: "PropertiesTable.vue",

  mixins: [],

  props: {
    showPropertiesTable: Boolean,
    hidePropertiesTable: Function,
    selectedItem: [Object, Function],
    headers: Array,
    tableName: String,
    maxHeight: [Number, String]
  },

  data() {
    return {
      active_tab: 0,
      items: [
        {
          tab: 'main',
          icon: 'mdi-file-eye',
        },
        {
          tab: 'secondary',
          icon: 'mdi-database-search',
        }],
      dialog: false,
    }

  },

  watch: {},

  methods: {
    // value(val) {
    //   let t = this.selectedItem
    // },

    showHeaders(h) {
      if (h.text === this.$t('created') || h.text === this.$t('modified') ||
        h.text === this.$t('id')) {
        return h
      }
    }
  },

  computed: {
    showPropertiesTableFlag: {
      get: function () {
        return this.showPropertiesTable
      },
      set: function (val) {
        this.$emit('emitterdrawer', val)
      }
    },

    isDarkTheme() {
      return this.$vuetify.theme.dark === true
    },

  },

}
</script>

<style lang="scss">

.nav-properties {
  float: right;
  width: 100vw;
  max-height: 100vh;
}

.table-data {
  padding-left: 5px;
  padding-right: 5px;
  font-size: 10pt;
}

.properties-table-header {
  padding-left: 5px;
  padding-right: 5px;
  border-radius: 10px;
}

.property-table-dark {

  .properties {
    background-color: #484848;
    border: 1px solid #5c5c5c;
  }

  .properties-table-header {
    border: 5px solid #484848;
    background-color: #303030;
  }

  .table-data {
    border: 5px solid #484848;
    background-color: #484848;
  }

  .table-fields {
    background-color: #5d5d5d;
    color: #efefef;
  }

  .tabs {
    background-color: #272727;
  }
}

.property-table-light {

  .nav-properties {
    background-color: #fafafa;
  }

  .properties {
    background-color: #ebebeb;
    border: 1px solid #bbbbbb;
  }

  .properties-table-header {
    border: 5px solid #ebebeb;
    background-color: #979797;
    color: whitesmoke;
  }

  .table-data {
    border: 5px solid #ebebeb;
    background-color: #ebebeb;
  }

  .table-fields {
    background-color: white;
  }

}

</style>
