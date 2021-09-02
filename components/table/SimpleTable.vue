<template>
  <div>
    <Toolbar :header="headers" :data="data" :title="title"/>

    <edit-dialog
      :show-edit-dialog="showEditDialog"
      :selected-item="selectedItem"
      :headers="headers"
      :table-name="title"
      @emitterdialog="clickEditDialog"
      :hide-edit-dialog="hideEditDialog"
      :action-button="actionButton"
      :edit-item="editItem"
      :create-item="createItem"
      :show-properties-table="showPropertiesTable"
    />

    <confirm-dialog
      :show-confirm-dialog="showConfirmDialog"
      :hide-confirm-dialog="hideConfirmDialog"
      :selected-item="selectedItem"
      :action-button="actionButton"
      :table-name="title"
      :deleted-item="deleteItem"
    />

    <v-card elevation="1">
      <v-data-table
        v-model="selected"
        :headers="showHeaders"
        :items="data"
        :search="search"
        height="calc(102vh - 100px)"
        fixed-header
        dense
        @click:row="clickProperties"
        :no-data-text="$t('simpleTable.emptyTable')"
        :no-results-text="$t('simpleTable.noResult')"
        :loading-text="$t('simpleTable.loading')"
        class="elevation-1 createTable"
        :single-select="false"
        :show-select="isMultipleSelect"
        :footer-props="{
        'items-per-page-text': 'Items por página',
        'items-per-page-options': itemsPerPageSelect,
      }"
      >
        <!--  Table Header  -->
        <template v-slot:top>
          <ToolbarTable :title="title" :searchValue="search" @send="receiveSearch"/>

          <action-button id="action-buttons"
                         @actionClick="clickEditDialog"
                         :create-item="createItem"
                         :edit-item="editItem"
                         :registers="data.length"/>

          <div class="button_columns mr-6 mt-0">
            <v-select v-model="selectedHeaders"
                      :items="newHeaders" class="remove_underline mt-3"
                      append-icon="mdi-menu"
                      multiple
                      return-object
                      flat dense>
              <template v-slot:selection="{ item, index }"/>
            </v-select>
          </div>
        </template>
      </v-data-table>
    </v-card>

    <properties-table
      :show-properties-table="showPropertiesTable"
      :selected-item="selectedItem"
      :headers="headers"
      :table-name="title"
      :max-height="tableSizeByScreen"
      :hide-properties-table="hidePropertiesTable"
    />

  </div>
</template>

<script>
import Toolbar from "~/components/main/Toolbar";
import ToolbarTable from "~/components/table/ToolbarTable";
import {mapGetters, mapMutations} from "vuex"
import PropertiesTable from "~/components/table/PropertiesTable";
import ActionButton from "~/components/table/ActionButton";
import EditDialog from "~/components/table/EditDialog";
import ConfirmDialog from "~/components/table/ConfirmDialog";

export default {
  components: {
    Toolbar,
    ToolbarTable,
    PropertiesTable,
    ActionButton,
    EditDialog,
    ConfirmDialog,
  },

  props: {
    title: String,
    data: Array,
    headers: Array,
  },

  data() {
    return {
      search: '',
      selected: [],
      itemsPerPageSelect: [15, 25, 50, 75, 100],

      showPropertiesTable: false,
      showEditDialog: false,
      showConfirmDialog: false,
      selectedItem: Object,
      tableName: String,
      actionButton: Object,

      newHeaders: [],
      selectedHeaders: [],
    }
  },

  methods: {
    ...mapGetters("tables", ["getMultipleSelect"]),
    ...mapMutations("toolbar", ["setHeadersTable", "setDataTable"]),

    receiveSearch(e) {
      this.search = e;
    },

    clickProperties(item) {
      this.showPropertiesTable = !this.showPropertiesTable;
      this.selectedItem = item;
      this.selected = item;
    },

    clickEditDialog(btn) {
      this.actionButton = btn

      if (this.showPropertiesTable === true) {
        if (btn.name === this.$t('delete')) {
          this.showConfirmDialog = !this.showConfirmDialog;
        }

        if (btn.name === this.$t('edit')) {
          this.showEditDialog = !this.showEditDialog;
        }

      } else {
        if (btn.name === this.$t('create')) {
          this.showEditDialog = !this.showEditDialog;
          this.selectedItem = {};
        }
      }
    },

    deleteItem() {
      // use this.selected, and loop through the selected items
      let index = this.data.indexOf(this.selectedItem)
      if (index > -1) {
        this.data.splice(index, 1);
      }
      this.hideConfirmDialog();
      this.hidePropertiesTable();
    },

    editItem(item) {
      let index = this.data.indexOf(this.selectedItem)
      console.log(item.name + " / " + index);
      Object.assign(this.data[index], item)
      this.hideEditDialog();
    },

    createItem(selectedItem) {
      this.data.push(selectedItem);
      this.hideEditDialog();
    },

    hidePropertiesTable() {
      console.log("hidePropertiesTable")
      this.showPropertiesTable = false;
    },

    hideEditDialog() {
      console.log("hideEditDialog");
      this.showEditDialog = false;
    },

    hideConfirmDialog() {
      console.log("hideConfirmDialog")
      this.showConfirmDialog = false;
    },

  },

  created() {
    this.newHeaders = Object.values(this.headers);
    this.selectedHeaders = this.newHeaders;
  },

  computed: {
    showHeaders() {
      return this.newHeaders.filter(s => this.selectedHeaders.includes(s));
    },

    isMultipleSelect() {
      return this.getMultipleSelect();
    },

    itemPerPageByScreen() {
      if (screen.height < 700) return 15;
      else if (screen.height >= 700 && screen.height < 820) return 25;
      else if (screen.height >= 820 && screen.height < 1000) return 50;
      else if (screen.height > 1000) return 75;
      else return 0;
    },

    tableSizeByScreen() {
      if (screen.height < 700) return '68vh';
      if (screen.height >= 700 && screen.height < 1000) return '74vh';
      if (screen.height > 1000) return '84.5vh';
      else return 0;
    },
  },

  watch: {
    isMultipleSelect() {
      this.selected = [];
    }
  }

}
</script>

<style scoped>
.button_columns {
  float: right;
  justify-content: center;

  width: 8px;
}

.remove_underline {
  padding-right: 100%;
}

.v-data-table.v-data-table.v-data-table {
  white-space: nowrap;
}

/* Table css for Light theme */
.theme--light.v-data-table.v-data-table.v-data-table >>> th {
  resize: horizontal;
  background-color: #ececec;
}

.theme--light.v-data-table.v-data-table.v-data-table >>> td {
  min-width: 10px;
  max-width: 255px;
  overflow: auto;
  border-bottom: 1px solid lightgrey;
  font-size: smaller;
  height: 35px;
}

/* Table css for Dark theme */
.theme--dark.v-data-table.v-data-table.v-data-table >>> th {
  resize: horizontal;
  background-color: #303030;
  border-right: 1px solid #484848;
}

.theme--dark.v-data-table.v-data-table.v-data-table >>> td {
  min-width: 10px;
  max-width: 255px;
  overflow: auto;
  /*border-right: 1px solid #484848;*/
  border-bottom: 1px solid #484848;
  font-size: smaller;
  height: 35px;
}

</style>
