<template>
  <div>
    <SimpleTable :title="$tc('location', 2)" :headers="headers" :data="storageLocations" />

  </div>
</template>

<script>
import SimpleTable from "~/components/table/SimpleTable";
import DateMixin from "~/mixins/DateMixin";

export default {
  components:{
    SimpleTable,
  },

  mixins:[
    DateMixin

  ],

  data () {
    return {
      storageLocations: [
        {
          name: 'A01-01-01-03',
          client: 'System',
          barCode: 'A01-01-01-03',
          locationType: 'Default',
          area: 'Pulmão',
          locationCluster: 'Pulmão',
          zone: 'A',
          rack: '01',
          x: '1',
          y: '3',
          z: '1',
          field: '',
          fieldIndex: '1032',
          orderIndex: '1002',
          allocation: '0',
          capacity: 'Pallet PBR - Default',
          unitLoads: 'Unitizadores',
          stocks: 'Unidade de Estoques',
          lastStocktaking: '10/fev/2019 15:07:35',
          lock: 'Não Bloqueado (0)',
          created: this.formatDate(new Date()), /* ----PARA FORMATAR UMA DATA---- */
          modified: this.formatMoment(), /* ----PARA CAPTURAR O MOMENTO FORMATADO---- */
          dbId: '512',
          dbVersion: '08'
        }
      ],
      headers: [
        { text: this.$t('name'), value: 'name', sortable: true, show: true, fixed: true },
        { text: this.$tc('client', 1), value: 'client', sortable: true, show: true, fixed: false },
        { text: this.$t('barCode'), value: 'barCode', sortable: true, show: true, fixed: false  },
        { text: this.$t('locationType'), value: 'locationType', sortable: true, show: true, fixed: false },
        { text: this.$t('area'), value: 'area', sortable: true, show: true, fixed: false  },
        { text: this.$t('locationCluster'), value: 'locationCluster', sortable: true, show: true, fixed: false },
        { text: this.$t('zone'), value: 'zone', sortable: true, show: true, fixed: false },
        { text: this.$t('rack'), value: 'rack', sortable: true, show: true, fixed: false },
        { text: this.$t('x'), value: 'x', sortable: true, show: false, fixed: false },
        { text: this.$t('y'), value: 'y', sortable: true, show: false, fixed: false},
        { text: this.$t('z'), value: 'z', sortable: true, show: false, fixed: false},
        { text: this.$t('field'), value: 'field', sortable: true, show: true, fixed: false },
        { text: this.$t('fieldIndex'), value: 'fieldIndex', sortable: true, show: true, fixed: false},
        { text: this.$t('orderIndex'), value: 'orderIndex', sortable: true, show: true, fixed: false },
        { text: this.$t('allocation'), value: 'allocation', sortable: true, show: true, fixed: false },
        { text: this.$tc('capacity', 1), value: 'capacity', sortable: true, show: true, fixed: false },
        { text: this.$t('unitLoads'), value: 'unitLoads', sortable: true, show: true, fixed: false },
        { text: this.$t('stocks'), value: 'stocks', sortable: true, show: true, fixed: false },
        { text: this.$t('lastStocktaking'), value: 'lastStocktaking', sortable: true, show: true, fixed: false },
        { text: this.$t('lock'), value: 'lock', sortable: true, show: false, fixed: false },
        { text: this.$t('created'), value: 'created', sortable: true, show: false, fixed: false },
        { text: this.$t('modified'), value: 'modified', sortable: true, show: false, fixed: false },
        { text: this.$t('dbId'), value: 'dbId', sortable: true, show: false, fixed: false },
        { text: this.$t('dbVersion'), value: 'dbVersion', sortable: true, show: false, fixed: false },
      ],

    }
  },

  created: function (){

  },

}
</script>
