<template>
  <div>
    <SimpleTable :title="$t('locationType')" :headers="headers" :data="storageLocationType" />

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

  props: {

  },

  data () {

    return {
      storageLocationType: [
        {
          name: 'Fixo',
          capacities: 'Capacidades',
          height: '0',
          width: '0',
          depth: '0',
          liftingCapacity: '',
          handlingType: '0',
          createUnitLoad: 'false',
          note: 'Tipo de localização para endereços fixos atribuídos. Esta é uma entidade utilizada pelo sistema. NÃO REMOVER OU BLOQUEÁ-LA! Alguns processos podem utilizá-la.',
          created: this.formatDate(new Date()), /* ----PARA FORMATAR UMA DATA---- */
          modified: this.formatMoment(), /* ----PARA CAPTURAR O MOMENTO FORMATADO---- */
          dbId: '2',
          dbVersion: '2'
        }
      ],
      headers: [
        { text: this.$t('name'), value: 'name', sortable: true, show: true, fixed: true },
        { text: this.$tc('capacity', 2), value: 'capacities', sortable: true, show: true, fixed: false },
        { text: this.$t('height'), value: 'height', sortable: true, show: true, fixed: false },
        { text: this.$t('width'), value: 'width', sortable: true, show: true, fixed: false },
        { text: this.$t('depth'), value: 'depth', sortable: true, show: true, fixed: false },
        { text: this.$t('liftingCapacity'), value: 'liftingCapacity', sortable: true, show: true, fixed: false },
        { text: this.$t('handlingType'), value: 'handlingType', sortable: true, show: true, fixed: false },
        { text: this.$t('createUnitLoad'), value: 'createUnitLoad', sortable: true, show: true, fixed: false },
        { text: this.$t('note'), value: 'note', sortable: true, show: false, fixed: false },
        { text: this.$t('created'), value: 'created', sortable: true, show: false, fixed: false },
        { text: this.$t('modified'), value: 'modified', sortable: true, show: false, fixed: false },
        { text: this.$t('dbId'), value: 'dbId', sortable: true, show: false, fixed: false },
        { text: this.$t('dbVersion'), value: 'dbVersion', sortable: true, show: false, fixed: false },
      ],

    }
  },

  created: function () {

  },

}
</script>
