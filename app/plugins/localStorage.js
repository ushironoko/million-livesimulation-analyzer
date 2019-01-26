import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  window.onNuxtReady(() => {
    createPersistedState({
      key: 'teams',
      paths: ['syncTeamData']
    })(store)
  })
}
