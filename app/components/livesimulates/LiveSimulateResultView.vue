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

        <live-simulate-result :snapshot="snapshot" :simuResult="liveSimulationData" />

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
  computed: {
    ...mapGetters(['liveSimulationData', 'isLiveSimulationLoading'])
  },
  components: {
    LiveSimulateResult
  }
}
</script>
