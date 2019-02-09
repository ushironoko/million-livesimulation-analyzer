export const state = () => ({
  ssrCardData: [],
  songData: [],
  selectedSong: [],
  selectedCardList: [],
  liveSimulationData: [],
  syncTeamData: [],
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

  setSelectedCardList(state, data) {
    state.selectedCardList = data
  },

  setLiveSimulationData(state, data) {
    state.liveSimulationData = data
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
    const data = await this.$axios.$get(
      `https://api.matsurihi.me/mltd/v1/cards?rarity=4`
    )
    if (data.length === 0) throw new Error('Invalid SSR card data')
    commit('setSsrCardData', { data })
  },

  async fetchSongData({ commit }) {
    const data = await this.$axios.$get(
      `https://api.megmeg.work/mltd/v1/song/ `
    )
    if (data.length === 0) throw new Error('Invalid Song data')
    commit('setSongData', { data })
  },

  async fetchSongDataIncrementalUpdate({ commit }, songId) {
    const data = await this.$axios.$get(
      `https://api.megmeg.work/mltd/v1/song/?SongId=${songId}&IncrementalUpdate=true `
    )

    if (!data) return new Promise(resolve => resolve(data))
    commit('updateSongData', data)
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
