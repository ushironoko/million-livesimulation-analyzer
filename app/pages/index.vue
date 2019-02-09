<template>
  <section>
    <div>
      <song-selection-view />
      <team-view @snapshotEmit="snapshotEmit" />
      <live-simulate-result :snapshot="snapshot" />
    </div>
  </section>
</template>

<script>
import TeamView from '~/components/teams/TeamView.vue'
import SongSelectionView from '~/components/songs/SongSelectionView.vue'
import LiveSimulateResult from '~/components/livesimulates/LiveSimulateResult.vue'
import cloneDeep from 'lodash/cloneDeep'

export default {
  data() {
    return {
      snapshot:[]
    }
  },
  methods: {
    snapshotEmit(team) {
      this.snapshot = team
    }
  },
  components: {
    TeamView,
    SongSelectionView,
    LiveSimulateResult
  }
}
</script>
