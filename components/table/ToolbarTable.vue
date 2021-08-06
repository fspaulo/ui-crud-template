<template>
  <div>
    <v-toolbar class="" flat>
      <v-toolbar-title class="h1 mr-7">{{ title }}</v-toolbar-title>

      <v-col v-if="isQuickSearch" cols="3">
        <v-text-field v-model="searchValueFlag" autocomplete="off"
                      append-icon="mdi-magnify"
                      :label="$t('search')"
                      single-line
                      hide-details
                      clearable
        />
      </v-col>

      <DetailSearch v-if="isDetailSearch"/>

      <!-- TODO salvar filtros no banco e mostrar aqui -->
      <v-col v-if="!isDetailSearch" cols="2" sm="2">
        <v-select
          :label="$t('toolbarTable.filter')"
          append-icon="mdi-filter-outline"
          hide-details
          dense
          outlined
        ></v-select>
      </v-col>

      <v-spacer/>

      <!-- BOTÃO REFRESH -->
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" class="elevation-0 mr-4" v-on="on">
            <v-icon>mdi-refresh</v-icon>
            <template v-slot:loader>
                <span class="custom-loader">
                  <v-icon>mdi-refresh</v-icon>
                </span>
            </template>
          </v-btn>
        </template>
        <span class="caption">{{ $t("toolbarTable.reload") }}</span>
      </v-tooltip>
    </v-toolbar>

    <v-spacer/>
  </div>
</template>

<script>
import DetailSearch from "~/components/table/DetailSearch";
import {mapGetters} from "vuex";

export default {
  components: {
    DetailSearch
  },

  props: {
    searchValue: String,
    title: String,
  },

  methods: {
    ...mapGetters("toolbar", ["getQuickSearch", "getDetailSearch"]),

    watchSearchValue(e) {
      this.$emit("send", e);
    },
  },

  computed: {
    isQuickSearch() {
      return this.getQuickSearch();
    },

    searchValueFlag: {
      get: function () {
        return this.searchValue
      },
      set: function (val) {
        this.$emit('send', val)
      }
    },

    isDetailSearch() {
      return this.getDetailSearch();
    },
  },

  watch: { // toda vez q o valor da variavel mudar, chama watch
    searchValueFlag: function (e) {
      this.watchSearchValue(e);
    },
  },

}
</script>

<style scoped>

</style>
