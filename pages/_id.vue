<template>
  <v-row justify="center" align="center" class="pokemon--view">
    <v-col class="d-flex flex-column justify-center align-center relative" style="position: relative; width: 100%;">
      <v-avatar size="25em" class="pokemon--avatar" tile>
        <img
          :src="pokemonImage"
        >
      </v-avatar>

      <v-card-title class="pokemon-name">
        {{ pokemon.name }}
      </v-card-title>

      <v-card class="pokemon-characteristics" max-width="450px">
        <v-card-text>
          <div class="d-flex justify-space-between">
            <div class="characteristic d-flex flex-column">
              <span class="name">
                <v-icon
                  right
                >
                  mdi-ruler
                </v-icon>
                Height
              </span>
              <span class="value">{{ pokemon.height }}</span>
            </div>
            <div class="characteristic d-flex flex-column">
              <span class="name">
                <v-icon
                  right
                >
                  mdi-weight
                </v-icon>
                Weight
              </span>
              <span class="value">{{ pokemon.weight }}</span>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col class="d-flex justify-center align-center">
      <v-card class="pokemon--stats">
        <v-card-title>
          <h3>Stats</h3>
        </v-card-title>
        <v-card-text>
          <div
            v-for="(value, name) in pokemon.stats"
            :key="name"
            class="pokemon--stats--item"
          >
            <span class="name">
              {{ name }}

            </span>
            <v-progress-linear
              :value="value"
              height="25"
              :color="colors[name]"
            >
              <strong>{{ Math.ceil(value) }}%</strong>
            </v-progress-linear>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
const colors = {
  hp: '#2ecc71',
  attack: '#e74c3c',
  defense: '#95a5a6',
  'special-attack': '#c0392b',
  'special-defense': '#7f8c8d',
  speed: '#f1c40f'
}

export default {
  computed: {
    ...mapGetters({
      pokemon: 'getPokemon'
    }),
    id () {
      return this.$route.params.id
    },
    pokemonImage () {
      return `https://pokeres.bastionbot.org/images/pokemon/${this.id}.png`
    },
    colors () {
      return colors
    }
  },
  async created () {
    await this.$store.dispatch('getPokemon', { index: this.id, isView: true })
  }
}
</script>

<style lang="scss" scoped>

.catch-wrapper {
    position: absolute;
    z-index: +1;
    left: 50%;
}

.pokemon {
    &--view {
        height: 100%;
    }
    &-name {
        font-size: 55px !important;
        position: absolute;
        top: 0;
        letter-spacing: 8px;
        text-transform: uppercase;
        transform-origin: 0 0;
        transform: rotate(90deg);
    }

    &--stats {
        width: 100%;

        &--item {
            display: flex;
            &:not(:last-of-type) {
                margin-bottom: 12px;
            }

            .name {
                flex-basis: 30%;
                text-transform: capitalize;
                font-size: 16px;
            }
        }
    }

    &-characteristics {
        width: 100%;
    }
}
</style>
