<template>
  <el-transfer
    class="transfer"
    v-model="selection"
    
    :props="{
      key:'name',
      label:'カード名'
    }"
    :data="cardData"> 
  </el-transfer>
</template>

<script>
  export default {
    props: ['cardData'],
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
