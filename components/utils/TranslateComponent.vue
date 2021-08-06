<template>
  <div class="text-center">
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on" style="margin-right: 5px">
          <v-icon>mdi-translate</v-icon>
        </v-btn>
      </template>
      <template>
        <v-card class="mx-auto" max-width="300" tile>
          <v-list dense>
            <v-list-item-group>
              <v-list-item v-for="item in languages" :key="item.id" @click="changeLanguage(item.id)">
                <img :src="item.icon" alt="" width="20"/>
                <v-list-item-content>
                  <v-list-item-title class="ml-3" v-text="item.text"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </template>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: "TranslateComponent",
  data() {
    return {
      languages: [
        {id: 'pt', text: this.$t('topBar.pt'), icon: '/assets/brazil_flag.svg'},
        {id: 'en', text: this.$t('topBar.en'), icon: '/assets/usa_flag.svg'}
      ],
    }
  },
  methods: {
    changeLanguage(lang) {
      window.sessionStorage.setItem('language', lang);

      this.$router.go(0);
      this.$i18n.locale = lang;
    },
  },
}
</script>

<style scoped>

</style>
