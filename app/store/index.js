export const state = () => ({
  ssrCardData: [],
  srCardData: [],
})

export const getters = {
  ssrCardData: (state) => state.ssrCardData,
  srCardData: (state) => state.srCardData
}

export const mutations = {
  setSsrCardData(state, { datas }) {
    datas.forEach(data => {
      state.ssrCardData.push(data)
    });
  },
  setSrCardData(state, { datas }) {
    datas.forEach(data => {
      state.srCardData.push(data)
    });
  }
}

export const actions = {
  async fetchSsrCard({ commit }) {
    const datas = await this.$axios.$get(`/cards?rarity=4`)
    if (datas.length === 0) throw new Error('Invalid SSR card data')
    commit('setSsrCardData', { datas })
  },
  async fetchSrCard({ commit }) {
    const datas = await this.$axios.$get(`/cards?rarity=3`)
    if (datas.length === 0) throw new Error('Invalid SR card data')
    commit('setSrCardData', { datas })
  }
}
