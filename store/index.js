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
  getPokemons: state => state.pokemons,
  getPokemon: (state) => {
    const { stats, ...rest } = state.pokemon
    const pokemonStats = stats
      ? stats.reduce((prev, curr) => {
          prev[curr.stat.name] = curr.base_stat
          return prev
        }, {})
      : []

    const height = Math.round((rest.height * 0.328084 + 0.00001) * 100) / 100

    const weight = Math.round((rest.weight * 0.220462 + 0.00001) * 100) / 100

    return {
      ...rest,
      height: `${height} ft.`,
      weight: `${weight} lbs`,
      stats: pokemonStats
    }
  }
}

export const actions = {
  async getPokemon ({ dispatch, commit }, { index, isView }) {
    const { data } = await this.$axios.get(`pokemon/${index}`)
    if (isView) {
    //   const speciesData = await dispatch('getPokemonDescription', index)
      commit('setPokemon', data)
    }
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
