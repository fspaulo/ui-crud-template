<template>
  <v-toolbar class="" height="34vh" elevation="3">

    <v-row>
      <v-menu v-for="(item, indexItem) in itemsMenu" :key="item.title"
              bottom transition="slide-x-transition" offset-y>
        <template v-slot:activator="{ attrs, on }">
          <v-btn class="mt-1" v-bind="attrs" v-on="on"
                 :color="isDarkTheme ? '#363636' : '#F5F5F5'">
            <span class="caption">{{ item.title }}</span>
            <v-icon class="ml-1" dark left>mdi-chevron-down</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="(subItem, indexSubItem) in item.items" :key="subItem.title"
                       @click="menuActionClick(subItem.action, indexItem, indexSubItem)" link dense>
            <v-icon class="mr-1">{{ subItem.icon }}</v-icon>
            <v-list-item-title v-text="subItem.title">
            </v-list-item-title>
          </v-list-item>
        </v-list>

      </v-menu>
    </v-row>

  </v-toolbar>
</template>

<script>
import {mapMutations} from "vuex"
import {mapGetters} from "vuex"

export default {
  props: {
    title: String, //Titulo do arquivo criado
    data: Array, //Dados das tabelas
    header: Array, //Array header
  },

  data() {
    return {
      downloadLoading: false,
      filename: this.title.toLowerCase(), //Define o nome do arquivo de download
      autoWidth: true, //Define automaticamente o tamanho dos blocos do Excel
      bookType: 'xlsx', //Define o tipo do arquivo

      headerText: [], //Nome do header para tabela do excell
      headerName: [], //Value do header para mapear com os dados
    }
  },

  computed: {

    itemsMenu() {
      return [
        { // items do menu
          title: this.$t("toolbar.dialog"),
          items: [ // sub-items do menu
            {
              title: this.$t("toolbar.save"), icon: "mdi-content-save",
              action: () => {
                console.log('savePage')
              }
            },
            {
              title: this.$t("toolbar.reset"), icon: "mdi-repeat",
              action: () => {
                console.log('resetPage')
              }
            },
          ],
        },
        {
          title: this.$t("toolbar.data"),
          items: [
            {
              title: this.$t("toolbar.multiSelect"), icon: "mdi-format-list-checkbox",
              action: () => {
                this.changeMultiSelect()
              }
            },
            {
              title: this.$t("toolbar.quickSearch"), icon: "mdi-magnify-minus-outline",
              action: () => {
                this.changeQuickSearch()
              }
            },
            {
              title: this.$t("toolbar.detailedSearch"), icon: "mdi-magnify-plus-outline",
              action: () => {
                this.changeDetailSearch()
              }
            },
            {
              title: this.$t("toolbar.excelExport"), icon: "mdi-microsoft-excel ",
              action: () => {
                this.handleDownload()
              }
            },
          ],
        },
      ]
    }, // fim itemsMenu

    isDarkTheme() {
      return this.$vuetify.theme.dark === true;
    },

  },

  methods: {
    ...mapGetters("tables", ["getMultipleSelect"]),
    ...mapMutations("tables", ["setMultipleSelect"]),

    ...mapGetters("toolbar", ["getQuickSearch", "getDetailSearch"]),
    ...mapMutations("toolbar", ["isQuickSearch", "isDetailSearch"]),

    changeMultiSelect() {
      let multiSelect = this.getMultipleSelect();
      this.setMultipleSelect(!multiSelect);
    },

    changeQuickSearch() {
      let quickSearch = this.getQuickSearch();
      if (quickSearch) return;

      this.isQuickSearch(!quickSearch);
      this.isDetailSearch(false);
    },

    changeDetailSearch() {
      let detailSearch = this.getDetailSearch();
      if (detailSearch) return;

      this.isDetailSearch(!detailSearch);
      this.isQuickSearch(false);
    },

    menuActionClick(action, indexItem, indexSubItem) {
      if (this.itemsMenu[indexItem].items[indexSubItem].action === action)
        this.itemsMenu[indexItem].items[indexSubItem].action();
    },

    //Inicio export excell
    handleDownload() {

        this.headerName = [];
        this.headerText = [];
        this.header.forEach(el => {
          this.headerText.push(el.text);
          this.headerName.push(el.value);
        });

      this.downloadLoading = true

      import('@/plugins/Export2Excel').then(excel => {

        const headerText = this.headerText;
        const headerName = this.headerName;

        const listData = this.formatJson(headerName, this.data);

        excel.export_json_to_excel({
          header: headerText,
          data: listData,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })

        this.downloadLoading = false
      })
    },
    //Mapeia o dado com o header formatando para json
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        return v[j]
      }))
    },
    //fim
  },

}
</script>

<style>
.buttons-dark{
  background-color: #363636;
}
.buttons-light{
  background-color: #F5F5F5;
}
</style>
