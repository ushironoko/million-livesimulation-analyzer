export const state = () => ({
  ssrCardData: [],
  songData: [],
  selectedSong: [],
  syncTeamData: [],
  liveSimulationData: [],
  isLiveSimulationLoading: false
})

export const getters = {
  ssrCardData: state => state.ssrCardData,

  songData: state => state.songData,

  getSongDataLength: state => {
    return state.songData.length
  },

  getSongDataEndSongId: state => {
    const endSongData = state.songData.slice(-1)[0]
    return endSongData.SongId
  },

  selectedSong: state => state.selectedSong,

  syncTeamData: state => state.syncTeamData,

  liveSimulationData: state => state.liveSimulationData,

  isLiveSimulationLoading: state => state.isLiveSimulationLoading
}

export const mutations = {
  setSsrCardData(state, { data }) {
    data.map(x => {
      x.resourceId = `${process.env.MATSURIHIME_ICON}${x.resourceId}_1.png`
    })

    data.forEach(x => {
      state.ssrCardData.push(x)
    })
  },

  setSongData(state, { data }) {
    state.songData = data
  },

  setSelectedSong(state, data) {
    state.selectedSong = data
  },

  updateSongData(state, data) {
    data.forEach(x => {
      console.log(x)
      state.songData.push(x)
    })
  },

  setSyncTeamData(state, data) {
    state.syncTeamData.push(data)
  },

  deleteSyncTeamData(state, data) {
    if (!data) return
    const currentNum = state.syncTeamData.findIndex(x => x.key === data.key)
    state.syncTeamData.splice(currentNum, 1)
  },

  setLiveSimulationData(state, data) {
    state.liveSimulationData = data
  },

  changeLiveSimulationLoading(state) {
    state.isLiveSimulationLoading = !state.isLiveSimulationLoading
  }
}

export const actions = {
  async fetchSsrCard({ commit }) {
    const data = await this.$axios.$get(
      `${process.env.FIREBASE_V1_CARDS_SSR_ENDPOINT}`
    )
    commit('setSsrCardData', { data })
  },

  async fetchSongData({ commit }) {
    const data = await this.$axios.$get(
      `${process.env.MEGMEGWORK_API_ENDPOINT}/song/ `
    )
    commit('setSongData', { data })
  },

  async fetchSongDataIncrementalUpdate({ commit }, songId) {
    const data = await this.$axios.$get(
      `${
        process.env.MEGMEGWORK_API_ENDPOINT
      }/song/?SongId=${songId}&IncrementalUpdate=true `
    )

    if (!data) return new Promise(resolve => resolve(data))
    commit('updateSongData', data)
  },

  async fetchLiveSimulationData({ commit }, payload) {
    commit('changeLiveSimulationLoading')

    const resultData = await this.$axios.$get(
      `${process.env.MEGMEGWORK_API_ENDPOINT}/score/singleunit/`,
      {
        params: payload
      }
    )
    commit('setLiveSimulationData', resultData)
    commit('changeLiveSimulationLoading')
  }
}
