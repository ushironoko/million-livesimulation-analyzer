<template>
  <el-card
    v-loading="isLiveSimulationLoading"
  >
    <el-tabs tab-position="left">
      <el-tab-pane label="結果">
        <div>
          <span>スコア</span>
        </div>
        <el-table :data="liveSimulationData" max-height="960" style="max-width: 800px;">
          <el-table-column label="最大スコア" prop="ScoreInfo.Total.Ideal">
          </el-table-column>
          <el-table-column label="最小スコア" prop="ScoreInfo.Total.Min">
          </el-table-column>
          <el-table-column label="0.1%" prop="ScoreInfo.Total.p[0]">
          </el-table-column>
          <el-table-column label="1%" prop="ScoreInfo.Total.p[1]">
          </el-table-column>
          <el-table-column label="50%" prop="ScoreInfo.Total.p[2]">
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="編成">
        <div>
          <span>編成</span>
        </div>
        <el-table :data="selectedCardList" max-height="960" style="max-width: 800px;">
          <el-table-column label="カード">
              <template slot-scope="scope">
                <img :src="scope.row.resourceId" style="max-width: 100px;"/>
              </template>
          </el-table-column>
          <el-table-column label="インターバル" prop="skill[0].interval">
          </el-table-column>
          <el-table-column label="スキル秒数" prop="skill[0].duration">
          </el-table-column>
          <el-table-column label="効果量" prop="skill[0].value">
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'selectedCardList',
      'liveSimulationData',
      'isLiveSimulationLoading'
    ])
  }
}
</script>
