<template>
  <section>
    <div>
      <checked-card-view :checkedCard="checkedCard" />
    </div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>SSRカード一覧</span>
      </div>
      <el-table
        v-loading="ssrLoading"
        element-loading-text="Loading..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        ref="multipleTable"
        :data="ssrCardData"
        stripe
        height="500"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          property="id"
          label="ID"
          width="120">
        </el-table-column>
        <el-table-column
          property="name"
          label="カード名"
          width="200">
        </el-table-column>
        <el-table-column
          property="skillName"
          label="スキル名"
          width="200"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          property="skill[0].description"
          label="スキル効果"
          width="200"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          property="skill[0].interval"
          label="発動間隔"
          width="200"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          property="skill[0].duration"
          label="発動時間"
          width="200"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>
    </el-card>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import CheckedCardView from'~/components/cards/CheckedCardView.vue'

export default {
  data() {
    return {
      checkedCard: []
    }
  },
  computed: {
    ...mapGetters(['ssrCardData','ssrLoading'])
  },
  methods: {
    handleSelectionChange(val) {
        this.checkedCard = val;
    }
  },
  components: {
    CheckedCardView
  }
}
</script>
