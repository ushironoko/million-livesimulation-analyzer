<template>
  <section>
    <el-card style="height: 500px; overflow: auto;">
      <el-row>
        <el-col style="width: 20%;" :span="2" v-for="(data, i) in transferDataFilter" :key="i">
          <img :src="data.resourceId" style="width: 100%;" @click="removeOrAddSelectionItem(data.name)">
        </el-col>
      </el-row>
    </el-card>

    <el-card id="select-team">
      <div slot="header">選択チーム</div>
      <el-container style="display: flex; justify-content: center; align-items: flex-start;">
        <span>
          <el-badge value="4" class="item" type="primary" style="margin: 0 0 0 5px;">
            <img v-if="filteredList[3]" :src="filteredList[3].resourceId" @click="removeOrAddSelectionItem(filteredList[3].name)">
          </el-badge>
        </span>
        <span>
          <el-badge value="2" class="item" type="primary" style="margin: 0 0 0 5px;">
            <img v-if="filteredList[1]" :src="filteredList[1].resourceId" @click="removeOrAddSelectionItem(filteredList[1].name)">
          </el-badge>
        </span>
        <span>
          <el-badge value="C/F" class="item" type="primary" style="margin: 0 0 0 5px; z-index:1;">
            <img v-if="filteredList[0]" :src="filteredList[0].resourceId" style="border:solid 2px #9eceff; border-radius: 0.5em;"
            @click="removeOrAddSelectionItem(filteredList[0].name)">
          </el-badge>
        </span>
        <span>
          <el-badge value="3" class="item" type="primary" style="margin: 0 0 0 5px;">
            <img v-if="filteredList[2]" :src="filteredList[2].resourceId" @click="removeOrAddSelectionItem(filteredList[2].name)">
          </el-badge>
        </span>
        <span>
          <el-badge value="5" class="item" type="primary" style="margin: 0 0 0 5px;">
            <img v-if="filteredList[4]" :src="filteredList[4].resourceId" @click="removeOrAddSelectionItem(filteredList[4].name)">
          </el-badge>
        </span>
      </el-container>
    </el-card>

    <el-card>
      <el-button :disabled="isCalc" :loading="isLiveSimulationLoading" type="primary" style="margin: 5px 0 0 15px;" size="mini" @click="simuStartEmit">計算</el-button>
      <el-button size="mini" @click="openSaveTeamModal" style="margin: 0 0 0 6px;">保存</el-button>
      <el-badge :value="syncTeamData.length" class="item" type="primary" style="margin: 0 0 0 5px;">
        <el-button size="mini" @click="openCallTeamModal">呼出</el-button>
      </el-badge>
      <el-input size="mini" style="max-width: 100px; margin-left: 5px;" placeholder="総アピ値" v-model="appealValue"></el-input>
    </el-card>

    <el-dialog title="チームを選んで下さい" :visible.sync="callTeamDialog">
      <el-table
        :data="syncTeamData"
        max-height="560"
        style="max-width: 800px; width: 100%;"
        highlight-current-row
        @current-change="handleCurrentChange"
      >
        <el-table-column label="編成名" prop="key" width="100">
        </el-table-column>
        <el-table-column label="カード" width="250">
          <template slot-scope="scope">
            <el-container>
              <span>
                <img v-if="scope.row.team[3]" :src="mtldImgUrl(scope.row.team[3])" style="max-width: 40px;"/>
              </span>
              <span>
                <img v-if="scope.row.team[1]" :src="mtldImgUrl(scope.row.team[1])" style="max-width: 40px;"/>
              </span>
              <span>
                <img v-if="scope.row.team[0]" :src="mtldImgUrl(scope.row.team[0])" style="max-width: 40px;"/>
              </span>
              <span>
                <img v-if="scope.row.team[2]" :src="mtldImgUrl(scope.row.team[2])" style="max-width: 40px;"/>
              </span>
              <span>
                <img v-if="scope.row.team[4]" :src="mtldImgUrl(scope.row.team[4])" style="max-width: 40px;"/>
              </span>
            </el-container>
          </template>
        </el-table-column>
        <el-table-column label="総アピール" prop="appealValue">
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="deleteTeam">削除</el-button>
        <el-button type="primary" @click="callTeam">決定</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'

export default {
  props: {
    cardDataList: {
      type: Array
    },
    selectedSong: {
      type: Array
    },
    syncTeamData: {
      type: Array
    },
    isLiveSimulationLoading: {
      type: Boolean
    },
    typeFilter: {
      type: Object
    },
    filterWord: {
      type: String
    }
  },
  data() {
    return {
      selection: [],
      loading: true,
      appealValue: 0,
      callTeamDialog: false,
      currentRow: null
    }
  },
  computed: {
    /**
     * 選択した編成のpayloadをストアデータから切り出して取得するメソッド
     */
    filteredList() {
      return this.selection.map(data =>
        this.cardDataList.find(x => data === x.name)
      )
    },

    /**
     * 親から受け取ったワードと属性フラグで表示カードをフィルタするメソッド
     */
    transferDataFilter() {
      const filterWord = this.filterWord
      let data = this.cardDataList.filter(
        x => x.name.toLowerCase().indexOf(filterWord.toLowerCase()) > -1
      )
      data = this.typeFilter.isBNP
        ? data
        : data.filter(data => data.name.indexOf('BRAND') === -1)

      data = this.typeFilter.isPrincess
        ? data
        : data.filter(data => data.idolType !== 1)
      data = this.typeFilter.isFairy
        ? data
        : data.filter(data => data.idolType !== 2)
      data = this.typeFilter.isAngel
        ? data
        : data.filter(data => data.idolType !== 3)
      return data
    },

    /**
     * シミュレーション可能状態かどうか判定するメソッド
     */
    isCalc() {
      const isCalc =
        this.filteredList.length === 5 &&
        this.selectedSong.length !== 0 &&
        this.appealValue.length !== 0 &&
        this.appealValue > 0
          ? false
          : true

      return isCalc
    }
  },
  methods: {
    /**
     * 選択したカードアイコンをselectionに入れるメソッド
     */
    removeOrAddSelectionItem(name) {
      if (this.selection.includes(name)) {
        this.selection.splice(this.selection.findIndex(x => x === name), 1)
      } else {
        this.selection.length === 5
          ? this.$message({
              type: 'warning',
              message: '5枚以上選べません'
            })
          : this.selection.push(name)
      }
    },
    /**
     * 保存中のチームアイコンを全て取り出すメソッド
     */
    mtldImgUrl(payload) {
      const data = this.cardDataList.find(x => x.name === payload)
      return data.resourceId
    },

    /**
     * 選択中の保存チームを保持するクリックイベント
     */
    handleCurrentChange(val) {
      this.currentRow = val
    },

    /**
     * 現在のチームと総アピール値をストアへ保存するためのメッセージプロンプト
     */
    openSaveTeamModal() {
      this.$prompt(`編成名を決めてください`, '編成保存', {
        confirmButtonText: 'OK',
        cancelButtonText: 'キャンセル',
        inputErrorMessage: '登録できません'
      })
        .then(({ value }) => {
          if (value) {
            this.saveTeam(value)
          } else {
            throw new Error('ひえええ')
          }
          this.$message({
            type: 'success',
            message: `${value} を登録しました`
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: 'キャンセルしました'
          })
        })
    },

    /**
     * 保存中チーム一覧のダイアログを開くメソッド
     */
    openCallTeamModal() {
      this.callTeamDialog = true
    },

    /**
     *　openSaveTeamModalから呼び出されるチーム保存メソッド
     */
    saveTeam(key) {
      const setValue = {
        key: key,
        team: this.selection,
        appealValue: this.appealValue
      }
      this.$store.commit('setSyncTeamData', setValue)
    },

    /**
     *  選択した保存中チームをセットするメソッド
     */
    callTeam() {
      const calledTeam = cloneDeep(this.currentRow)
      try {
        this.selection = calledTeam.team
        const appealValue = calledTeam.appealValue
        this.appealValue = appealValue

        this.$notify.success({
          title: '成功',
          message: `チームをセットしました`,
          position: 'top-right',
          duration: '3000'
        })
      } catch {
        this.$notify.error({
          title: '失敗',
          message: `チームが見つかりませんでした`,
          position: 'top-right',
          duration: '3000'
        })
      }
      this.callTeamDialog = false
    },

    /**
     * 選択した保存中チームを削除するメソッド
     */
    deleteTeam() {
      this.$confirm('ほんとうに？', {
        confirmButtonText: '消す',
        cancelButtonText: 'やめとく',
        type: 'warning'
      })
        .then(() => {
          this.$store.commit('deleteSyncTeamData', this.currentRow)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: 'キャンセルしました'
          })
        })
    },

    /**
     * シミュ用データを作って親へ渡すEmitter
     */
    simuStartEmit() {
      const song = this.selectedSong
      const team = this.filteredList

      const requestParams = {
        SongId: song[0].SongId,
        Course: 4,
        AppealValue: this.appealValue,
        UnitIds: team.map(x => x.id),
        GuestId: team[0].id,
        TryNumber: 10000,
        p: [0.1, 1, 50]
      }
      this.$emit('simuStartEmit', requestParams, team)
    }
  },
  mounted() {
    setTimeout(() => {
      this.loading = !this.loading
    }, 1500)
  }
}
</script>

<style scoped>
.transfer {
  margin-top: 10px;
}

#select-team .el-badge > img {
  max-width: 100px;
  width: 100%;
}
</style>
