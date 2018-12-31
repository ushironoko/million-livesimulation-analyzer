export const state = () => ({
  ssrCardData: [],
  ssrLoading: false
})

export const getters = {
  ssrCardData: state => state.ssrCardData,
  ssrLoading: state => state.ssrLoading
}

export const mutations = {
  //取得カードをstateにプッシュ
  setSsrCardData(state, { datas }) {
    datas.forEach(data => {
      state.ssrCardData.push(data)
    })
  },
  //ローディング制御
  toggleSsrLoading(state) {
    state.ssrLoading = !state.ssrLoading
  }
}

export const actions = {
  //SSRカード全取得
  async fetchSsrCard({ commit }) {
    commit('toggleSsrLoading')

    const datas = await this.$axios.$get(`/cards?rarity=4`)
    if (datas.length === 0) throw new Error('Invalid SSR card data')
    commit('setSsrCardData', { datas })

    setTimeout(() => {
      commit('toggleSsrLoading')
    }, 1500)
  }
}
