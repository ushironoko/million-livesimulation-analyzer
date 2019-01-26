export const state = () => ({
  ssrCardData: [],
  musicData: [],
  selectedMusic: [],
  selectedCardList: [],
  liveSimulationData: [],
  syncTeamData: [],
  isLiveSimulationLoading: false
})

export const getters = {
  ssrCardData: state => state.ssrCardData,
  musicData: state => state.musicData,
  selectedMusic: state => state.selectedMusic,
  selectedCardList: state => state.selectedCardList,
  liveSimulationData: state => state.liveSimulationData,
  syncTeamData: state => state.syncTeamData,
  isLiveSimulationLoading: state => state.isLiveSimulationLoading
}

export const mutations = {
  setSsrCardData(state, { data }) {
    data.map(x => {
      x.resourceId = `https://storage.matsurihi.me/mltd/icon_l/${
        x.resourceId
      }_1.png`
    })

    data.forEach(x => {
      state.ssrCardData.push(x)
    })
  },
  setMusicData(state, { data }) {
    state.musicData = data
  },
  setSelectedMusic(state, data) {
    state.selectedMusic = data
  },
  setSelectedCardList(state, data) {
    state.selectedCardList = data
  },
  setLiveSimulationData(state, data) {
    data.forEach(x => {
      state.liveSimulationData.push(x)
    })
  },
  setSyncTeamData(state, data) {
    state.syncTeamData.push(data)
  },
  deleteSyncTeamData(state, data) {
    if (!data) return
    const currentNum = state.syncTeamData.indexOf(x => x.key === data.key)
    state.syncTeamData.splice(currentNum, 1)
  },
  changeLiveSimulationLoading(state) {
    state.isLiveSimulationLoading = !state.isLiveSimulationLoading
  }
}

export const actions = {
  async fetchSsrCard({ commit }) {
    const data = await this.$axios.$get(`/cards?rarity=4`)
    if (data.length === 0) throw new Error('Invalid SSR card data')
    commit('setSsrCardData', { data })
  },
  async fetchMusicData({ commit }) {
    const data = await this.$axios.$get(
      `https://api.megmeg.work/mltd/v1/song/ `
    )
    if (data.length === 0) throw new Error('Invalid Music data')
    commit('setMusicData', { data })
  },
  async fetchLiveSimulationData({ commit }, payload) {
    commit('changeLiveSimulationLoading')

    const resultData = await this.$axios.$get(
      `https://api.megmeg.work/mltd/v1/score/singleunit/`,
      {
        params: payload
      }
    )
    commit('setLiveSimulationData', resultData)
    commit('changeLiveSimulationLoading')
  }
}
