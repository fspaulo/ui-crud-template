<template>
  <div>
    <v-dialog
      v-model="showEditDialogFlag"
      v-if="showEditDialogFlag"
      persistent
      max-width="620"
      min-width="200"
      transition="scale-transition"
      origin="left top"
      class="overflow-hidden"
    >
      <v-card :class="this.$vuetify.theme.dark === true ? 'card-dark' : 'card-light'">
        <v-card-title class="headline primary">
          <span style="color: white">{{ $t(tableName).toUpperCase() }}</span><!--TODO-->
          <v-spacer/>
          <v-icon
            class="white--text float-right pr-2 py-1"
            @click="close"
          >
            mdi-window-close
          </v-icon>
        </v-card-title>

        <v-card-text class="pt-1 pb-0 px-1 dialog-table overflow-y-auto">
          <v-container class="py-2" style="max-height: 63vh;">
            <!-- EDITAR -->
            <v-row no-gutters v-if="showPropertiesTable">
              <v-col cols="6">
                <v-row no-gutters dense
                       v-for="(header, index) in headers"
                       v-if="!showHeaders(header)"
                       :key="index"
                       class="flex-column"
                >
                  <v-col
                    class="d-flex"
                    v-if="item[header.value].length < 45 || typeof item[header.value] === 'number'"
                  >
                    <v-text-field
                      dense outlined filled
                      class="body-2"
                      :label="header.text"
                      v-model.lazy="item[header.value]"
                      :background-color="!isDarkTheme ? 'inputs' : ''"
                    />
                    <v-spacer/>
                  </v-col>
                </v-row>
              </v-col>

              <v-col cols="6">
                <v-row v-for="(header, index) in headers"
                       :key="index"
                >
                  <v-col v-if="item[header.value].length > 45">
                    <v-textarea
                      dense counter outlined filled
                      rows="4" no-resize
                      class="body-2 mb-n4"
                      :label="header.text"
                      :rules="rules"
                      v-model.lazy="item[header.value]"
                      :background-color="!isDarkTheme ? 'inputs' : ''"
                    />
                  </v-col>
                </v-row>
              </v-col>
            </v-row>

            <!-- CREATE -->
            <v-row v-else
                   v-for="(header, index) in headers"
                   :key="index"
            >
              <v-col cols="6">
                <v-textarea dense outlined filled rows="1" no-resize
                            class="body-2 mb-n4"
                            :label="header.text"
                            v-model="item[header.value]"
                            :background-color="!isDarkTheme ? 'inputs' : ''"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-divider/>

        <v-card-actions class="card-color">
          <v-spacer/>
          <v-btn text color="primary" @click="save(item)">
            {{ $t("save") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

import "~/assets/styles.scss";
import ActionButton from "~/components/table/ActionButton";
import DateMixin from "~/mixins/DateMixin";

export default {
  name: "EditDialog",
  components: {
    ActionButton,
  },
  mixins: [DateMixin],

  props: {
    selectedItem: [Object, Function],
    headers: Array,
    tableName: String,
    showEditDialog: Boolean,
    hideEditDialog: Function,
    actionButton: [Object, Function],
    editItem: Function,
    createItem: Function,
    showPropertiesTable: Boolean,
  },

  data() {
    return {
      rules: [v => v.length <= 255 || this.$t('maxCharacter255')],
      editedIndex: -1,
      editedItem: {},
      defaultItem: {}
    }
  },

  methods: {
    value() {
      return this.selectedItem
    },

    showHeaders(h) { // Verifica os campos de entidade principal, para mostrar ou não
      if (h.text === this.$t('created') || h.text === this.$t('modified') ||
        h.text === this.$t('dbId') || h.text === this.$t('dbVersion')) {
        return h;
      }
    },

    modifiedData(values) { // para popular os dados
      switch (values) {
        case 'created':
          this.item[values] = this.formatDate(new Date());
          break
        case 'modified':
          this.item[values] = this.formatMoment();
          break
        case 'dbId':
          this.item[values] = Math.floor(Math.random() * 65536)
          break
        case 'dbVersion':
          this.item[values] = Math.floor(Math.random() * 10)
          break
      }
      if (!this.item[values])
        this.item[values] = '';
    },

    save: function (item) {
      if (this.showPropertiesTable === true) {
        console.log("Function " + this.actionButton.action + " - Record: " + this.item.name);

        this.editedItem = Object.assign({}, item)
        console.log(this.editedItem)

        /*ActionButton.methods.editProperty(this.actionButton, this.selectedItem);*/
        this.editItem(this.item)

      } else if (item !== null) {
        const arrayValues = [];
        this.headers.filter(el => arrayValues.push(el.value))

        /*ActionButton.methods.createProperty();*/
        this.createItem(item);
      }
    },

    close: function () {
      this.hideEditDialog();
      this.editedItem = Object.assign({}, this.defaultItem)
      this.editedIndex = -1
    }
  },

  computed: {
    showEditDialogFlag: {
      get: function () {
        return this.showEditDialog
      },
      set: function (val) {
        this.$emit('emitter-dialog', val)
      }
    },

    item: {
      get: function () {
        return this.selectedItem
      },
      set: function (val) {
        this.item(val)
      }
    },

    isDarkTheme() {
      return this.$vuetify.theme.dark === true;
    },
  },

}
</script>

<style lang="scss">

.properties-header {
  font-size: 20pt;
  text-align: center;
}

.dialog-table-data {
  padding-left: 10px;
  padding-right: 10px;
}

// Light Theme
.card-light {

  .dialog-table {
    background-color: #ebebeb;
  }

  .properties {
    background-color: #ebebeb;
  }
}

// Dark Theme
.card-dark {
  .dialog-table {
    background-color: #363636;
  }

  .card-color {
    background-color: #292929
  }

  .properties {
    background-color: #363636;
    color: whitesmoke;
  }
}

</style>
