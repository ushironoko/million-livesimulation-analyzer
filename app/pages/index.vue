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
  },
  mounted() {
    this.$nuxt.$on('SELECTED_SONG', val => {
      this.$store.commit('setSelectedSong', val)
    })

    this.$nuxt.$on('SELECTED_CARD_LIST', val => {
      this.$store.commit('setSelectedCardList', val)
    })
  }
}
</script>
