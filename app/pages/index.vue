<template>
  <section>
    <div>
      <music-view />
      <card-transfer-view />
    </div>
  </section>
</template>

<script>
import CardTransferView from '~/components/cards/CardTransferView.vue'
import MusicView from '~/components/cards/MusicView.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    CardTransferView,
    MusicView
  }
}
</script>
