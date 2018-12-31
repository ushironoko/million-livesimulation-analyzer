export const state = () => ({
  ssrCardData: []
})

export const getters = {
  ssrCardData: state => state.ssrCardData
}

export const mutations = {
  setSsrCardData(state, { datas }) {
    datas.forEach(data => {
      state.ssrCardData.push(data)
    })
  }
}

export const actions = {
  async fetchSsrCard({ commit }) {
    const datas = await this.$axios.$get(`/cards?rarity=4`)
    if (datas.length === 0) throw new Error('Invalid SSR card data')
    commit('setSsrCardData', { datas })
  }
}
