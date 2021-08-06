<template>
  <div>
    <SimpleTable :title="$t('code')" :headers="headers" :data="itemDataCodes" />

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
      itemDataCodes: [
        {
          itemData: '1000481',
          itemName: 'PAPEL TERMICO PARA CONVERSAO EM BOBINA',
          number: '1000481',
          manufacturer: '',
          index: '0',
          additionalContent: '',
          created: this.formatDate(new Date()), /* ----PARA FORMATAR UMA DATA---- */
          modified: this.formatMoment(), /* ----PARA CAPTURAR O MOMENTO FORMATADO---- */
          dbId: '2',
          dbVersion: '654321'
        }
      ],
      headers: [
        { text: this.$tc('itemData', 1), value: 'itemData', sortable: true, show: true, fixed: true },
        { text: this.$t('itemName'), value: 'itemName', sortable: true, show: true, fixed: false },
        { text: this.$t('number'), value: 'number', sortable: true, show: true, fixed: false },
        { text: this.$t('manufacturer'), value: 'manufacturer', sortable: true, show: true, fixed: false},
        { text: this.$t('index'), value: 'index', sortable: true, show: true, fixed: false },
        { text: this.$t('additionalContent'), value: 'additionalContent', sortable: false, show: false, fixed: false },
        { text: this.$t('created'), value: 'created', sortable: true, show: false, fixed: false },
        { text: this.$t('modified'), value: 'modified', sortable: true, show: false, fixed: false },
        { text: this.$t('dbId'), value: 'dbId', sortable: true, show: false, fixed: false },
        { text: this.$t('dbVersion'), value: 'dbVersion', sortable: true, show: false, fixed: false },
      ],

    }
  },

}
</script>
