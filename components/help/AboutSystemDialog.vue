<template>
  <div class="text-center">

    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn text v-bind="attrs" v-on="on">
          <v-icon dark left>mdi-information-variant</v-icon>
          <span class="body-2">{{ $t("topBar.info") }}</span>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline primary">
          <span style="color: white">{{ $t("topBar.title") }}</span>
        </v-card-title>

        <v-card-text>
          <p class="mt-2 subtitle-2">WEB Interface Project in Vue.js with Nuxt and Vuetify</p>
          <h4 class="font-italic body-2">v1.0.0</h4>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">
            {{ $t("close") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
export default {
  name: "AboutSystem",

  data () {
    return {
      dialog: false,
    }
  },
}
</script>

