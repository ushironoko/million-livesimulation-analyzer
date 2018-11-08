export const state = () => ({
  cardData : []
})

export const getters = {
  cardData: (state) => state.cardData
}

export const mutations = {
  setCardData(state, { data }) {
    state.cardData.push(data)
  }
}

export const actions = {
  async fetchCard({ commit }, { id }) {
    const data = await this.$axios.$get(`/cards/250`)
    if (!data) throw new Error('Invalid card data')
    commit('setCardData', { data })
  }
}
