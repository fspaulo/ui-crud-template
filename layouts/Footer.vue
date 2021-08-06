<template>
  <div>
    <v-footer fixed
              app
              :color="!isAuthenticated ? 'transparent' : ''"
              padless
              class="justify-center">
      <v-container>
        <v-row>
          <v-col v-if="!isAuthenticated"
            v-for="(link, i) in links"
            :key="i"
            class="text-center"
            cols="6"
            md="auto"
          >
            <a :href="link.href"
               class="text-decoration-none text-uppercase subtitle-2 font-weight-regular"
               rel="noopener"
               target="_blank"
               v-text="link.text"
            ></a>
          </v-col>

          <v-spacer class="hidden-sm-and-down" />
          <v-col cols="9" :md="!isAuthenticated ? 'auto' : 'none'">
            <div class="body-1 font-weight-light pt-md-0 text-center">
              &copy; {{ (new Date()).getFullYear() }}, Copyright <v-icon>mdi-vuetify</v-icon>
              <span class="text-decoration-none">Vuetify</span>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </div>

</template>

<script>

export default {
  name: "Footer",

  computed: {
    isAuthenticated() {
      return this.$store.getters.getLoggedIn;
    },
  },

  data() {
    return{
      links: [
        {
          href: '#',
          text: 'Docs',
        },
        {
          href: '#',
          text: this.$t('footer.about'),
        },
      ]
    }
}

}
</script>

<style lang="scss">
a{
  color: inherit !important
}
</style>

