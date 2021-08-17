<template>
  <div>
    <teste :title="$tc('devices.device', 2)" :headers="headers" :data="devices"/>

  </div>
</template>

<script>
import SimpleTable from "~/components/table/SimpleTable";
import teste from "~/components/teste"
import DateMixin from "~/mixins/DateMixin";

export default {
  components: {
    SimpleTable,
    teste,
  },

  mixins: [
    DateMixin
  ],

  data() {
    return {
      devices: [
        {
          name: 'Lumia 520',
          brand: "Nokia",
          description: 'Cell with Windows phone',
          type: 'Smartphone',
          additionalContent: '',
          created: this.formatDate(new Date()), /* ----PARA FORMATAR UMA DATA---- */
          modified: this.formatMoment(), /* ----PARA CAPTURAR O MOMENTO FORMATADO---- */
          id: '2',
        },
        {
          name: 'Poco X3 NFC',
          brand: "Xiaomi",
          description: 'Cell with android 11',
          type: 'Smartphone',
          additionalContent: '',
          created: this.formatDate(new Date()),
          modified: this.formatMoment(),
          id: '2',
        }
      ],
      headers: [
        {text: this.$t('name'), value: 'name', sortable: true, show: true, fixed: true},
        {text: this.$t('brand'), value: 'brand', sortable: true, show: true, fixed: false},
        {text: this.$t('description'), value: 'description', sortable: true, show: true, fixed: false},
        {text: this.$t('type'), value: 'type', sortable: true, show: true, fixed: false},
        {text: this.$t('additionalContent'), value: 'additionalContent', sortable: false, show: false, fixed: false},
        {text: this.$t('created'), value: 'created', sortable: true, show: false, fixed: false},
        {text: this.$t('modified'), value: 'modified', sortable: true, show: false, fixed: false},
        {text: this.$t('id'), value: 'dbId', sortable: false, show: false, fixed: false},
      ],

    }
  },

}
</script>
