<template>
  <section>
    <el-button type="primary" @click="fetchCardAsync">取得</el-button>
  </section>
</template>

<script>
import  { mapActions } from 'vuex'

export default {
  props: ['cardId'],
  methods: {
    ...mapActions(['fetchCard']),
    async fetchCardAsync() {
      try {
        await this.fetchCard([this.cardId])
        this.$notify({
          title: '成功',
          message: 'カード情報を更新しました',
          position: 'buttom-right',
          duration: '3000'
        })
      } catch (e) {
        this.$notify.error({
          title: '失敗',
          message: `${e}`,
          position: 'buttom-right',
          duration: '3000'
        })
      }
    }
  }
}
</script>

<style>
</style>
