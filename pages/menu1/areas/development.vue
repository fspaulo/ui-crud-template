<template>
  <div>
    <SimpleTable :title="$t('development')" :headers="headers" :data="datas"/>
  </div>
</template>

<script>
import SimpleTable from "~/components/table/SimpleTable";
import DateMixin from "~/mixins/DateMixin";

export default {
  components: {
    SimpleTable,
  },

  mixins: [
    DateMixin

  ],

  data() {
    return {
      datas: [
        {language: 'Java', ide: 'IntelliJ'},
        {language: 'Javascript', ide: 'WebStorm'},
        {language: 'C++', ide: 'Dev C++'},
      ],
      headers: [
        {text: "Language", value: 'language', sortable: true, show: true, fixed: true},
        {text: "IDE", value: 'ide', sortable: true, show: true, fixed: false},

      ],

    }
  },

}
</script>
