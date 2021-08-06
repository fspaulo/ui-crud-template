<template>
  <v-row>
    <v-col cols="5">
      <v-autocomplete
        :label="$t('toolbarTable.savedQueries')"
        append-icon="mdi-magnify-plus-outline"
        hide-details
        dense
        outlined
      ></v-autocomplete>
    </v-col>

    <v-col cols="4" class="ml-4 mt-1">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn small outlined
                 color="primary"
                 v-bind="attrs"
                 v-on="on" @click.stop="showEditDialog=true">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <span>{{ $t('toolbarTable.newQuery') }}</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn small outlined
                 color="primary"
                 v-bind="attrs"
                 v-on="on">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </template>
        <span>{{ $t('toolbarTable.editQuery') }}</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn small outlined
                 color="primary"
                 v-bind="attrs"
                 v-on="on">
            <v-icon>mdi-minus</v-icon>
          </v-btn>
        </template>
        <span>{{ $t('toolbarTable.deleteQuery') }}</span>
      </v-tooltip>

    </v-col>

    <DetailSearchEditDialog v-model="showEditDialog"/>

  </v-row>
</template>

<script>
import DetailSearchEditDialog from "~/components/table/DetailSearchEditDialog";

export default {
  components:{
    DetailSearchEditDialog
  },

  data(){
    return{
      showEditDialog: false,
    }
  },

  computed:{

  },
}
</script>

<style scoped>

</style>
