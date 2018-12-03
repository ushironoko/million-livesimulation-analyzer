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
      :data="cardData.filter(data => data.name.toLowerCase())">
    </el-transfer>
  </section>
</template>

<script>
export default {
  props: ['cardData', 'loading'],
  data() {
    return {
      selection: []
    }
  }
}
</script>

<style scoped>
.transfer {
  margin-top: 30px;
}
</style>
