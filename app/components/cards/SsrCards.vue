<template>
  <section>
    <el-card>
      <div slot="header" class="clearfix">
        <span>SSRカード一覧</span>
      </div>
        <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
          <el-table
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
        </div>
    </el-card>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      checkedCard: [],
      busy: false
    }
  },
  computed: {
    ...mapGetters(['ssrCardData'])
  },
  methods: {
    handleSelectionChange(val) {
        this.checkedCard = val;
    },
    loadMore: function() {
      this.busy = true;

      setTimeout(() => {
        this.busy = false;
      }, 1000);
    }
  }
}
</script>
