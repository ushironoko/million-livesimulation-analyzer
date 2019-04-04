<template>
  <section>
    <el-card style="height: 400px; overflow: auto;">
      <el-row>
        <el-col
          style="width: 20%;"
          :span="2"
          v-for="(data, i) in cardFilter"
          :key="i"
        >
          <img
            :src="data.resourceId"
            style="width: 100%;"
            @click.prevent="removeOrAddSelectionItem(data.name)"
            :alt="data.name"
            :title="data.name"
            :class='{
              "score-bonus-border": skillBorder && data.skill[0].effectId === 1,
              "combo-bonus-border": skillBorder && data.skill[0].effectId === 2,
              "double-boost-border": skillBorder && data.skill[0].effectId === 7,
            }'
          />
        </el-col>
      </el-row>
    </el-card>

    <el-card id="select-team">
      <el-container
        style="display: flex; justify-content: center; align-items: flex-start;"
      >
        <span class="selected-icon">
          <el-badge value="4" type="primary">
            <img
              v-if="filteredList[3]"
              :src="filteredList[3].resourceId"
              @click.prevent="removeOrAddSelectionItem(filteredList[3].name)"
              :class='{
              "score-bonus-border": skillBorder && filteredList[3].skill[0].effectId === 1,
              "combo-bonus-border": skillBorder && filteredList[3].skill[0].effectId === 2,
              "double-boost-border": skillBorder && filteredList[3].skill[0].effectId === 7,
            }'
            />
            <img
              v-show="!filteredList[3]"
              src="~/static/noSelectedIcon.png"
              class="no-selected-icon"
            />
          </el-badge>
        </span>
        <span class="selected-icon">
          <el-badge value="2" type="primary">
            <img
              v-if="filteredList[1]"
              :src="filteredList[1].resourceId"
              @click.prevent="removeOrAddSelectionItem(filteredList[1].name)"
              :class='{
              "score-bonus-border": skillBorder && filteredList[1].skill[0].effectId === 1,
              "combo-bonus-border": skillBorder && filteredList[1].skill[0].effectId === 2,
              "double-boost-border": skillBorder && filteredList[1].skill[0].effectId === 7,
            }'
            />
            <img
              v-show="!filteredList[1]"
              src="~/static/noSelectedIcon.png"
              class="no-selected-icon"
            />
          </el-badge>
        </span>
        <span class="selected-icon">
          <el-badge value="C/F" type="primary" style="z-index: 1;">
            <img
              v-if="filteredList[0]"
              :src="filteredList[0].resourceId"
              @click.prevent="removeOrAddSelectionItem(filteredList[0].name)"
              :class='{
              "score-bonus-border": skillBorder && filteredList[0].skill[0].effectId === 1,
              "combo-bonus-border": skillBorder && filteredList[0].skill[0].effectId === 2,
              "double-boost-border": skillBorder && filteredList[0].skill[0].effectId === 7,
            }'
            />
            <img
              v-show="!filteredList[0]"
              src="~/static/noSelectedIcon.png"
              class="no-selected-icon"
            />
          </el-badge>
        </span>
        <span class="selected-icon">
          <el-badge value="3" type="primary">
            <img
              v-if="filteredList[2]"
              :src="filteredList[2].resourceId"
              @click.prevent="removeOrAddSelectionItem(filteredList[2].name)"
              :class='{
              "score-bonus-border": skillBorder && filteredList[2].skill[0].effectId === 1,
              "combo-bonus-border": skillBorder && filteredList[2].skill[0].effectId === 2,
              "double-boost-border": skillBorder && filteredList[2].skill[0].effectId === 7,
            }'
            />
            <img
              v-show="!filteredList[2]"
              src="~/static/noSelectedIcon.png"
              class="no-selected-icon"
            />
          </el-badge>
        </span>
        <span class="selected-icon">
          <el-badge value="5" type="primary">
            <img
              v-if="filteredList[4]"
              :src="filteredList[4].resourceId"
              @click.prevent="removeOrAddSelectionItem(filteredList[4].name)"
              :class='{
              "score-bonus-border": skillBorder && filteredList[4].skill[0].effectId === 1,
              "combo-bonus-border": skillBorder && filteredList[4].skill[0].effectId === 2,
              "double-boost-border": skillBorder && filteredList[4].skill[0].effectId === 7,
            }'
            />
            <img
              v-show="!filteredList[4]"
              src="~/static/noSelectedIcon.png"
              class="no-selected-icon"
            />
          </el-badge>
        </span>
      </el-container>
    </el-card>

    <el-card>
      <el-button
        :disabled="isCalc"
        :loading="isLiveSimulationLoading"
        type="primary"
        style="margin: 5px 0 0 15px;"
        size="mini"
        @click="simuStartEmit"
        >計算</el-button
      >
      <el-button
        size="mini"
        @click="openSaveTeamModal"
        style="margin: 0 0 0 6px;"
        >保存</el-button
      >
      <el-badge
        :value="syncTeamData.length"
        class="item"
        type="primary"
        style="margin: 0 0 0 5px;"
      >
        <el-button size="mini" @click="openCallTeamModal">呼出</el-button>
      </el-badge>
      <el-input
        type="number"
        size="mini"
        style="max-width: 100px; margin-left: 5px;"
        placeholder="総アピ値"
        v-model="appealValue"
      ></el-input>
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
          <template v-slot="scope">
            <el-container>
              <span>
                <img
                  v-if="scope.row.team[3]"
                  :src="mtldImgUrl(scope.row.team[3])"
                  style="max-width: 40px;"
                />
              </span>
              <span>
                <img
                  v-if="scope.row.team[1]"
                  :src="mtldImgUrl(scope.row.team[1])"
                  style="max-width: 40px;"
                />
              </span>
              <span>
                <img
                  v-if="scope.row.team[0]"
                  :src="mtldImgUrl(scope.row.team[0])"
                  style="max-width: 40px;"
                />
              </span>
              <span>
                <img
                  v-if="scope.row.team[2]"
                  :src="mtldImgUrl(scope.row.team[2])"
                  style="max-width: 40px;"
                />
              </span>
              <span>
                <img
                  v-if="scope.row.team[4]"
                  :src="mtldImgUrl(scope.row.team[4])"
                  style="max-width: 40px;"
                />
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
    },
    sortValue: {
      type: String
    },
    skillBorder: {
      type: Boolean
    }
  },
  data() {
    return {
      selection: [],
      loading: true,
      appealValue: 0,
      callTeamDialog: false,
      currentRow: null,
      isSelected: false
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
    cardFilter() {
      let data = this.cardDataList

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

      data = data.filter(
        x => x.name.toLowerCase().indexOf(this.filterWord.toLowerCase()) > -1
      )

      switch (this.sortValue) {
        case 'Vo':
          data.sort((a, b) => b.vocalMaxAwakened - a.vocalMaxAwakened)
          break
        case 'Da':
          data.sort((a, b) => b.danceMaxAwakened - a.danceMaxAwakened)
          break
        case 'Vi':
          data.sort((a, b) => b.visualMaxAwakened - a.visualMaxAwakened)
          break
        default:
          data.sort((a, b) => a.idolId - b.idolId)
      }

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
        this.isSelected = !this.isSelected
      } else {
        this.selection.length === 5
          ? this.$message({
              type: 'warning',
              message: '5枚以上選べません'
            })
          : this.selection.push(name)
        this.isSelected = !this.isSelected
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
      const team = cloneDeep(this.selection)
      const setValue = {
        key: key,
        team: team,
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
        this.selection = cloneDeep(calledTeam.team)
        const appealValue = calledTeam.appealValue
        this.appealValue = appealValue

        this.$notify.success({
          title: '成功',
          message: `チームをセットしました`,
          position: 'top-right',
          duration: '1500'
        })
      } catch {
        this.$notify.error({
          title: '失敗',
          message: `チームが見つかりませんでした`,
          position: 'top-right',
          duration: '1500'
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
        AppealValue: +this.appealValue,
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

.selected-icon {
  margin: 5px;
}

.no-selected-icon {
  border-radius: 0.5em;
  opacity: 0.5;
}
</style>
