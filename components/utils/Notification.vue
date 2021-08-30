<template>
  <v-snackbar
    v-model="internalValue"
    class="v-snackbar--material"
    timeout="4000"
    centered
    top
    :light="!isDarkTheme"
    v-bind="{}"
    transition="scale-transition"
  >
    <alert-component
      v-model="internalValue"
      :dismissible="dismissible"
      :type="type"
      class="ma-0"
      dark
    >
      <slot />
    </alert-component>
  </v-snackbar>
</template>

<script>
import alertComponent from "~/components/utils/AlertComponent";
  export default {
    name: 'Notification',

    props: {
      dismissible: {
        type: Boolean,
        default: true,
      },
      type: {
        type: String,
        default: '',
      },
      value: Boolean,
    },

    components: {
      alertComponent
    },

    data () {
      return {
        internalValue: this.value,
      }
    },

    computed: {
      isDarkTheme() {
        return this.$vuetify.theme.dark === true;
      },
    },

    watch: {
      internalValue (val, oldVal) {
        if (val === oldVal) return

        this.$emit('input', val)
      },
      value (val, oldVal) {
        if (val === oldVal) return

        this.internalValue = val
      },
    },
  }
</script>

<style lang="sass">
  .v-snackbar--material
    margin-top: 32px
    margin-bottom: 32px

    .v-alert
      padding: 22px 16px //vertical, horizontal

    .v-alert--material,
    .v-snack__wrapper
      border-radius: 4px

    .v-snack__content
      overflow: visible
      padding: 0

    .v-snack__action
      display: none
</style>
