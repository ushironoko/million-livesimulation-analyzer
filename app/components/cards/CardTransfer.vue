<template>
  <section>
    <el-transfer
      style="text-align: left; display: inline-block"
      v-loading="loading"
      element-loading-text="Loading..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      class="transfer"
      filterable
      v-model="selection"
      :props="{
        key:'name',
        label:'カード名'
      }"
      :titles="['カード一覧','編成']"
      :data="cardData.filter(data => data.name.toLowerCase())"
      >
    </el-transfer>
    <card-transfer-result :filteredList="filteredList" :lcmData="lcmData" />
  </section>
</template>

<script>
import CardTransferResult from '@/components/cards/CardTransferResult.vue'
import math from 'mathjs'

export default {
  props: ['cardData'],
  data() {
    return {
      selection: [],
      loading: true
    }
  },
  computed: {
    lcmData() {
      if (this.selection.length > 1) {
        const lcmResult = math.lcm(
          ...this.filteredList.map(x => {
            return x.skill[0].interval
          })
        )
        return lcmResult
      } else {
        return 0
      }
    },
    filteredList() {
      const filteredList = this.cardData.filter(data => {
        return this.selection.includes(data.name)
      })
      return filteredList
    }
  },
  mounted() {
    setTimeout(() => {
      this.loading = !this.loading
    }, 1500)
  },
  components: {
    CardTransferResult
  }
}
</script>

<style scoped>
.transfer {
  margin-top: 30px;
}
</style>
