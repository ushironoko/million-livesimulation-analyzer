<template>
  <section>
    <el-switch class="switch" v-model="transferMode"
      active-text="テキストモード"
      inactive-text="アイコンモード"></el-switch>
    <card-transfer v-if="transferMode" :cardData="ssrCardData" :typeFilter="typeFilter"/>
    <card-icons-table v-else :cardData="ssrCardData"/>
    <simu-data-settings @isPrincess="isPrincess" @isFairy="isFairy" @isAngel="isAngel"/>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import CardTransfer from '~/components/cards/CardTransfer.vue'
import CardIconsTable from '~/components/cards/CardIconsTable.vue'
import SimuDataSettings from '~/components/cards/SimuDataSettings.vue'

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
      transferMode: true,
      typeFilter: {
        isPrincess: true,
        isFairy: true,
        isAngel: true
      }
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
    isPrincess(val) {
      this.typeFilter.isPrincess = val
    },
    isFairy(val) {
      this.typeFilter.isFairy = val
    },
    isAngel(val) {
      this.typeFilter.isAngel = val
    }
  },
  mounted() {
    this.$nuxt.$on('SIMU_START', requestParams => {
      this.simuResultData(requestParams)
    })
  },
  computed: {
    ...mapGetters(['ssrCardData'])
  },
  components: {
    CardTransfer,
    CardIconsTable,
    SimuDataSettings
  }
}
</script>

<style scoped>
.switch {
  margin-top: 15px;
}
</style>
