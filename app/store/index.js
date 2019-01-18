export const state = () => ({
  ssrCardData: [],
  musicData: []
})

export const getters = {
  ssrCardData: state => state.ssrCardData,
  musicData: state => state.musicData
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
  },
  setMusicData(state, { datas }) {
    state.musicData = datas
  }
}

export const actions = {
  async fetchSsrCard({ commit }) {
    const datas = await this.$axios.$get(`/cards?rarity=4`)
    if (datas.length === 0) throw new Error('Invalid SSR card data')
    commit('setSsrCardData', { datas })
  },
  async fetchMusicData({ commit }) {
    const datas = await this.$axios.$get(
      `https://api.megmeg.work/mltd/v1/song/ `
    )
    if (datas.length === 0) throw new Error('Invalid Music data')
    commit('setMusicData', { datas })
  }
}
