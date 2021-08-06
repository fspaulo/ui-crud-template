<template>
  <div>
    <SimpleTable :title="$t('devices.printer')" :headers="headers" :data="printers" />

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
      selected: [],
      printers: [
        {
          name: 'IMP01SPK',
          client: 'System',
          barCode: 'IMP01SPK',
          port: '9100',
          connectionType: 'Network',
          macAddress: 'EC-08-6B-C2-7E-3F',
          ip: '192.168.0.001',
          inputMode: 'ZPL',
          additionalContent: '',
          created: this.formatDate(new Date()), /* ----PARA FORMATAR UMA DATA---- */
          modified: this.formatMoment(), /* ----PARA CAPTURAR O MOMENTO FORMATADO---- */
          dbId: '2',
          dbVersion: '654321'
        }
      ],
      headers: [
        { text: this.$t('name'), value: 'name', sortable: true, show: true, fixed: true },
        { text: this.$tc('client', 2), value: 'client', sortable: true, show: true, fixed: false },
        { text: this.$t('barCode'), value: 'barCode', sortable: true, show: true, fixed: false },
        { text: this.$t('port'), value: 'port', sortable: false, show: true, fixed: false },
        { text: this.$t('connectionType'), value: 'connectionType', sortable: true, show: true, fixed: false },
        { text: this.$t('macAddress'), value: 'macAddress', sortable: false, show: true, fixed: false },
        { text: this.$t('ip'), value: 'ip', sortable: false, show: true, fixed: false },
        { text: this.$t('inputMode'), value: 'inputMode', sortable: false, show: true, fixed: false },
        { text: this.$t('additionalContent'), value: 'additionalContent', sortable: false, show: false, fixed: false },
        { text: this.$t('created'), value: 'created', sortable: true, show: false, fixed: false },
        { text: this.$t('modified'), value: 'modified', sortable: true, show: false, fixed: false },
        { text: this.$t('dbId'), value: 'dbId', sortable: false, show: false, fixed: false },
        { text: this.$t('dbVersion'), value: 'dbVersion', sortable: false, show: false, fixed: false },
      ],

    }
  },

  created: function (){

  },

}
</script>
