<template>
  <el-card v-loading="isLiveSimulationLoading">
    <template>
      <i class="el-icon-document"></i>
      <span>ライブレポート</span>
    </template>

    <div v-for="data in resultData" :key="data.snapshot.timestamp">
      <live-simulate-result
        :snapshot="data.snapshot"
        :appealValue="data.appealValue"
        :simuResult="data.simuData"
      />
      <hr />
    </div>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'
import LiveSimulateResult from '@/components/livesimulates/LiveSimulateResult.vue'

export default {
  props: {
    snapshot: {}
  },
  data() {
    return {
      resultData: []
    }
  },
  watch: {
    snapshot() {
      this.resultData.unshift({
        snapshot: this.snapshot.payload,
        appealValue: this.snapshot.appealValue,
        simuData: this.liveSimulationData,
        timestamp: this.snapshot.timestamp
      })
    }
  },
  computed: {
    ...mapGetters(['liveSimulationData', 'isLiveSimulationLoading'])
  },
  components: {
    LiveSimulateResult
  }
}
</script>
