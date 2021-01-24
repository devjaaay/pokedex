<template>
  <v-card
    max-width="320"
    flat
  >
    <v-img
      class="white--text align-end pokemon--bg"
      :src="pokemonImage"
    >
      <div class="pokemon--types">
        <v-tooltip
          v-for="item in pokemon.types"
          :key="item.type.name"
          left
        >
          <template #activator="{ on, attrs }">
            <v-chip
              v-bind="attrs"
              class="pokemon--type"
              pill
              :style="`background-color: ${colors[item.type.name]}`"
              v-on="on"
            />
          </template>
          <span class="text-capitalize">{{ item.type.name }}</span>
        </v-tooltip>
      </div>
      <v-card-title class="pokemon-name">
        {{ pokemon.name }}
      </v-card-title>
    </v-img>
    <v-avatar size="120px" class="pokemon--avatar" tile>
      <img
        :src="pokemonImage"
      >
    </v-avatar>
    <v-card-text class="text--primary">
      <div>{{ description }}</div>
    </v-card-text>

    <v-card-actions>
      <v-btn
        class="text-capitalize px-4"
        color="primary lighten-2"
        outlined
        rounded
        small
        @click="$router.push(`/${pokemon.id}`)"
      >
        Learn More
      </v-btn>
      <v-tooltip
        top
      >
        <template #activator="{ on, attrs }">
          <v-btn
            class="px-4 ml-auto"
            fab
            small
            text
            v-bind="attrs"
            v-on="on"
          >
            <img :src="require('@/assets/images/open-pokeball.svg')" width="25px">
          </v-btn>
        </template>
        <span class="text-capitalize">Catch</span>
      </v-tooltip>
    </v-card-actions>
  </v-card>
</template>

<script>

const colors = {
  fire: '#FDDFDF',
  grass: '#DEFDE0',
  electric: '#FCF7DE',
  water: '#DEF3FD',
  ground: '#f4e7da',
  rock: '#d5d5d4',
  fairy: '#fceaff',
  poison: '#98d7a5',
  bug: '#f8d5a3',
  dragon: '#97b3e6',
  psychic: '#eaeda1',
  flying: '#bdc3c7',
  fighting: '#E6E0D4',
  normal: '#ecf0f1'
}

export default {
  props: {
    pokemon: {
      type: Object,
      required: true
    },
    pokemonIndex: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      description: ''
    }
  },
  computed: {
    pokemonImage () {
      return `https://pokeres.bastionbot.org/images/pokemon/${this.pokemonIndex}.png`
    },
    colors () {
      return colors
    }
  },
  async created () {
    this.description = await this.$store.dispatch('getPokemonDescription', this.pokemonIndex)
  }
}
</script>

<style lang="scss" scoped>
.image-wrapper {
    height: 200px;
    width: 400px;
    position: relative;
}

.pokemon {
    &--bg {
        ::v-deep .v-image__image {
            opacity: .3 !important;
            filter: grayscale(30) !important;
        }
    }
    &--avatar {
        position: absolute;
        top: 25%;
        left: 50%;
        right: 0;
        bottom: 0;
    }

    &--types {
        position: absolute;
        top: 0;
        right: 0;
    }

    &--type {
        width: 35px;
        height: 15px;

        &:not(:last-of-type) {
            margin-right: 5px;
        }
    }
}
</style>
