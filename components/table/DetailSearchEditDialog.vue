<template>
  <v-row>
    <v-col cols="auto">
      <v-dialog v-model="showDialog" persistent transition="scale-transition" :max-width="size">
        <template v-slot:default="dialog">
          <v-card class="elevation-1">
            <v-toolbar color="primary" dark dense>{{ $t('detailSearch.newQuery') }}</v-toolbar>

            <v-toolbar class="" height="35%" flat>
              <v-btn text small>
                <v-icon>mdi-magnify-plus-outline</v-icon>
                <span>{{ $t('detailSearch.apply') }}</span>
              </v-btn>

              <v-btn text small>
                <v-icon>mdi-content-save-outline</v-icon>
                <span>{{ $t('save') }}</span>
              </v-btn>
            </v-toolbar>

            <v-card-text class="pa-0">
              <v-col cols="12">
                <v-text-field :label="$t('name')" :placeholder="$t('detailSearch.newQuery')"
                              hide-details
                              required
                              outlined
                              dense />
              </v-col>

              <v-col cols="12">
                <v-autocomplete
                  :items="[$t('detailSearch.andTerm'), $t('detailSearch.orTerm')]"
                  :label="$t('detailSearch.condition')"
                  dense outlined
                  hide-details
                  auto-select-first />
              </v-col>
            </v-card-text>

            <v-divider/>

            <v-container>
              <v-row v-for="(item, index) in lista" :key="item">
                <v-col md="1" class="mr-5 ml-1">
                  <v-btn small class="mt-1" v-on:click="removeNewItem(index)">
                    <!-- TODO decrementa o count-->
                    <v-icon>mdi-minus</v-icon>
                  </v-btn>
                </v-col>

                <v-col sm="3" md="3">
                  <v-autocomplete :items="tableHeaders"
                                  item-text="text"
                                  v-model="selectedHeader"
                                  :placeholder="$t('columns')"
                                  :onchange="columHeaders"
                                  hide-details
                                  outlined
                                  dense/>
                </v-col>

                <v-col md="3" v-if="isSelected">
                  <!-- TODO aqui deve ser adicionado um v-autocomplete de condições referents ao tipo de dado da coluna escolhida (igual ClientWEB) -->
                  <v-autocomplete :items="conditions"
                                  item-text="name"
                                  v-model="selectedCondition"
                                  hide-details
                                  outlined
                                  dense />
                </v-col>

                <v-col md="4" v-if="isSelected">
                  <!-- TODO aqui deve ser adicionado um campo referente ao tipo do dado (text ou date) para o usuário informar a condição -->
                  <v-text-field :type="typeField" outlined dense/>
                </v-col>

              </v-row>
            </v-container>

            <v-card-actions>
              <v-btn small v-on:click="addNewItem">
                <!-- TODO ao clicar deve duplicar componentes a cima "utilizar um count"-->
                <v-icon small>mdi-plus</v-icon>
                <span>{{ $t('detailSearch.addToken') }}</span>
              </v-btn>

              <v-spacer/>

              <v-btn small @click.stop="showDialog=false">{{ $t('close') }}</v-btn>
            </v-card-actions>
          </v-card>
        </template>

      </v-dialog>
    </v-col>

  </v-row>
</template>

<script>
import {mapGetters} from "vuex";

export default {

  props: {
    value: Boolean,
  },

  data() {
    return{
      tableHeaders: [], // Pega os cabecalhos para setar em colunas vindo do store.
      tableData: [], // Pega os itens das tabelas vindo do store.
      conditions: [], // Condições para pesquisa

      selectedHeader: "", // devolve o header selecionado
      selectedCondition: "", // Pega a condição selecionada
      typeField: "", // tipo do campo para input
      size: "35%", // tamanho do menu que abre
      isSelected: false, // Mostra ou nao os v-autocomplete

      //teste
      lista: [0],
      num: 1
    };
  },

  methods: {
    ...mapGetters("toolbar", ["getHeadersTable", "getDataTable"]),

    map(header){
      const tipo = this.tableData.map(el => typeof el[header.value]);
      return tipo[0];
    },

    changeFields(typeColum){
      if(typeColum === "number"){
        this.typeField = "number";
      } else if (typeColum === "string"){
        this.typeField = "text";
      }
    },

    changeCondition(typeHeader){
      if (typeHeader === "number" || typeHeader === "string"){
        this.isSelected = true;
        this.changeFields(typeHeader);
        this.conditions =
          [ // TODO tradução
            { name: 'É semelhante', id: 1 },
            { name: 'É igual', id: 2 },
            { name: 'Não é igual', id: 3 },
            { name: 'É nulo', id: 4 },
            { name: 'Não é nulo', id: 5 },
          ]
      }
    },

    addNewItem: function(){
      this.lista.push(this.num);
      this.num++;
    },

    removeNewItem: function (id) {
      const index = this.lista.indexOf(id);
      this.lista.splice(index, 1);
      this.num--;
    }

  },

  watch: {
    selectedHeader(header) {
      let catchHeader = this.map(header)
      this.changeCondition(catchHeader);
    },

    isSelected(){
      this.size = "45%";
    },


  },

  computed: {
    //querySelected: '', // pega uma das consultas ja cadastradas

    showDialog: {
      get () {
        this.isSelected = false;
        this.selectedHeader = [];
        this.selectedCondition = [];
        this.size = "35%"
        return this.value;
      },
      set (value) {
        this.$emit('input', value)
      }
    },

    columHeaders() {
      this.tableHeaders = [];
      this.tableHeaders = this.getHeadersTable();

      this.tableData = [];
      this.tableData = this.getDataTable();
    },
  },
}
</script>

<style scoped>

</style>
