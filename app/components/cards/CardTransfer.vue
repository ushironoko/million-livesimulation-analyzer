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
    <el-card>
      <span>{{ `${lcmData}秒後にスキルの発動が被ります`}}</span>

    </el-card>
  </section>
</template>

<script>
import math from 'mathjs'

export default {
  props: ['cardData', 'loading'],
  data() {
    return {
      selection: []
    }
  },
  computed: {
    lcmData() {
      if(this.selection.length > 1) {
        const selections = this.selection
        const filteredList = this.cardData
        .filter(function(data) {
          return selections.includes(data.name)
        }).map(x => {
          return x.skill[0].interval
        })

        const lcmResult = math.lcm(...filteredList)
        return lcmResult
      } else {
        return 0
      }
    }
  }
}
</script>

<style scoped>
.transfer {
  margin-top: 30px;
}
</style>
