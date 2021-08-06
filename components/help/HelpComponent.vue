<template>

  <v-menu bottom
      transition="slide-x-reverse-transition">

    <template v-slot:activator="{ attrs, on }">
      <v-btn text small v-bind="attrs" v-on="on">
        <v-icon dark left>mdi-chevron-down</v-icon>
        <span>{{ $t("topBar.help") }}</span>
      </v-btn>
    </template>

    <v-list>
      <v-list-item dense>
        <v-list-item-content>
            <v-btn class="text-decoration-none" text small href="https://github.com/fspaulo/ui-crud-template" target="_blank">
              <v-icon small dark left>mdi-open-in-new</v-icon>
              <span class="body-2">{{ $t("topBar.helpOn") }}</span>
            </v-btn>
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-content>
          <AboutSystemComponent/>
        </v-list-item-content>
      </v-list-item>
    </v-list>

  </v-menu>
</template>

<script>
import AboutSystemDialog from "./AboutSystemDialog";

  export default {
    name: "HelpComponent",
    components:{
      AboutSystemComponent: AboutSystemDialog,
    },

    data() {
      return{
        showAboutSystem: false,

      }
    },
  }

</script>

<style scoped>

</style>
