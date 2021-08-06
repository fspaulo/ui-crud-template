<template>
  <div>
    <v-card class="main">
      <v-tabs
        v-model="active_tab"
        class=""
        :background-color="isDarkTheme ? '#363636' : '#fafafa'"
        height="15vh"
        fixed-tabs
        icons-and-text
      >
        <v-tabs-slider/>

        <v-tab v-for="(item, id) in tabItems"
               :key="item.tab"
               @click="setInterface(id)">
          <span>{{ item.tab }}</span>
          <v-icon class="mr-1" v-text="item.icon"></v-icon>
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="active_tab">
        <v-tab-item>
          <v-container class="mb-16">
            <v-img max-width="100vh" max-height="100vh"
                   :src="this.isDarkTheme ? '/homepage/cube.png'
                      : '/homepage/cube.png'"
            />
          </v-container>
        </v-tab-item>

        <v-tab-item>
          <v-container class="mb-16">
            <v-img max-width="100vh" max-height="100vh"
                   :src="this.isDarkTheme ? '/homepage/cube.png' : '/homepage/cube.png'"
            />
          </v-container>
        </v-tab-item>

        <v-tab-item>
          <v-container class="mb-16">
            <v-img max-width="100vh" max-height="100vh"
                   :src="this.isDarkTheme ? '/homepage/cube.png' : '/homepage/cube.png'"
            />
          </v-container>
        </v-tab-item>
      </v-tabs-items>
    </v-card>

    <Footer/>
  </div>
</template>

<script>
import Footer from "~/layouts/Footer";
import {mapGetters} from 'vuex'

export default {
  components: {
    Footer
  },

  created() {
    this.active_tab = this.getCurrentInterface
  },

  data() {
    return {
      active_tab: this.getCurrentInterface,

      tabItems: [
        {
          tab: 'Menu 01',
          icon: 'mdi-cube-outline',
        },
        {
          tab: 'Menu 02',
          icon: 'mdi-soccer',
        },
        {
          tab: 'Menu 03',
          icon: 'mdi-set-square',
        }
      ],
    }
  },

  computed: {
    ...mapGetters(['isAuthenticated', 'getCurrentInterface']),

    isDarkTheme() {
      return this.$vuetify.theme.dark === true;
    },
  },

  mounted: function () {
    if (!this.isAuthenticated) {
      this.$router.push("/login");
    }
  },

  methods: {
    setInterface(index){
      switch (index) {
        case 0:
          this.$store.dispatch("currentInterface", 0);
          break;
        case 1:
          this.$store.dispatch("currentInterface", 1);
          break;
        case 2:
          this.$store.dispatch("currentInterface", 2);
          break;
      }
      // console.log(this.getCurrentInterface)
    },
  },

  watch: {
    currentInterface() {
      this.active_tab = this.getCurrentInterface;
    },
  }

}
</script>

<style scoped>
.main {
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

</style>
