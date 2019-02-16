<template>
  <el-card
    v-loading="isLiveSimulationLoading"
  >
    <div>
      <span slot="label"><i class="el-icon-document"></i></span>
      <span>ライブレポート</span>
    </div>

    <div v-for="(data,i) in dataset" :key="i">
      <live-simulate-result :snapshot="data.snapshot" :simuResult="data.simuData"/>
      <hr>
    </div>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'
import LiveSimulateResult from '~/components/livesimulates/LiveSimulateResult.vue'

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
        simuData: this.liveSimulationData
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
