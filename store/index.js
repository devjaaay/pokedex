export const state = () => ({
  pokemons: [],
  pokemon: {},
  listLoading: false
})

export const mutations = {
  setListLoading (state, payload) {
    state.listLoading = payload
  },
  setPokemons (state, payload) {
    state.pokemons = payload
  },
  setPokemon (state, payload) {
    state.pokemon = payload
  }
}

export const getters = {
  getListLoading: state => state.listLoading,
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
      const speciesData = await dispatch('getPokemonDescription', index)

      const evolutionData = await this.$axios.get(speciesData.evolution_chain.url)
      const evolutions = []
      let currentEvolution = evolutionData.data.chain

      do {
        evolutions.push({
          name: currentEvolution.species.name,
          url: currentEvolution.species.url
        })

        currentEvolution = currentEvolution.evolves_to[0]
      } while (!!currentEvolution && currentEvolution.evolves_to)
      commit('setPokemon', { ...data, evolutions, description: speciesData.flavor_text_entries[0].flavor_text })
    }
    return data
  },
  async getPokemonList ({ dispatch, commit }, payload) {
    commit('setListLoading', true)
    const { data } = await this.$axios.get('pokemon')
    const pokemonsDetail = await Promise.all(data.results.map((_, index) => {
      const pokemonIndex = index + 1
      return dispatch('getPokemon', { index: pokemonIndex })
    }))

    commit('setPokemons', { ...data, results: pokemonsDetail })
    commit('setListLoading', false)
  },
  async getPokemonDescription (_, index) {
    const { data } = await this.$axios.get(`pokemon-species/${index}`)
    // return data.flavor_text_entries[0].flavor_text
    return data
  }
}
