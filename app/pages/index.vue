<template>
  <section>
    <div>
      <card-transfer-view />
    </div>
  </section>
</template>

<script>
import CardTransferView from '~/components/cards/CardTransferView.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    CardTransferView
  }
}
</script>
