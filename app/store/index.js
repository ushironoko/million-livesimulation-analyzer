export const state = () => ({
  ssrCardData: []
})

export const getters = {
  ssrCardData: state => state.ssrCardData
}

export const mutations = {
  //取得カードをstateにプッシュ
  setSsrCardData(state, { datas }) {
    datas.forEach(data => {
      state.ssrCardData.push(data)
    })
  }
}

export const actions = {
  //SSRカード全取得
  async fetchSsrCard({ commit }) {
    const datas = await this.$axios.$get(`/cards?rarity=4`)
    if (datas.length === 0) throw new Error('Invalid SSR card data')
    commit('setSsrCardData', { datas })
  }
}
