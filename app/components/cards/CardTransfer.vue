<template>
  <section>
    <el-transfer
      style="text-align: left; display: inline-block"
      v-loading="loading"
      target-order="push"
      class="transfer"
      filterable
      v-model="selection"
      :props="{
        key:'name',
        label:'カード名'
      }"
      :titles="['カード一覧','編成']"
      :data="cardData.filter(data => data.name.toLowerCase())"
      @change="transferChange"
      >
      <div slot="right-footer">
        <el-button class="transfer-footer" style="margin: 5px 0 0 5px;" size="mini" @click="simuResultData">計算</el-button>
        <el-button class="transfer-footer" size="mini" @click="openSaveTeamModal">保存</el-button>
        <el-button class="transfer-footer" size="mini" @click="openCallTeamModal">呼出</el-button>
        <el-input class="transfer-footer" size="mini" style="max-width: 80px; margin-left: 10px;" placeholder="総アピール" v-model="appealValue"></el-input>
      </div>
    </el-transfer>

    <el-dialog title="Shipping address" :visible.sync="callTeamDialog">
      <span slot="footer" class="dialog-footer">
        <el-button @click="callTeamDialog = false">キャンセル</el-button>
        <el-button type="primary" @click="callTeam">決定</el-button>
      </span>
    </el-dialog>

  </section>
</template>

<script>
import { mapGetters } from 'vuex'
const emitData = []

export default {
  props: ['cardData'],
  data() {
    return {
      selection: [],
      loading: true,
      appealValue: 350000,
      callTeamDialog: false
    }
  },
  computed: {
    filteredList() {
      const filteredList = this.cardData.filter(data => {
        return this.selection.includes(data.name)
      })

      return filteredList
    },
    ...mapGetters(['selectedMusic', 'selectedCardList', 'liveSimulationData'])
  },
  methods: {
    transferChange() {
      this.emitData = this.filteredList
      this.$nuxt.$emit('SELECTED_CARD_LIST', this.emitData)
    },
    openSaveTeamModal() {
      this.$prompt(
        `編成名を決めてください。編成とアピール値を保存します。`,
        '編成保存',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'キャンセル',
          inputErrorMessage: '登録できません'
        }
      )
        .then(({ value }) => {
          this.saveTeam(value)

          this.$message({
            type: 'success',
            message: `チーム名:${value}で登録しました`
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: 'キャンセルしました'
          })
        })
    },
    saveTeam(key) {
      const setValue = {
        team: this.selection,
        appealValue: this.appealValue
      }
      //保存処理
    },
    openCallTeamModal() {
      this.callTeamDialog = true
    },
    callTeam() {
      //呼び出し処理
      const calledTeam = localStorage.getItem('xxx')

      try {
        const parse = calledTeam.team.split(',')
        this.selection = parse

        const appealValue = calledTeam.appealValue
        this.appealValue = appealValue

        this.transferChange()
      } catch {
        this.callTeamDialog = false
        this.$notify.error({
          title: '失敗',
          message: `チームが見つかりませんでした`,
          position: 'top-right',
          duration: '3000'
        })
      }
      this.callTeamDialog = false
    },
    async simuResultData() {
      if (
        this.selectedCardList.length != 0 &&
        this.selectedMusic.length != 0 &&
        this.appealValue.length != 0
      ) {
        const music = this.selectedMusic
        const team = this.selectedCardList

        const SongId = music[0].SongId
        const Course = 4
        const AppealValue = this.appealValue
        const Unitlds = team.map(x => {
          return x.id
        })
        const GuestId = team[0].id
        const SkillLvs = [10, 10, 10, 10, 10]
        const TryNumber = 10000
        const Prob = [0.1, 1, 50]
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

        await this.$store
          .dispatch('fetchLiveSimulationData', requestParams)
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
        this.$notify.error({
          title: '失敗',
          message: '曲、編成が不完全かアピール値が不正です',
          position: 'top-right',
          duration: '3000'
        })
      }
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
  margin-top: 30px;
}
</style>
