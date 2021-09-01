<template>
  <div>
    <SimpleTable :title="$t('e_sports')" :headers="headers" :data="data" />

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
      data: [
        {team: 'KGB', game: 'Call Of Duty', platform: 'PC', wins: 2, losses: 1}
      ],
      headers: [
        { text: this.$t('team'), value: 'team', sortable: true, show: true, fixed: true },
        { text: this.$t('game'), value: 'game', sortable: true, show: true, fixed: false },
        { text: this.$t('platform'), value: 'platform', sortable: true, show: true, fixed: false },
        { text: this.$t('wins'), value: 'wins', sortable: true, show: true, fixed: false },
        { text: this.$t('losses'), value: 'losses', sortable: true, show: true, fixed: false },

      ],

    }
  },

  created: function (){

  },

}
</script>
