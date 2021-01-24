export const state = () => ({
  pokemons: [],
  pokemon: {}
})

export const mutations = {
  setPokemons (state, payload) {
    state.pokemons = payload
  },
  setPokemon (state, payload) {
    state.pokemon = payload
  }
}

export const getters = {
  getPokemons: state => state.pokemons
}

export const actions = {
  async getPokemon ({ commit }, { index, isView }) {
    const { data } = await this.$axios.get(`pokemon/${index}`)
    isView && commit('setPokemon', data)
    return data
  },
  async getPokemonList ({ dispatch, commit }, payload) {
    const { data } = await this.$axios.get('pokemon')
    const pokemonsDetail = await Promise.all(data.results.map((_, index) => {
      const pokemonIndex = index + 1
      return dispatch('getPokemon', { index: pokemonIndex })
    }))

    commit('setPokemons', { ...data, results: pokemonsDetail })
  },
  async getPokemonDescription (_, index) {
    const { data } = await this.$axios.get(`pokemon-species/${index}`)

    return data.flavor_text_entries[0].flavor_text
  }
}
