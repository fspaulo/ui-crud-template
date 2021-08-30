<template>
  <v-app :id="isDarkTheme ? 'login-dark'
        : 'login-light'" style="height: 100%">

    <v-system-bar color="transparent">
      <v-spacer/>
      <help-component/>
    </v-system-bar>

    <v-container
      id="login-view"
      class="fill-height"
      tag="section"
    >
      <v-row justify="center">
        <v-col cols="10">
          <v-slide-y-transition appear>
            <material-card
              max-width="350"
              rounded
              class="mx-auto mb-15"
              :color="isDarkTheme ? 'accent' : '#eaeaea'"
              full-header
              :style="isDarkTheme ? 'background: #282828;' : 'background: #fafafa;'"
            >
              <template #heading>
                <div class="text-center pa-5">
                  <div class="text-h4 font-weight-bold">
                    <span>Login</span>
                  </div>
                  <div class="mt-4">
                    <v-btn icon class="mx-2" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">
                      <v-icon>mdi-facebook</v-icon>
                    </v-btn>
                    <v-btn icon href="https://br.linkedin.com" target="_blank">
                      <v-icon>mdi-linkedin</v-icon>
                    </v-btn>
                  </div>
                </div>
              </template>

              <v-card-text v-model="valid" class="text-center" style="height: 320px;">
                <div class="text-center font-weight-light">
                  <p v-text="$t('authentication.welcome')"/>
                </div>
                <v-text-field
                  v-model="loginUser.mobilePhone"
                  autocomplete="off"
                  name="login"
                  :label="$t('authentication.username')"
                  :rules="[required('name')]"
                  class="mt-10"
                  color="primary"
                  prepend-icon="mdi-account"
                />

                <v-text-field
                  v-model="loginUser.password" autocomplete="off"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPassword ? 'text' : 'password'"
                  name="password"
                  :label="$t('authentication.password')"
                  @click:append="showPassword = !showPassword"
                  @keyup.enter="loginWMS()"
                  :rules="[required('password')]"
                  class="mb-8"
                  color="primary"
                  prepend-icon="mdi-lock-outline"
                />

                <v-btn large class="primary" :loading="loading"
                       style="width: 30%;"
                       :disabled="!valid"
                       @click.stop="loginWMS(), invalidLogin ? showAlert = true : ''">
                  <v-icon class="mr-1"> mdi-login</v-icon>
                  <span>{{ $t("authentication.btnLogin") }}</span>
                  <template v-slot:loader>
                    <span class="custom-loader">
                      <v-icon class="black--text">mdi-autorenew</v-icon>
                    </span>
                  </template>
                </v-btn>
              </v-card-text>
            </material-card>
          </v-slide-y-transition>
        </v-col>
      </v-row>
    </v-container>

    <notification v-model="showAlert" type="warning">
      <span class="font-weight-bold">{{ $t("authentication.alertLogin") }}</span>
    </notification>

    <Footer/>
  </v-app>
</template>

<script>
import validations from "@/utils/validations";
import Footer from "~/layouts/Footer";
import Notification from "~/components/utils/Notification";
import MaterialCard from "~/components/utils/MaterialCard";
import {mapActions, mapGetters} from "vuex";

export default {
  components: {
    Footer,
    Notification,
    MaterialCard,
  },

  data() {
    return {
      invalidLogin: false,
      valid: false,
      loading: null,
      showPassword: false,
      showAlert: false,
      loginUser: {
        mobilePhone: "", // todo mudar para username
        password: "",
        type: "mob",
      },
      ...validations,
    }
  },

  computed: {
    isDarkTheme() {
      return this.$vuetify.theme.dark === true;
    },
    ...mapGetters(['isAuthenticated']),

  },

  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];
      setTimeout(() => (this[l] = false), 4000);
      this.loader = null;
    },
  },

  methods: {
    /*
    * myWMS
    * */
    loginWMS() {
      this.loading = true;
      let user = this.loginUser;

      if (user.mobilePhone === 'admin' && user.password === 'admin') {
        this.$store.dispatch("loggedIn", true);
        this.$router.push("/");

      } else {
        this.invalidLogin = true;
        this.loading = false;
      }
    },

    ...mapActions("users", ["login"]),

    // TODO Login modelo tracebox, Issue #1
    /*log_in() {
      this.loading = true;
      let user = this.loginUser;

      const message = this.login(user)
        .then((res) => {
          this.loading = false;
          this.$store.dispatch("loggedIn", true);
          this.$router.push("/homepage");
        })
        .catch((err) => {
          this.loading = false;
          this.invalidLogin = true;
          // this.$store.dispatch("message", err);
        });
    },*/
  },

  mounted() {
    if (this.isAuthenticated) {
      this.$router.push("/");
    }

    localStorage.removeItem("Nome");
    this.$store.dispatch("clearStore");
    localStorage.removeItem("jwt");
    localStorage.removeItem("user-image");
  },

};
</script>

<style scoped lang="scss">
#login-dark {
  background: linear-gradient(
      90deg,
      #303030 0,
      #555555 40%,
      #555555 62%,
      #303030
  ) !important;
  width: 100%;
  position: relative;
  top: 0;
  left: 0;
  content: "";
  z-index: 0;
}

#login-light {
  background: linear-gradient(
      90deg,
      #a5a5a5 0,
      #eaeaea 40%,
      #eaeaea 62%,
      #a5a5a5
  ) !important;
  width: 100%;
  position: relative;
  top: 0;
  left: 0;
  content: "";
  z-index: 0;
}

.v-card__title {
  background: #282828;
}

.cardLogin-dark {
  background: #282828;
}

.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}

@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
