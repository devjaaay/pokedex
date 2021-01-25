<template>
  <div class="evolution" @click="$emit('click', pokemon.id)">
    <v-tooltip
      right
    >
      <template #activator="{ on, attrs }">
        <v-avatar
          size="80px"
          class="evolution--avatar"
          :class="{ active }"
          v-bind="attrs"
          v-on="on"
        >
          <img
            :src="pokemonImage"
          >
        </v-avatar>
      </template>
      <span class="text-capitalize">{{ pokemon.name }}</span>
    </v-tooltip>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    evolution: {
      type: Object,
      default: () => {}
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      evolutionPokemon: null
    }
  },
  computed: {
    ...mapGetters({
      currentPokemon: 'getPokemon'
    }),
    pokemonImage () {
      if (!this.evolutionPokemon && !this.currentPokemon) { return '' }
      return `https://pokeres.bastionbot.org/images/pokemon/${this.pokemon.id}.png`
    },
    pokemon () {
      return this.evolutionPokemon || this.currentPokemon
    }
  },
  async created () {
    if (!this.active) {
      const { data } = await this.$axios.get(this.evolution.url)
      this.evolutionPokemon = data
    }
  }
}
</script>
<style lang="scss" scoped>
.evolution {
    cursor: pointer;

    &--avatar {
        border: 1px solid #f1c40f;
        cursor: pointer;

        &.active {
            border: 1px solid #95a5a6;
            opacity: .7;
            pointer-events: none;
            cursor: none;

                img {
                        filter: grayscale(30) !important;
                }
            }

        img {
            padding: 8px;
        }
    }
}
</style>
