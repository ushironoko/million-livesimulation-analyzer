export const state = () => ({
  cardData : []
})

export const getters = {
  cardData: (state) => state.cardData
}

export const mutations = {
  setCardData(state, { data }) {
    state.cardData = data
  }
}

export const actions = {
  async fetchCardAll({ commit }) {
    const data = await this.$axios.$get(`/cards`)
    if (!data) throw new Error('Invalid card data')
    commit('setCardData', { data })
  }
}
