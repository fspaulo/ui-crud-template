<template>
  <v-alert
    class="v-alert--material"
    v-bind="$attrs"
    v-on="$listeners"
    dense
    text
  >
    <template v-if="$attrs.icon" v-slot:prepend>
        <v-icon class="elevation-6">{{ $attrs.icon }}</v-icon>
    </template>

    <slot />

    <template v-if="$attrs.dismissible" v-slot:close="{ toggle }">
      <v-btn class="ml-4"
        :color="$attrs.type"
        icon
        small
        @click="toggle"
      >
        <v-icon>$vuetify.icons.cancel</v-icon>
      </v-btn>
    </template>

  </v-alert>
</template>

<script>
export default { name: 'AlertComponent' }
</script>

<style lang="scss">
.v-alert {
  margin-top: 28px;
}

.v-alert__dismissible {
  align-self: flex-start;
  margin: 0 0 0 16px !important;
}
</style>
