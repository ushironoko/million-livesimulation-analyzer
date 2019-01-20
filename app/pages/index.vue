<template>
  <section>
    <div>
      <song-selection-view />
      <card-transfer-view />
      <live-simulate-result />
    </div>
  </section>
</template>

<script>
import CardTransferView from '~/components/cards/CardTransferView.vue'
import SongSelectionView from '~/components/songs/SongSelectionView.vue'
import LiveSimulateResult from '~/components/livesimulates/LiveSimulateResult.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    CardTransferView,
    SongSelectionView,
    LiveSimulateResult
  },
  mounted() {
    this.$nuxt.$on('SELECTED_MUSIC', val => {
      this.$store.commit('setSelectedMusic', val)
    })

    this.$nuxt.$on('SELECTED_CARD_LIST', val => {
      this.$store.commit('setSelectedCardList', val)
    })
  }
}
</script>
