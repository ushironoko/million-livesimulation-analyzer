<template>
  <el-card>
    <div>
      <span>{{ `${lcmData}秒後にすべてのスキル発動が被ります`}}</span>
    </div>
    <hr>
    <div v-for="selectedCard in filteredList" :key="selectedCard.id">
      {{ selectedCard }}
    </div>
  </el-card>
</template>

<script>
export default {
  props:['filteredList','lcmData']
}
</script>
