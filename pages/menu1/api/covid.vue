<template>
  <div>
    <SimpleTable :title="$t('covid.covid')" :headers="headers" :data="datas" />

  </div>
</template>

<script>
import SimpleTable from "~/components/table/SimpleTable";
import axios from "axios";
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
      datas: [],
      headers: [
        { text: this.$t('covid.state'), value: 'state', sortable: true, show: true, fixed: true },
        { text: 'uid', value: 'uid', sortable: false, show: false, fixed: false },
        { text: 'UF', width: '70px', value: 'uf', sortable: true, show: true, fixed: false },
        { text: this.$t('covid.cases'), value: 'cases', sortable: true, show: true, fixed: false },
        { text: this.$t('covid.deaths'), value: 'deaths', sortable: true, show: true, fixed: false },
        { text: this.$t('covid.suspects'), value: 'suspects', sortable: true, show: true, fixed: false },
        { text: this.$t('covid.refuses'), value: 'refuses', sortable: true, show: true, fixed: false },
        { text: this.$t('covid.datetime'), width: '170px', value: 'datetime', sortable: false, show: true, fixed: false },
      ],
    }
  },

  created: function (){ // chamado toda vez q a page é carregada
    axios.get("https://covid19-brazil-api.vercel.app/api/report/v1") //api teste
      .then(res => {
        this.datas = res.data.data
        this.datas.forEach(d => { // ajuste para formatar a data
          d.datetime = Date.parse(d.datetime)
          d.datetime = this.formatDate(new Date(d.datetime))
        })
      })

  },

}
</script>

