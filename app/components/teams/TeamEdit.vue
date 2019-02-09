<template>
  <section>
    <el-transfer
      style="text-align: left; display: inline-block"
      v-loading="loading"
      target-order="push"
      class="transfer"
      v-model="selection"
      :props="{
        key:'name',
        label:'カード名'
      }"
      :titles="['カード一覧','編成']"
      :button-texts="['OUT', 'IN']"
      :data="transferDataFilter"
      @change="transferChangeEmit"
      >

      <div slot="right-footer">
        <el-button class="transfer-footer" :disabled="isCalc" :loading="isLiveSimulationLoading" type="primary" style="margin: 5px 0 0 15px;" size="mini" @click="simuStartEmit">計算</el-button>
        <el-button class="transfer-footer" size="mini" @click="openSaveTeamModal" style="margin: 0 0 0 6px;">保存</el-button>
        <el-badge :value="syncTeamData.length" class="item" type="primary" style="margin: 0 0 0 5px;">
          <el-button class="transfer-footer" size="mini" @click="openCallTeamModal">呼出</el-button>
        </el-badge>
        <el-input class="transfer-footer" size="mini" style="max-width: 80px; margin-left: 5px;" placeholder="総アピール" v-model="appealValue"></el-input>
      </div>
    </el-transfer>

    <el-dialog title="チームを選んで下さい" :visible.sync="callTeamDialog">
      <el-table
        :data="syncTeamData"
        max-height="560"
        style="max-width: 800px;"
        highlight-current-row
        @current-change="handleCurrentChange"
      >
        <el-table-column label="編成名" prop="key">
        </el-table-column>
        <el-table-column label="カード">
          <template slot-scope="scope">
            <span v-for="(payload, i) in scope.row.team" :key="payload">
              <img v-if="i === 0" :src="syncImgUrl(payload)" style="max-width: 40px; border:solid 2px #9eceff; border-radius: 0.5em;"/>
              <img v-else :src="syncImgUrl(payload)" style="max-width: 40px;"/>
            </span>
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
import { mapGetters } from 'vuex'
import cloneDeep from 'lodash/cloneDeep'

export default {
  props: {
    cardData: {
      type: Array
    },
    selectedSong: {
      type: Array
    },
    selectedCardList: {
      type: Array
    },
    liveSimulationData: {
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
      const filteredList = this.cardData.filter(data => {
        return this.selection.includes(data.name)
      })

      return filteredList
    },

    /**
     * シミュレーション可能状態かどうか判定するメソッド
     */
    isCalc() {
      const isCalc =
        this.selectedCardList.length === 5 &&
        this.selectedSong.length != 0 &&
        this.appealValue.length != 0
          ? false
          : true

      return isCalc
    },

    /**
     * 親から受け取ったワードと属性フラグで表示カードをフィルタするメソッド
     */
    transferDataFilter() {
      const filterWord = this.filterWord
      let data = this.cardData.filter(
        x => x.name.toLowerCase().indexOf(filterWord.toLowerCase()) > -1
      )

      data = this.typeFilter.isPrincess
        ? data
        : data.filter(data => data.idolType != 1)
      data = this.typeFilter.isFairy
        ? data
        : data.filter(data => data.idolType != 2)
      data = this.typeFilter.isAngel
        ? data
        : data.filter(data => data.idolType != 3)
      return data
    }
  },
  methods: {
    /**
     * 保存中のチームアイコンを全て取り出すメソッド
     */
    syncImgUrl(payload) {
      const data = this.cardData.find(x => x.name === payload)
      return data.resourceId
    },

    /**
     * 編成にカード情報を移した時に親へ編成情報を渡すEmitter
     */
    transferChangeEmit() {
      const payload = cloneDeep(this.filteredList)
      this.$emit('transferChangeEmit', payload)
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
      const calledTeam = this.currentRow
      try {
        this.selection = calledTeam.team
        const appealValue = calledTeam.appealValue
        this.appealValue = appealValue

        this.transferChangeEmit()
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
      const team = cloneDeep(this.selectedCardList)

      const requestParams = {
        SongId: song[0].SongId,
        Course: 4,
        AppealValue: this.appealValue,
        UnitIds: team.map(x => x.id),
        GuestId: team[0].id,
        TryNumber: 10000,
        p: [0.1, 1, 50]
      }
      this.$emit('simuStart', requestParams, team)
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
</style>
