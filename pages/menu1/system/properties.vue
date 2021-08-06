<template>
  <div>
    <SimpleTable :title="$t('properties')" :headers="headers" :data="datas" />
  </div>
</template>

<script>
import axios from "axios";

export default {
  data () {
    return {
      datas: [],
      headers: [
        { text: this.$t('name'), value: 'name', sortable: true, show: true, fixed: true},
        { text: 'Slogan', width: '250px', value: 'tagline', sortable: true, show: true, fixed: false },
        { text: 'Fabricado em', width: '135px', value: 'first_brewed', sortable: false, show: true, fixed: false },
        { text: 'IBU', width: '80px', value: 'ibu', sortable: true, show: true, isQuickSearch: true, fixed: false },
        { text: 'Nível de Atenuação', value: 'attenuation_level', sortable: true, show: true, fixed: false },
        { text: 'ABV', width: '80px', value: 'abv', sortable: true, show: true, fixed: false },
        { text: this.$t('description'), value: 'description', sortable: true, show: false, fixed: false },
      ],

    }
  },

  created:function (){
    axios.get('https://api.punkapi.com/v2/beers/')
      .then(res => {
        this.datas = res.data;
      })
  },

}
</script>

