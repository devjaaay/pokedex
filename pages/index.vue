<template>
  <v-row justify="center" align="center">
    <v-col v-for="(pokemon, index) in pokemons.results" :key="index">
      <PokemonCard :pokemon="pokemon" :pokemon-index="index + 1" />
    </v-col>
    <!-- <div class="catch-wrapper">
      <Catch />
    </div> -->
  </v-row>
</template>

<script>
import PokemonCard from '@/components/PokemonCard'
// import Catch from '@/components/Catch'

import { mapGetters } from 'vuex'

export default {
  components: {
    PokemonCard
    // Catch
  },
  computed: {
    ...mapGetters({
      pokemons: 'getPokemons',
      loading: 'getListLoading'
    })
  },
  async created () {
    await this.$store.dispatch('getPokemonList')
  },
  mounted () {
    window.document.body.onscroll = this.handleScroll
  },
  methods: {
    handleScroll (event) {
      const e = event.target
      if (Math.ceil(e.scrollTop) + e.clientHeight >= e.scrollHeight && !this.loading) {
        console.log('below')
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.catch-wrapper {
    position: absolute;
    z-index: +1;
    left: 50%;
}
</style>
