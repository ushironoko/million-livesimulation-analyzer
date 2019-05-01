<template>
  <section v-loading="firstLoading">
    <div>
      <song-selection-view />
      <team-view @snapshotEmit="setSnapshot" />
      <live-simulate-result-view :snapshot="snapshot" />
    </div>
  </section>
</template>

<script>
import TeamView from '@/components/teams/TeamView.vue'
import SongSelectionView from '@/components/songs/SongSelectionView.vue'
import LiveSimulateResultView from '@/components/livesimulates/LiveSimulateResultView.vue'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      snapshot: []
    }
  },
  computed: {
    ...mapGetters(['firstLoading'])
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
