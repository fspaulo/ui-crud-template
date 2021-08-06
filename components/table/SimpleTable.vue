<template>
  <div>
    <Toolbar :header="headers" :data="data" :title="title"/>
    <ToolbarTable :title="title" :searchValue="search" @send="receiveSearch"/>

    <action-button id="action-buttons" @actionClick="clickEditDialog"
                   :create-item="createItem"
                   :edit-item="editItem"
                   :registers="data.length"/>

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

    <div>
      <el-table
        id="dataTable"
        :key="key"
        :ref="isMultipleSelect ? 'multipleTable' : 'table'"
        :data="data.filter(d => !search || d.name.toLowerCase().includes(search.toLowerCase()))"
        width="100%"
        :height="tableSizeByScreen"
        fit
        border
        highlight-current-row
        :empty-text="$t('simpleTable.emptyTable')"
        @row-click="clickProperties"
        @current-change="clickTeste"
        :stripe="this.$vuetify.theme.dark === false"
        :span-method="arraySpanMethod(headers.length)"
        :class="this.$vuetify.theme.dark === true ? 'table-box-dark' : 'table-box-light'"
        @selection-change="handleSelectionChange"
      >

        <el-table-column v-if="isMultipleSelect"
                         :show-overflow-tooltip="true"
                         type="selection" width="45"/>

        <el-table-column v-for="item in fixedHeader"
                         :key="item.value"
                         :fixed="item.fixed"
                         :label="item.text"
                         :show-overflow-tooltip="true"
                         :sortable="item.sortable"
                         :prop="item.value"
                         :width="item.width"
        />

        <el-table-column v-for="item in defaultHeader"
                         :key="item.text"
                         :fixed="item.fixed"
                         :label="item.text"
                         :show-overflow-tooltip="true"
                         :sortable="item.sortable"
                         :prop="item.value"
                         :width="item.width"
        >
          <template slot-scope="scope">
            {{ scope.row[item.value] }}
          </template>
        </el-table-column>

        <el-table-column width="40" fixed="right">
          <template slot="header">
            <v-select v-model="checkboxVal" :items="headersCheckboxOptions"
                      class="remove_underline mt-3"
                      append-icon="mdi-menu"
                      multiple return-object
                      flat dense>
              <template v-slot:selection="{ item, index }"/>
            </v-select>
          </template>
        </el-table-column>

      </el-table>

      <properties-table
        :show-properties-table="showPropertiesTable"
        :selected-item="selectedItem"
        :headers="headers"
        :table-name="title"
        :max-height="tableSizeByScreen"
        :hide-properties-table="hidePropertiesTable"
      />
    </div>

  </div>
</template>

<script>
import Toolbar from "~/components/main/Toolbar";
import ToolbarTable from "~/components/table/ToolbarTable";
import PropertiesTable from "~/components/table/PropertiesTable";
import ActionButton from "~/components/table/ActionButton";
import EditDialog from "~/components/table/EditDialog";
import ConfirmDialog from "~/components/table/ConfirmDialog"
import {mapGetters, mapMutations} from "vuex";

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
      selected: [], // multiple select

      showPropertiesTable: false,
      showEditDialog: false,
      showConfirmDialog: false,
      selectedItem: Object,
      tableName: String,
      actionButton: Object,

      key: 1, // refresh table
      headersCheckboxOptions: this.headers, // all headers in checkbox
      checkboxVal: [], // Marked checkbox show=true
      defaultHeader: [], // Default headers show=true
      fixedHeader: [], // fixed header
    }
  },

  methods: {
    ...mapGetters("tables", ["getMultipleSelect"]),
    ...mapMutations("toolbar", ["setHeadersTable", "setDataTable"]),

    receiveSearch(e) {
      this.search = e;
    },

    arraySpanMethod(arraySize) {
      return ({row, column, rowIndex, columnIndex}) => {
        if (!this.isMultipleSelect)
          if (columnIndex === arraySize - 1)
            return [1, 2];
          else if (columnIndex === arraySize)
            return [1, 2];
      }
    },

    handleSelectionChange(val) {
      this.selected = val;
    },

    clickProperties(item) {
      this.showPropertiesTable = !this.showPropertiesTable;
      this.selectedItem = item;
      this.selected = item;
    },

    clickEditDialog(btn) {
      this.actionButton = btn

      if (this.showPropertiesTable === true) {
        if (btn.name === "delete") {
          /*ActionButton.methods.deleteProperty(btn, this.selectedItem);*/
          this.showConfirmDialog = !this.showConfirmDialog;
        }

        if (btn.name === "edit") {
          /*ActionButton.methods.editProperty(btn, this.selectedItem);*/
          this.showEditDialog = !this.showEditDialog;
        }

      } else {
        if (btn.name === "create") {
          this.showEditDialog = !this.showEditDialog;
          this.selectedItem = {};
          /* ActionButton.methods.createProperty();*/
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

    clickTeste() { // todo quickisearch
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
    // Detailed search
    this.setHeadersTable(this.headers);
    this.setDataTable(this.data);

    const filter = this.headers.filter(el => el.show === true) // checkbox shows only marked show=true
    this.checkboxVal = filter
    this.defaultHeader = filter

    this.fixedHeader = this.headers.filter(el => el.fixed === true) // fixed header

    this.headersCheckboxOptions = this.headers.filter(el => { // filter to show checkbox options only on unfixed headers
      if (el.show === true && el.fixed === false) {
        return el;
      } else if (el.show === false && el.fixed === false) {
        return el
      }
    })
  },

  computed: {
    isMultipleSelect() {
      return this.getMultipleSelect();
    },

    tableSizeByScreen() {
      if (screen.height < 700) return '68vh';
      if (screen.height >= 820 && screen.height < 1000) return '74vh';
      if (screen.height > 1000) return '84.5vh';
      else return 0;
    },
  },

  watch: {
    isMultipleSelect() {
      this.selected = [];
    },

    checkboxVal(valArr) {
      this.defaultHeader = this.headersCheckboxOptions.filter(el => valArr.indexOf(el) >= 0)
      this.key = this.key + 1
    },
  }
}
</script>

<style lang="scss">

.remove_underline {
  padding-right: 100%;
}

.table-box-dark {
  background-color: #303030; //scroll bar
  border: 1px solid #484848;

  th { // header
    padding: 0 !important;
    height: 20px;
    background: #303030;
    color: #ffffff;
    border-right: 1px solid #484848;
    border-bottom: 1px solid #484848;
  }

  td { // data rows
    padding: 0 !important;
    height: 15px;
    background: #303030;
    color: #ffffff;
    border-right: 1px solid #484848;
    border-bottom: 1px solid #484848;
  }

  .el-table__body tr:hover > td { // mouse hover
    background-color: #484848 !important;
  }

  .el-table__body tr.current-row > td { // selected row
    background-color: #66432d !important;
  }

  .el-table__fixed-right-patch { // space on top of table scroll bar
    background-color: #303030;
    //border: none;
  }

}

.table-box-light {
  th {
    padding: 0 !important;
    height: 20px;
    background: #F5F7FA;
    color: #606266;
  }

  td {
    padding: 0 !important;
    height: 15px;
    line-height: 3.5vh;
  }

  .el-table__body tr.current-row > td { // selected row
    background-color: #cee7ff !important;
  }

  .el-table__fixed-right-patch { // espaço em cima da scroll bar da tabela
    background-color: #F5F7FA;
  }
}

</style>
