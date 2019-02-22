<template>
  <section>
    <div>
      <song-selection-view />
      <team-view @snapshotEmit="setSnapshot" />
      <live-simulate-result-view :snapshot="snapshot" />
    </div>
  </section>
</template>

<script>
const TeamView = () =>
  import(/* webpackPreload: true */ '~/components/teams/TeamView.vue')
const SongSelectionView = () =>
  import(/* webpackPreload: true */ '~/components/songs/SongSelectionView.vue')
const LiveSimulateResultView = () =>
  import(/* webpackPreload: true */ '~/components/livesimulates/LiveSimulateResultView.vue')

export default {
  data() {
    return {
      snapshot: []
    }
  },
  methods: {
    setSnapshot(team, appealValue) {
      this.snapshot = {
        payload: team,
        appealValue: appealValue,
        timestamp: Date.now()
      }
    }
  },
  components: {
    TeamView,
    SongSelectionView,
    LiveSimulateResultView
  }
}
</script>
