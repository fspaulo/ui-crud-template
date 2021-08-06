                  <!--  NÃO UTILIZADO  -->
<template>
  <v-app dark>

    <v-app-bar
      v-if="isAuthenticated"
      :clipped-left="clipped"
      :clipped-right="true"
      fixed dense app
      :color="!isDarkTheme ? '#fafafa' : '' "
    >

      <div class="d-flex align-center" v-if="isAuthenticated">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>

        <v-btn icon @click.stop="clipped = !clipped">
          <v-icon>mdi-application</v-icon>
        </v-btn>
      </div>

      <div class="d-flex align-center">
        <v-img v-if="isAuthenticated" alt="Spark Name" class="ml-5 mb-1" contain min-width="100"
               :src="isDarkTheme ? '/assets/wms-logo-light.png'
                : '/assets/wms-logo-dark.png'" width="150"/>
      </div>

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
    </v-app>
</template>

<script>
import ChangeTheme from "~/layouts/widgets/ChangeTheme";
import HelpComponent from "~/components/help/HelpComponent";

export default {
  name: "AppBar",
  components:{
    ChangeTheme, HelpComponent,
  },

  props:{
    drawer: Boolean,
    clipped: Boolean,
    miniVariant: Boolean,
  },

  computed: {
    isAuthenticated() {
      return this.$store.getters.getLoggedIn;
    },

    isDarkTheme() {
      return this.$vuetify.theme.dark === true;
    },
  },

  methods: {
    logout() {
      this.$store.dispatch("loggedIn", false);
      this.$router.push("/");
    },
  },

}
</script>

<style scoped>
  #logo{
    margin-left: 5px;
    margin-bottom: 4px;
  }

</style>
