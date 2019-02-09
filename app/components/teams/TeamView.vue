<template>
  <section>
    <simu-data-settings
      @princessEmit="setPrincess"
      @fairyEmit="setFairy"
      @angleEmit="setAngle"
      @filterWordEmit="setFilterWord"
    />

    <team-edit
      :cardDataList="cloneSsrCardData"
      :selectedSong="selectedSong"
      :liveSimulationData="liveSimulationData"
      :syncTeamData="syncTeamData"
      :isLiveSimulationLoading="isLiveSimulationLoading"
      :typeFilter="typeFilter"
      :filterWord="filterWord"
      @simuStartEmit="startSimu"
    />
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import TeamEdit from '~/components/teams/TeamEdit.vue'
import SimuDataSettings from '~/components/settings/SimuDataSettings.vue'
import cloneDeep from 'lodash/cloneDeep'

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
    cloneSsrCardData() {
      return cloneDeep(this.ssrCardData)
    },
    ...mapGetters([
      'ssrCardData',
      'selectedSong',
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
    async startSimu(requestParams, team) {
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
    setPrincess(val) {
      this.typeFilter.isPrincess = val
    },
    setFairy(val) {
      this.typeFilter.isFairy = val
    },
    setAngle(val) {
      this.typeFilter.isAngel = val
    },
    setFilterWord(val) {
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
