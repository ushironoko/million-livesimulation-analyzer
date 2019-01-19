<template>
  <el-card>
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
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="編成">
        <div>
          <span>編成</span>
        </div>
        <el-table :data="selectedCardList" max-height="960" style="max-width: 800px;">
          <el-table-column label="カード">
              <template slot-scope="scope">
                <img :src="scope.row.resourceId" style="max-width: 150px;"/>
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
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      loading: false
    }
  },
  computed: {
    async simuResultData() {
      if (this.selectedCardList.length != 0 && this.selectedMusic.length != 0) {
        const music = this.selectedMusic
        const team = this.selectedCardList

        const SongId = music[0].SongId
        const Course = 4
        const AppealValue = 30000
        const Unitlds = team.map(x => {
          return x.id
        })
        const GuestId = team[0].id
        const SkillLvs = [7, 7, 7, 7, 7]
        const TryNumber = 10
        const Prob = [1, 50]
        const Minimize = false

        const requestParams = {
          SongId: SongId,
          Course: Course,
          AppealValue: AppealValue,
          UnitIds: Unitlds,
          GuestId: GuestId,
          SkillLvs: SkillLvs,
          TryNumber: TryNumber,
          p: Prob,
          Minimize: Minimize
        }

        await this.fetchLiveSimulationData(requestParams)
          .then(() => {
            this.$notify.success({
              title: '成功',
              message: 'ライブシミュレートを更新しました',
              position: 'top-right',
              duration: '3000'
            })
          })
          .catch(err => {
            this.$notify.error({
              title: '失敗',
              message: `${err}`,
              position: 'top-right',
              duration: '3000'
            })
          })
      } else {
        return []
      }
    },
    ...mapGetters(['selectedMusic', 'selectedCardList', 'liveSimulationData']),
  },
  methods: {
    ...mapActions(['fetchLiveSimulationData'])
  }
}
</script>
