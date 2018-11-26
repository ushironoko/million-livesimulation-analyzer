export const state = () => ({
  ssrCardData: [],
  srCardData: [],
  ssrLoading: false,
  srLoading: false,
})

export const getters = {
  ssrCardData: (state) => state.ssrCardData,
  srCardData: (state) => state.srCardData,
  ssrLoading: (state) => state.ssrLoading,
  srLoading: (state) => state.srLoading
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
  },
  toggleSsrLoading(state) {
    state.ssrLoading = !state.ssrLoading
  },
  toggleSrLoading(state) {
    state.srLoading = !state.srLoading
  }
}

export const actions = {
  async fetchSsrCard({ commit }) {
    commit('toggleSsrLoading')

    const datas = await this.$axios.$get(`/cards?rarity=4`)
    if (datas.length === 0) throw new Error('Invalid SSR card data')
    commit('setSsrCardData', { datas })

    setTimeout(() => {
      commit('toggleSsrLoading')
    }, 1500);
  },
  async fetchSrCard({ commit }) {
    commit('toggleSrLoading')

    const datas = await this.$axios.$get(`/cards?rarity=3`)
    if (datas.length === 0) throw new Error('Invalid SR card data')
    commit('setSrCardData', { datas })

    setTimeout(() => {
      commit('toggleSrLoading')
    }, 1500);
  }
}
