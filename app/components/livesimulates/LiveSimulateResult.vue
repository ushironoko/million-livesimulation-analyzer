<template>
  <section>
    <el-container>
      <span v-for="(payload, i) in snapshot" :key="i">
        <a :href="mtldImgUrl(payload.id)" target="_blunk" rel="noopener">
          <img v-if="i === 0" :src="payload.resourceId" style="max-width: 100px; width: 100%; border:solid 2px #9eceff; border-radius: 0.5em;"/>
          <img v-else :src="payload.resourceId" style="max-width: 100px; width: 100%;"/>
        </a>
      </span>
    </el-container>

    <el-table :data="simuResult" max-height="960">
      <el-table-column label="最大" prop="ScoreInfo.Total.Ideal">
      </el-table-column>
      <el-table-column label="0.1%" prop="ScoreInfo.Total.p[0]">
      </el-table-column>
      <el-table-column label="1%" prop="ScoreInfo.Total.p[1]">
      </el-table-column>
      <el-table-column label="50%" prop="ScoreInfo.Total.p[2]">
      </el-table-column>
    </el-table>
  </section>
</template>

<script>
export default {
  props: ['snapshot', 'simuResult'],
  methods: {
    mtldImgUrl: id => `https://mltd.matsurihi.me/cards/${id}`
  }
}
</script>

<style scoped>
.el-table {
  max-width: 800px;
  width: 100%;
}
</style>
