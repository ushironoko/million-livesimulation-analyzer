<template>
  <section>
    <div>
      <song-selection-view />
      <team-view />
      <live-simulate-result />
    </div>
  </section>
</template>

<script>
import TeamView from '~/components/teams/TeamView.vue'
import SongSelectionView from '~/components/songs/SongSelectionView.vue'
import LiveSimulateResult from '~/components/livesimulates/LiveSimulateResult.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    TeamView,
    SongSelectionView,
    LiveSimulateResult
  }
}
</script>
