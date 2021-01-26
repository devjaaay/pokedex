<template>
  <v-app>
    <v-app-bar
      fixed
      app
      flat
      elevate-on-scroll
    >
      <NuxtLink to="/">
        <img :src="require('@/assets/images/logo.svg')" height="150px" width="150px">
      </NuxtLink>
      <v-spacer />
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>
<style lang="scss" scoped>
.v-app-bar {
    background-color: #fff !important;
}

.container {
    height: 100%;
}
</style>
