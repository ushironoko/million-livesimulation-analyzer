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
import TeamView from '~/components/teams/TeamView.vue'
import SongSelectionView from '~/components/songs/SongSelectionView.vue'
import LiveSimulateResultView from '~/components/livesimulates/LiveSimulateResultView.vue'

export default {
  data() {
    return {
      snapshot: []
    }
  },
  methods: {
    setSnapshot(team) {
      this.snapshot = { payload: team, timestamp: Date.now() }
    }
  },
  components: {
    TeamView,
    SongSelectionView,
    LiveSimulateResultView
  }
}
</script>
