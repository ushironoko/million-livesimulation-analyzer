export const state = () => ({
  ssrCardData: []
})

export const getters = {
  ssrCardData: state => state.ssrCardData
}

export const mutations = {
  setSsrCardData(state, { datas }) {
    datas.map(x => {
      x.resourceId = `https://storage.matsurihi.me/mltd/icon_l/${
        x.resourceId
      }_1.png`
    })

    datas.forEach(x => {
      state.ssrCardData.push(x)
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
