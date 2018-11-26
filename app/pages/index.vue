<template>
  <section class="container">
    <div>
      <SsrCard />
      <SrCard />
    </div>
  </section>
</template>

<script>
import SsrCard from '~/components/cards/SsrCards.vue'
import SrCard from '~/components/cards/SrCards.vue'
import { mapGetters } from 'vuex'

export default {
  async mounted() {
    await this.$store.dispatch('fetchSsrCard')
    .then(()=> {
      this.$notify({
          title: '成功',
          message: 'SSRカード情報を更新しました',
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
  components: {
    SsrCard,
    SrCard
  }
}
</script>

<style>
.bar-chart {
  top: 10%;
  width: 50%;
  height: 50%;
}

.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
