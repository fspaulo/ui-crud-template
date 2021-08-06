<template>
  <div
    :class="!this.$vuetify.theme.dark ? 'btn-group-light py-1' : 'btn-group-dark py-1'"
  >
    <v-btn
      v-for="btn in defaultBtns" :key="btn.name"
      small
      class="mx-1 elevation-1"
      @click="$emit('actionClick',btn)"
    >
      <v-icon>{{ btn.icon }}</v-icon>
    </v-btn>

    <v-divider class="mx-1" vertical></v-divider>

    <v-btn
      v-for="btn in actionBtns" :key="btn.name"
      small
      class="mx-1 elevation-1"
      @click="$emit('actionClick',btn)"
    >
      <v-icon>{{ btn.icon }}</v-icon>
    </v-btn>

    <div class="registers">{{ $t('registers') }}: {{ numberOfRecords }}</div>
  </div>
</template>

<script>

export default {

  props: {
    registers: Number,
    enableDefaultButtons: true, // prop to enable CRUD buttons
    enableActionButtons: true, // prop to enable action buttons

    editItem: Function,
    createItem: Function,
  },

  data() {
    return {
      defaultBtns: [
        {
          name: 'create',
          icon: 'mdi-plus',
          action: 'createProperty'
        },
        {
          name: 'edit',
          icon: 'mdi-pencil',
          action: 'editProperty'
        },
        {
          name: 'delete',
          icon: 'mdi-minus',
          action: 'deleteProperty'
        }],

      actionBtns: [
        {
          name: 'play',
          icon: 'mdi-play',
          action: ''
        },
        {
          name: 'printer',
          icon: 'mdi-printer',
          action: ''
        },
      ],

      visible: false,
    }
  },

  computed: {
    numberOfRecords() {
      return this.registers;
    },
  },

  methods: {
    actionClick: function () {
    },

    createProperty: function () {
      this.createProperty();
    },

    /* deleteProperty: function (btn, selectedItem) {
       let req = confirm("Deseja realmente excluir '" + selectedItem.name + "'?");
       if (req === true) {
         alert("'" + selectedItem.name + "' cancelado!");
         // API para deletar o registro
         console.log("Function " + btn.action + " - Record: " + selectedItem.name);
         console.log(this);
       }
     },*/

    editProperty: function (btn, selectedItem) {
      console.log("Function " + btn.action + " - Record: " + selectedItem.name);
    },

  },

}
</script>

<style scoped>

.registers {
  align-content: center;
  padding-top: 5px;
  float: right;
  padding-right: 20px;
  font-size: 80%;
}

.btn-group-dark {
  background-color: #363636;
  border: 1px solid #414141;
}

.btn-group-light {
  background-color: #fafafa;
  border: 1px solid #f1f1f1;
}

</style>
