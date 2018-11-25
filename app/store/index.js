export const state = () => ({
  cardData: [],
  loaded: true
})

export const getters = {
  cardData: (state) => state.cardData,
  loaded: (state) => state.loaded
}

export const mutations = {
  setCardData(state, { data }) {
    state.cardData = data
  },
  changeLoaded(state) {
    state.loaded = !state.loaded
  }
}

export const actions = {
  async fetchCard({ commit }) {
    const data = await this.$axios.$get(`/cards?rarity=4`)
    if (!data) throw new Error('Invalid card data')
    commit('setCardData', { data })
  }
}
