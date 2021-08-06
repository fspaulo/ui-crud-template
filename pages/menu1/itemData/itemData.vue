<template>
  <div>
    <SimpleTable :title="$tc('itemData', 2)" :headers="headers" :data="itemData" />

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
      itemData: [
      {
        number: '1000481',
        client: 'System',
        name: 'PAPEL TERMICO PARA CONVERSAO EM BOBINA',
        description: 'PAPEL TERMICO PARA CONVERSAO EM BOBINA',
        tradeGroup: '',
        code: '',
        defaultUnitLoadType: 'Pallet PBR',
        zone: 'A',
        serialRecord: '',
        adviceMandatory: 'true',
        safetyStock: '0',
        lotMandatory: 'false',
        shelfLife: '0',
        handlingUnit: 'MT',
        scale: '2',
        height: '0',
        width: '0',
        depth: '0',
        weight: '0,004',
        stocks: '',
        itemDataExtension: '',
        lock: 'Não Bloqueado (0)',
        receivedMoreThenAdvised: 'true',
        additionalContent: '',
        created: this.formatDate(new Date()), /* ----PARA FORMATAR UMA DATA---- */
        modified: this.formatMoment(), /* ----PARA CAPTURAR O MOMENTO FORMATADO---- */
        dbId: '2',
        dbVersion: '654321'
      }
      ],
      headers: [
        { text: this.$t('number'), value: 'number', sortable: true, show: true, fixed: true },
        { text: this.$tc('client', 1), value: 'client', sortable: true, show: true, fixed: false },
        { text: this.$t('name'), value: 'name', sortable: true, show: true, fixed: false },
        { text: this.$t('description'), value: 'description', sortable: true, show: true, fixed: false },
        { text: this.$t('tradeGroup'), value: 'tradeGroup', sortable: true, show: false, fixed: false },
        { text: this.$tc('code', 2), value: 'code', sortable: false, show: true, fixed: false },
        { text: this.$t('defaultUnitLoadType'), value: 'defaultUnitLoadType', show: false, fixed: false },
        { text: this.$t('zone'), value: 'zone', sortable: false, show: true, fixed: false },
        { text: this.$t('serialRecord'), value: 'serialRecord', sortable: false, show: false, fixed: false },
        { text: this.$t('adviceMandatory'), value: 'adviceMandatory', sortable: false, show: false, fixed: false },
        { text: this.$t('safetyStock'), value: 'safetyStock', sortable: false, show: false, fixed: false },
        { text: this.$t('lotMandatory'), value: 'lotMandatory', sortable: false, show: false, fixed: false },
        { text: this.$t('shelfLife'), value: 'shelfLife', sortable: false, show: false, fixed: false },
        { text: this.$t('handlingUnit'), value: 'handlingUnit', sortable: false, show: false, fixed: false },
        { text: this.$t('scale'), value: 'scale', sortable: false, show: false, fixed: false},
        { text: this.$t('height'), value: 'height', sortable: true, show: false, fixed: false },
        { text: this.$t('width'), value: 'width', sortable: true, show: false, fixed: false },
        { text: this.$t('depth'), value: 'depth', sortable: true, show: false, fixed: false },
        { text: this.$t('weight'), value: 'weight', sortable: true, show: false, fixed: false },
        { text: this.$t('stocks'), value: 'stocks', sortable: false, show: false, fixed: false },
        { text: this.$t('itemDataExtension'), value: 'itemDataExtension', sortable: false, show: false, fixed: false},
        { text: this.$t('lock'), value: 'lock', sortable: true, show: true, fixed: false },
        { text: this.$t('receivedMoreThenAdvised'), value: 'receivedMoreThenAdvised', sortable: false, show: false, fixed: false },
        { text: this.$t('additionalContent'), value: 'additionalContent', sortable: false, show: false, fixed: false },
        { text: this.$t('created'), value: 'created', sortable: true, show: false, fixed: false },
        { text: this.$t('modified'), value: 'modified', sortable: true, show: false, fixed: false},
        { text: this.$t('dbId'), value: 'dbId', sortable: true, show: false, fixed: false},
        { text: this.$t('dbVersion'), value: 'dbVersion', sortable: false, show: false, fixed: false},
      ],

    }
  },

  created: function (){

  },

}
</script>
