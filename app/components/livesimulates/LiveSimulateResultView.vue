<template>
  <el-card v-loading="isLiveSimulationLoading">
    <div>
      <span slot="label"><i class="el-icon-document"></i></span>
      <span>ライブレポート</span>
    </div>

    <div v-for="data in dataset" :key="data.snapshot.timestamp">
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
const LiveSimulateResult = () =>
  import(/* webpackPreload: true */ '~/components/livesimulates/LiveSimulateResult.vue')

export default {
  props: {
    snapshot: {}
  },
  data() {
    return {
      dataset: []
    }
  },
  watch: {
    snapshot() {
      this.dataset.unshift({
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
