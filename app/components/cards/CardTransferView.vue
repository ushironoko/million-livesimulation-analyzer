<template>
  <section>
    <card-transfer :cardData="ssrCardData" :loading="ssrLoading"/>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import CardTransfer from '~/components/cards/CardTransfer.vue'

export default {
  async created() {
    await this.$store
      .dispatch('fetchSsrCard')
      .then(() => {
        this.$notify({
          title: '成功',
          message: 'SRカード情報を更新しました',
          position: 'top-right',
          duration: '3000',
          type: 'success'
        })
      })
      .catch(err => {
        this.$notify.error({
          title: '失敗',
          message: `${err}`,
          position: 'top-right',
          duration: '3000'
        })
      })
  },
  computed: {
    ...mapGetters(['ssrCardData', 'ssrLoading'])
  },
  components: {
    CardTransfer
  }
}
</script>
