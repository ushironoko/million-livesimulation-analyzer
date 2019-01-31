<template>
  <el-card
    v-loading="isLiveSimulationLoading"
  >
    <el-tabs tab-position="left">
      <el-tab-pane label="結果">
        <div>
          <span>結果</span>
        </div>
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
      <el-tab-pane label="編成">
        <div>
          <span>編成
          </span>
        </div>
        <el-table :data="selectedCardList" target-order="push" max-height="960">
          <el-table-column label="カード">
              <template slot-scope="scope">
                <a :href="createImgUrl(scope.row.id)" target="_blunk"><img :src="scope.row.resourceId" style="max-width: 100px; width: 100%;"/></a>
              </template>
          </el-table-column>
          <el-table-column label="ボーカル値">
              <template slot-scope="scope">
                <span>{{ scope.row.vocalMaxAwakened }}<br>{{ "(" + `${scope.row.vocalMaxAwakened + scope.row.vocalMasterBonus}` + ")" }}</span>
              </template>
          </el-table-column>
          <el-table-column label="ビジュアル値">
              <template slot-scope="scope">
                <span>{{ scope.row.visualMaxAwakened }}<br>{{ "(" + `${scope.row.visualMaxAwakened + scope.row.visualMasterBonus}` + ")" }}</span>
              </template>
          </el-table-column>
          <el-table-column label="ダンス値">
              <template slot-scope="scope">
                <span>{{ scope.row.danceMaxAwakened }}<br>{{ "(" + `${scope.row.danceMaxAwakened + scope.row.danceMasterBonus}` + ")" }}</span>
              </template>
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
  },
  methods: {
    createImgUrl(id) {
      return `https://mltd.matsurihi.me/cards/${id}`
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
