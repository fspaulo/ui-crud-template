<template>
  <div>
    <SimpleTable :title="$tc('beer',2)" :headers="headers" :data="datas" />
  </div>
</template>

<script>
import axios from "axios";
import SimpleTable from "~/components/table/SimpleTable";

export default {
  data () {
    return {
      datas: [],
      headers: [
        { text: this.$t('name'), value: 'name', sortable: true, show: true, fixed: true},
        { text: this.$t('slogan'), width: '250px', value: 'tagline', sortable: true, show: true, fixed: false },
        { text: this.$t('firstBrewed'), width: '135px', value: 'first_brewed', sortable: false, show: true, fixed: false }, // fabricado em
        { text: this.$t('ibu'), width: '80px', value: 'ibu', sortable: true, show: true, isQuickSearch: true, fixed: false },
        { text: this.$t('attenuation'), value: 'attenuation_level', sortable: true, show: true, fixed: false },
        { text: this.$t('abv'), width: '80px', value: 'abv', sortable: true, show: true, fixed: false },
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

  components:{
    SimpleTable
  }

}
</script>

