<template>
  <div>
    <v-row justify="center" align="center">
      <v-col v-for="(pokemon, index) in pokemons.results" :key="index">
        <PokemonCard :pokemon="pokemon" :pokemon-index="index + 1" />
      </v-col>
    <!-- <div class="catch-wrapper">
      <Catch />
    </div> -->
    </v-row>
    <v-row v-if="loading" class="flex-wrap">
      <v-col v-for="(pokemon, index) in 5" :key="index">
        <v-skeleton-loader
          type="card-avatar, article, actions"
        />
      </v-col>
    </v-row>
  </div>
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
      filter: 'getFilter',
      pokemons: 'getPokemons',
      loading: 'getListLoading'
    })
  },
  async created () {
    await this.$store.dispatch('getPokemonList')
  },
  beforeMount () {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll () {
      const e = document.documentElement
      if (Math.ceil(e.scrollTop) + e.clientHeight >= e.scrollHeight && !this.loading) {
        this.$store.dispatch('getPokemonList')
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
