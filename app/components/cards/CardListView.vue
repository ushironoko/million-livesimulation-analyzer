<template>
  <section>
    <card-table :cardType="'SSRカード'" :cardData="ssrCardData" :loading="ssrLoading" />
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import CheckedCardView from '~/components/cards/CheckedCardView.vue'
import CardTable from '~/components/cards/CardTable.vue'

export default {
  data() {
    return {
      checkedCard: []
    }
  },
  async mounted() {
    await this.$store
      .dispatch('fetchSsrCard')
      .then(() => {
        this.$notify({
          title: '成功',
          message: 'SSRカード情報を更新しました',
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
  methods: {
    handleSelectionChange(val) {
      this.checkedCard = val
    }
  },
  components: {
    CheckedCardView,
    CardTable
  }
}
</script>
