<template>
  <div>
    <SimpleTable :title="$t('science')" :headers="headers" :data="coins"/>

  </div>
</template>

<script>
import SimpleTable from "~/components/table/SimpleTable";
import DateMixin from "~/mixins/DateMixin";
import axios from "axios";

export default {
  components: {
    SimpleTable,
  },

  mixins: [
    DateMixin
  ],

  data() {
    return {
      coins: [],
      headers: [
        {text: "Number", value: 'number', sortable: true, show: true, fixed: true},
      ],

    }
  },

  created: function (){ // called every time the page is loaded
    axios.get("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL")
      .then(res => {
        // this.coins = res.data.results
        console.log(res.data)
      })
  },

}
</script>
