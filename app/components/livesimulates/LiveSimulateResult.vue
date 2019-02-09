<template>
  <el-card
    v-loading="isLiveSimulationLoading"
  >
    <el-tabs tab-position="left">
      <el-tab-pane>
        <span slot="label"><i class="el-icon-document"></i></span>
        <div>
          <span>ライブレポート</span>
        </div>

        <el-container>
          <span v-for="(payload, i) in snapshot" :key="i">
            <a :href="mtldImgUrl(payload.id)" target="_blunk" rel="noopener"><img :src="payload.resourceId" style="max-width: 100px; width: 100%;"/></a>
          </span>
        </el-container>

        <el-table :data="liveSimulationData" max-height="960">
          <el-table-column label="最大" prop="ScoreInfo.Total.Ideal">
          </el-table-column>
          <el-table-column label="0.1%" prop="ScoreInfo.Total.p[0]">
          </el-table-column>
          <el-table-column label="1%" prop="ScoreInfo.Total.p[1]">
          </el-table-column>
          <el-table-column label="50%" prop="ScoreInfo.Total.p[2]">
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { createMtldImgUrl } from '~/utils/CreateUrl.js'

export default {
  props:['snapshot'],
  computed: {
    ...mapGetters([
      'liveSimulationData',
      'isLiveSimulationLoading'
    ])
  },
  methods: {
    mtldImgUrl(id) {
      return createMtldImgUrl(id)
    }
  }
}
</script>

<style scoped>
.el-table {
  max-width: 800px;
  width: 100%;
}
</style>
