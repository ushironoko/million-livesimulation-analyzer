<template>
  <section>
    <card-table/>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import CheckedCardView from'~/components/cards/CheckedCardView.vue'
import CardTable from'~/components/cards/CardTransfer.vue'

export default {
  async created() {
    await this.$store.dispatch('fetchSrCard')
    .then(()=> {
      this.$notify({
          title: '成功',
          message: 'SRカード情報を更新しました',
          position: 'top-right',
          duration: '3000',
          type: 'success'
      })
    })
    .catch((err) => {
      this.$notify.error({
          title: '失敗',
          message: `${err}`,
          position: 'top-right',
          duration: '3000'
      })
    })
  },
  data() {
    return {
      checkedCard: []
    }
  },
  computed: {
    ...mapGetters(['srCardData','srLoading'])
  },
  methods: {
    handleSelectionChange(val) {
        this.checkedCard = val;
    }
  },
  components: {
    CheckedCardView,
    CardTable
  }
}
</script>
