<template>
  <div>
    <SimpleTable :title="$tc('pokemon', 2)" :headers="headers" :data="pokemons" />
  </div>
</template>

<script>
import axios from "axios";
import SimpleTable from "~/components/table/SimpleTable";

export default {
  components:{
    SimpleTable,
  },

  data () {
    return {
      pokemons: [],
      headers: [
        { text: this.$t('name'), value: 'name', sortable: true, show: true, fixed: true},
        { text: this.$t('URL'), value: 'url', sortable: true, show: true, fixed: false },
      ],

    }
  },

  created: function (){ // called every time the page is loaded
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=150&offset=0") // test api
      .then(res => {
        this.pokemons = res.data.results
      })
  },
}
</script>

