<template>
  <div>
    <SimpleTable :title="$tc('devices.device', 2)" :headers="headers" :data="devices"/>

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
      devices: [
      {
        name: 'ARMPAULO',
        client: 'System',
        description: 'ARMPAULO',
        serial: '0',
        type: 'ARM',
        appVersion: '4057002',
        macAddress: '00:00:00:00:00:00',
        operator: 'paulo',
        printer: 'IMP01SPK',
        ip: '192.168.0.114',
        currentTask: 'Login',
        additionalContent: '',
        created: this.formatDate(new Date()), /* ----PARA FORMATAR UMA DATA---- */
        modified: this.formatMoment(), /* ----PARA CAPTURAR O MOMENTO FORMATADO---- */
        dbId: '1',
        dbVersion: '123456'
      },
      {
        name: 'ARMRODRIGO',
        client: 'System',
        description: 'ARMRODRIGO',
        serial: '1',
        type: 'ARM',
        appVersion: '4057002',
        macAddress: '00:00:00:00:00:00',
        operator: 'rmmspark',
        printer: 'IMP01SPK',
        ip: '192.168.0.114',
        currentTask: 'Login',
        additionalContent: '',
        created: this.formatDate(new Date()), /* ----PARA FORMATAR UMA DATA---- */
        modified: this.formatMoment(), /* ----PARA CAPTURAR O MOMENTO FORMATADO---- */
        dbId: '2',
        dbVersion: '654321'
      }],
      headers: [
        { text: this.$t('name'), value: 'name', sortable: true, show: true, fixed: true },
        { text: this.$tc('client', 1), value: 'client', sortable: true, show: true, fixed: false },
        { text: this.$t('description'), value: 'description', sortable: true, show: true, fixed: false },
        { text: this.$t('serial'), value: 'serial', sortable: true, show: true, fixed: false},
        { text: this.$t('type'), value: 'type', sortable: true, show: true, fixed: false },
        { text: this.$t('appVersion'), value: 'appVersion', sortable: false, show: true, fixed: false},
        { text: this.$t('macAddress'), value: 'macAddress', sortable: false, show: true, fixed: false},
        { text: this.$t('operator'), value: 'operator', sortable: true, show: true, fixed: false },
        { text: this.$t('printer'), value: 'printer', sortable: true, show: false, fixed: false },
        { text: this.$t('ip'), value: 'ip', sortable: false, show: true, fixed: false},
        { text: this.$t('currentTask'), value: 'currentTask', sortable: false, show: false, fixed: false },
        { text: this.$t('additionalContent'), value: 'additionalContent', sortable: false, show: false, fixed: false },
        { text: this.$t('created'), value: 'created', sortable: true, show: false, fixed: false },
        { text: this.$t('modified'), value: 'modified', sortable: true, show: false, fixed: false },
        { text: this.$t('dbId'), value: 'dbId', sortable: false, show: false, fixed: false },
        { text: this.$t('dbVersion'), value: 'dbVersion', sortable: false, show: false, fixed: false },
      ],

    }
  },

}
</script>
