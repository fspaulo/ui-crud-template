<template>
  <div>
    <SimpleTable :title="$t('consoles')" :headers="headers" :data="datas" />

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
      datas: [
        {name: 'Xbox', brand: 'Microsoft', model:'Series X'},
        {name: 'Xbox', brand: 'Microsoft', model:'Series S'},
        {name: 'Playstation', brand: 'Sony', model:'5'},
      ],

      headers: [
        { text: this.$t('name'), value: 'name', sortable: true, show: true, fixed: true },
        { text: this.$t('brand'), value: 'brand', sortable: true, show: true, fixed: false },
        { text: this.$t('model'), value: 'model', sortable: true, show: true, fixed: true },
      ],

    }
  },

  created: function (){

  },

}
</script>
