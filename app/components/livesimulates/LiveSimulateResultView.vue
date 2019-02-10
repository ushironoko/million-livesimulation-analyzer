<template>
  <el-card
    v-loading="isLiveSimulationLoading"
  >
    <el-tabs tab-position="left">
      <el-tab-pane>
        <span slot="label"><i class="el-icon-document"></i></span>
        <div>
          <span>ライブレポート</span>
        </div>

        <div v-for="(data,i) in dataset" :key="i">
          <live-simulate-result :snapshot="data.snapshot" :simuResult="data.simuData" />
        </div>

      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'
import LiveSimulateResult from '~/components/livesimulates/LiveSimulateResult.vue'

export default {
  props: {
    snapshot: Array
  },
  data() {
    return {
      dataset:[]
    }
  },
  watch: {
    snapshot() {
      this.dataset.unshift({snapshot:this.snapshot,simuData:this.liveSimulationData})
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
