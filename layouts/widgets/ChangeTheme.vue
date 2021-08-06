<template>
  <div>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" @click="changeTheme" icon style="margin-right: 5px">
          <v-icon v-if="icon === true">mdi-white-balance-sunny</v-icon>
          <v-icon v-else>mdi-moon-waning-crescent</v-icon>
        </v-btn>
      </template>
      <span>{{ $t("topBar.theme") }}</span>
    </v-tooltip>
  </div>
</template>

<script>
export default {
  data() {
    return {
      icon: false,
    }
  },
  methods: {
    beforeDestroy() {
      if (!this.$vuetify) return;
      this.$vuetify.theme.dark = this.initialDark;
    },
    changeTheme() {
      this.icon = !this.icon;
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    }
  },
};
</script>

