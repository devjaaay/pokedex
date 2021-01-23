export default function ({ $axios }) {
  $axios.onError((error) => {
    if (error.response.status >= 500) {
      // Something went wrong in Pokedex API
    }
  })
}
