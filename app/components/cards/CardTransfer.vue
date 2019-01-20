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
        <el-button class="transfer-footer" style="margin: 5px 0 0 5px;" size="mini" @click="simuResultData">計算開始</el-button>
        <el-button class="transfer-footer" size="mini" @click="saveTeam">編成保存</el-button>
        <el-button class="transfer-footer" size="mini" @click="callTeam">編成呼出</el-button>
        <el-input class="transfer-footer" size="mini" style="max-width: 80px; margin-left: 5px;" placeholder="総アピール" v-model="appealValue"></el-input>
      </div>
    </el-transfer>
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
      appealValue: 360000
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
    saveTeam(){
      localStorage.setItem(this.appealValue.toString(), this.selection)
      this.$notify.success({
              title: '成功',
              message: 'アピール値で編成を保存しました',
              position: 'top-right',
              duration: '3000'
            })
    },
    callTeam(){
      const calledTeam = localStorage.getItem(this.appealValue.toString())
      if(calledTeam != null) {
        const parse = calledTeam.split(',')
        this.selection = parse
        this.transferChange()
      } else {
        this.$notify.error({
          title: '失敗',
          message: `アピール値に対応する編成がありません`,
          position: 'top-right',
          duration: '3000'
        })
      }
    },
    async simuResultData() {
      if (this.selectedCardList.length != 0 && this.selectedMusic.length != 0 && this.appealValue.length != 0) {
        const music = this.selectedMusic
        const team = this.selectedCardList

        const SongId = music[0].SongId
        const Course = 4
        const AppealValue = this.appealValue
        const Unitlds = team.map(x => {
          return x.id
        })
        const GuestId = team[0].id
        const SkillLvs = [7, 7, 7, 7, 7]
        const TryNumber = 100
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

        await this.$store
          .dispatch('fetchLiveSimulationData',requestParams)
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
