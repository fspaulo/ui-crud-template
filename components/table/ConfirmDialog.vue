<template>
  <div class="text-center">
    <v-dialog
      v-model="showConfirmDialogFlag"
      v-if="showConfirmDialogFlag"
      persistent
      origin="left top"
      width="470px"
      transition="scale-transition"
    >
      <v-card class="properties">
        <v-card-title primary-title class="card-header primary white--text">
          <span class="pb-2 body-1">{{ $t("delete") }}</span>
        </v-card-title>

        <v-card-text>
          <div class="dialog-table-data pt-5 text-sm-subtitle-1">
            <v-icon size="40" color="red" class="mr-3">mdi-alert</v-icon>
            <span class="text-lg-body-1">{{ this.$t("deleteMessage") }}</span>
          </div>
        </v-card-text>

        <v-divider/>

        <v-list-item>
          <v-spacer/>
          <div>
            <v-btn
              class="btn-dialog elevation-3"
              color="btn-dialog" small
              @click="this.hideConfirmDialog"
            >
              {{ $t("cancel") }}
            </v-btn>
            <v-btn
              class="btn-dialog elevation-3"
              color="primary" small
              @click="deleteProperty()"
            >
              {{ $t("delete") }}
            </v-btn>
          </div>
        </v-list-item>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>

import "~/assets/styles.scss";

export default {
  components: {},

  props: {
    selectedItem: [Object, Function],
    headers: Array,
    tableName: String,
    showConfirmDialog: Boolean,
    hideConfirmDialog: Function,
    actionButton: [Object, Function],
    deletedItem: Function
  },

  data() {
    return {}
  },

  methods: {
    value() {
      return this.selectedItem
    },

    deleteProperty: function (btn, selectedItem) {
      // API para deletar o registro
      console.log("Function " + this.actionButton.action + " - Record: " + this.selectedItem.name);
      this.deletedItem();
    }
  },

  computed: {
    showConfirmDialogFlag: {
      get: function () {
        return this.showConfirmDialog
      },
      set: function (val) {
        this.$emit('emitter-dialog', val)
      }
    },
  },

}
</script>

<style scoped>

.properties {
  border: none;
}

.card-header {
  height: 40px;
}

.dialog-table {
  border-radius: 3px;
}

.dialog-table-data {
  padding-left: 10px;
  padding-right: 10px;
}

.btn-dialog {
  height: auto;
  width: auto;
  margin-left: 5px;
}

/* Light Theme */
.theme--light.dialog-table {
  background-color: lightgrey;
}

.theme--light.properties {
  background-color: #fafafa;
}

/* Dark Theme*/
.theme--dark.dialog-table {
  background-color: #303030;
}

.theme--dark.properties {
  background-color: #484848;
}
</style>
