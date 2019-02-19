<template>
  <section>
    <simu-data-settings
      @princessEmit="setPrincess"
      @fairyEmit="setFairy"
      @angleEmit="setAngle"
      @bnpEmit="setBNP"
      @filterWordEmit="setFilterWord"
    />

    <team-edit
      :cardDataList="cloneSsrCardData"
      :selectedSong="selectedSong"
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
import SimuDataSettings from '~/components/teams/settings/SimuDataSettings.vue'
import cloneDeep from 'lodash/cloneDeep'

export default {
  data() {
    return {
      typeFilter: {
        isPrincess: true,
        isFairy: true,
        isAngel: true,
        isBNP: false
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
          duration: '1500'
        })
      })
      .catch(err => {
        this.$notify.error({
          title: '失敗',
          message: `${err}`,
          position: 'top-right',
          duration: '1500'
        })
      })
  },
  methods: {
    async startSimu(requestParams, team, appealValue) {
      await this.$store
        .dispatch('fetchLiveSimulationData', requestParams)
        .then(() => {
          this.$notify.success({
            title: '成功',
            message: 'ライブシミュレートを更新しました',
            position: 'top-right',
            duration: '1500'
          })
          this.$emit('snapshotEmit', team, appealValue)
        })
        .catch(err => {
          this.$notify.error({
            title: '失敗',
            message: `${err}`,
            position: 'top-right',
            duration: '1500'
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
    setBNP(val) {
      this.typeFilter.isBNP = val
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
