<template>
  <section>
    <simu-data-settings
      @princessEmit="princessEmit"
      @fairyEmit="fairyEmit"
      @angleEmit="angleEmit"
      @filterWordEmit="filterWordEmit"
    />

    <team-edit
      :cardData="ssrCardData"
      :selectedSong="selectedSong"
      :selectedCardList="selectedCardList"
      :liveSimulationData="liveSimulationData"
      :syncTeamData="syncTeamData"
      :isLiveSimulationLoading="isLiveSimulationLoading"
      :typeFilter="typeFilter"
      :filterWord="filterWord"
      @transferChangeEmit="transferChangeEmit"
      @simuStart="simuStart"
    />
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import TeamEdit from '~/components/teams/TeamEdit.vue'
import SimuDataSettings from '~/components/settings/SimuDataSettings.vue'

export default {
  data() {
    return {
      typeFilter: {
        isPrincess: true,
        isFairy: true,
        isAngel: true
      },
      filterWord: ''
    }
  },
  computed: {
    ...mapGetters([
      'ssrCardData',
      'selectedSong',
      'selectedCardList',
      'liveSimulationData',
      'syncTeamData',
      'isLiveSimulationLoading'
    ])
  },
  async created() {
    await this.$store
      .dispatch('fetchSsrCard')
      .then(() => {
        this.$notify.success({
          title: '成功',
          message: 'SSRカード情報を更新しました',
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
  },
  methods: {
    transferChangeEmit(val) {
      this.$store.commit('setSelectedCardList', val)
    },
    async simuStart(requestParams, team) {
      await this.$store
        .dispatch('fetchLiveSimulationData', requestParams)
        .then(() => {
          this.$notify.success({
            title: '成功',
            message: 'ライブシミュレートを更新しました',
            position: 'top-right',
            duration: '1000'
          })
          this.$emit('snapshotEmit', team)
        })
        .catch(err => {
          this.$notify.error({
            title: '失敗',
            message: `${err}`,
            position: 'top-right',
            duration: '1000'
          })
        })
    },
    princessEmit(val) {
      this.typeFilter.isPrincess = val
    },
    fairyEmit(val) {
      this.typeFilter.isFairy = val
    },
    angleEmit(val) {
      this.typeFilter.isAngel = val
    },
    filterWordEmit(val) {
      this.filterWord = val
    }
  },
  components: {
    TeamEdit,
    SimuDataSettings
  }
}
</script>

<style scoped>
.switch {
  margin-top: 15px;
}
</style>
