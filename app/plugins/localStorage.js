import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  window.onNuxtReady(() => {
    createPersistedState({
      key: 'mta',
      paths: ['syncTeamData', 'musicData']
    })(store)
  })
}
