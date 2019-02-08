<template>
  <section>
    <simu-data-settings @princessEmit="princessEmit" @fairyEmit="fairyEmit" @angleEmit="angleEmit" @filterWordEmit="filterWordEmit"/>
    <team-transfer :cardData="ssrCardData" :typeFilter="typeFilter" :filterWord="filterWord" @simuStart="simuStart"/>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import TeamTransfer from '~/components/teams/TeamTransfer.vue'
import SimuDataSettings from '~/components/settings/SimuDataSettings.vue'

export default {
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
  methods: {
    async simuResultData(requestParams) {
      await this.$store
        .dispatch('fetchLiveSimulationData', requestParams)
        .then(() => {
          this.$notify.success({
            title: '成功',
            message: 'ライブシミュレートを更新しました',
            position: 'top-right',
            duration: '1000'
          })
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
    },
    simuStart(requestParams) {
      this.simuResultData(requestParams)
    }
  },
  computed: {
    ...mapGetters(['ssrCardData'])
  },
  components: {
    TeamTransfer,
    SimuDataSettings
  }
}
</script>

<style scoped>
.switch {
  margin-top: 15px;
}
</style>
