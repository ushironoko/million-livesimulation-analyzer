<template>
  <section>
    <el-card class="icons">
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
        <span v-for="i in teamMapping" :key="i" class="selected-icon">
          <el-badge :value="i === 0 ? 'C/F' : i" type="primary" :class='{"z-index-top": i === 0}'>
            <img
              v-if="filteredList[i]"
              :src="filteredList[i].resourceId"
              @click.prevent="removeOrAddSelectionItem(filteredList[i].name)"
              :class='{
              "score-bonus-border": skillBorder && filteredList[i].skill[0].effectId === 1,
              "combo-bonus-border": skillBorder && filteredList[i].skill[0].effectId === 2,
              "double-boost-border": skillBorder && filteredList[i].skill[0].effectId === 7,
            }'
            />
            <img
              v-show="!filteredList[i]"
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
        max-height="400"
        highlight-current-row
        @current-change="handleCurrentChange"
      >
        <el-table-column label="編成名" prop="key" width="100">
        </el-table-column>
        <el-table-column label="カード" width="250">
          <template v-slot="scope">
            <el-container class="modal-container">
              <span v-for="i in teamMapping" :key="i">
                <img
                  v-if="scope.row.team[i]"
                  :src="mtldImgUrl(scope.row.team[i])"
                />
              </span>
            </el-container>
          </template>
        </el-table-column>
        <el-table-column label="総アピール" prop="appealValue">
        </el-table-column>
      </el-table>
      <template #footer class="dialog-footer">
        <el-button type="danger" @click="deleteTeam">削除</el-button>
        <el-button type="primary" @click="callTeam">決定</el-button>
      </template>
    </el-dialog>
  </section>
</template>

<script>
import teamMapping from '@/utils/teamMapping.js'
import cloneDeep from 'lodash.clonedeep'

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
      appealValue: 0,
      callTeamDialog: false,
      currentRow: null,
      isSelected: false,
      teamMapping: teamMapping
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
  }
}
</script>

<style scoped>
.icons {
  height: 400px;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}

.z-index-top {
  z-index: 1;
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

.modal-container > span > img {
  max-width: 40px;
}
</style>
