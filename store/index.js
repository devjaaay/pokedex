export const state = () => ({
  pokemons: {
    results: []
  },
  pokemon: {
    typesDamages: []
  },
  filter: {
    offset: 0
  },
  listLoading: false
})

export const mutations = {
  setListLoading (state, payload) {
    state.listLoading = payload
  },
  setPokemons (state, payload) {
    state.pokemons = {
      count: payload.count,
      results: [
        ...state.pokemons.results,
        ...payload.results
      ]
    }
  },
  setPokemon (state, payload) {
    state.pokemon = payload
  },
  setPokemonTypesDamages (state, payload) {
    state.pokemon = {
      ...state.pokemon,
      typesDamages: payload
    }
  },
  setOffset (state, payload) {
    state.filter.offset += 20
  }
}

export const getters = {
  getListLoading: state => state.listLoading,
  getFilter: state => state.filter,
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

      const values = await Promise.all(data.types.map((item) => {
        return this.$axios.get(item.type.url)
      }))

      const typesDamages = values.map(({ data }) => {
        return {
          name: data.name,
          data: Object.keys(data.damage_relations).reduce((prev, curr) => {
            if ([
              'double_damage_to',
              'double_damage_from'
            ].includes(curr)) {
              prev[curr] = data.damage_relations[curr].map(damage => damage.name).join(', ')
            }

            return prev
          }, {})
        }
      })

      commit('setPokemon', { ...data, typesDamages, evolutions, description: speciesData.flavor_text_entries[0].flavor_text })
    }
    return data
  },
  async getPokemonList ({ dispatch, commit, state }) {
    commit('setListLoading', true)
    const { data } = await this.$axios.get(`pokemon?offset=${state.filter.offset}&limit=20`)
    const pokemonsDetail = await Promise.all(data.results.map((item) => {
      return this.$axios.get(item.url)
    }))
    commit('setPokemons', { ...data, results: pokemonsDetail.map(detail => detail.data) })
    commit('setOffset')
    commit('setListLoading', false)
  },
  async getPokemonDescription (_, index) {
    const { data } = await this.$axios.get(`pokemon-species/${index}`)
    // return data.flavor_text_entries[0].flavor_text
    return data
  }
}
