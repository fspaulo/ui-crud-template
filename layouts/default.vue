<template>
  <v-app dark>
    <!--  Menu  -->
    <Drawer :clipped="clipped" :drawer="drawer"/>

    <v-app-bar
      v-if="isAuthenticated"
      :clipped-left="clipped"
      :clipped-right="false"
      fixed dense app dark
      color="primary"
    >

      <div class="d-flex align-center" v-if="isAuthenticated">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>

        <v-btn icon @click.stop="clipped = !clipped">
          <v-icon>mdi-application</v-icon>
        </v-btn>
      </div>

<!--      <span>Vuetify</span>
      <div class="d-flex align-center">
        <v-img v-if="isAuthenticated" alt="logo" class="mb-1" contain
               src="/logos/vuetify.png" width="" height="40"/>
      </div>-->

      <v-spacer/>

      <div v-if="isAuthenticated" class="pa-2 mr-2">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon block @click="logout()" v-bind="attrs" v-on="on">
              <v-icon>mdi-logout-variant</v-icon>
            </v-btn>
          </template>
          <span>{{ $t("topBar.btnLogout") }}</span>
        </v-tooltip>
      </div>

      <TranslateComponent v-if="isAuthenticated"/>

      <ChangeTheme v-if="isAuthenticated"/>

      <HelpComponent/>
    </v-app-bar>
    <v-main>
      <nuxt/>
    </v-main>

  </v-app>
</template>

<script>
import Drawer from "~/layouts/Drawer";
import HelpComponent from "~/components/help/HelpComponent";
import ChangeTheme from "~/layouts/widgets/ChangeTheme";
import TranslateComponent from "~/components/utils/TranslateComponent";
import { mapGetters } from 'vuex'

export default {
  components: {
    Drawer, HelpComponent, ChangeTheme, TranslateComponent
  },

  data() {
    return {
      clipped: true, // barra superior sobrepor menu
      drawer: true, // menu inicia ativado

      title: 'myWMS',
    }
  },

  methods: {
    logout() {
      this.$store.dispatch("loggedIn", false);
      this.$router.push("/login");
    },

    validate() {
      console.log('Auth: ' + this.isAuthenticated)
      if (this.isAuthenticated)
        return true;
      else
        this.logout();
    },
  },

  computed: {
    ...mapGetters(['isAuthenticated']),

    isDarkTheme() {
      return this.$vuetify.theme.dark === true;
    },
  },

  middleware: 'authentication',

  watch: {},
  mounted() {
    this.validate();
  },

}
</script>

<style>
html, body{
  overflow-y: hidden;
}
</style>
