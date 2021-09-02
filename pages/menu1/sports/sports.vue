<template>
  <div>
    <SimpleTable :title="$tc('sports',2)" :headers="headers" :data="sports" />

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

  props: {

  },

  data () {

    return {
      sports: [
        {
          name: 'Football',
          hour: this.formatDate(new Date()), /* ----To format an date---- */
          id: '1',
        },
        {
          name: 'Basketball',
          hour: this.formatDate(new Date()),
          id: '2',
        }
      ],
      headers: [
        { text: "Name", value: 'name', sortable: true, show: true, fixed: true },
        { text: "Hour", value: 'hour', sortable: true, show: true, fixed: false },
        { text: "Id", value: 'id', sortable: true, show: false, fixed: false },
      ],

    }
  },

  created: function () {

  },

}
</script>
