<template>
    <el-card>
      <div slot="header" class="clearfix">
        <span>{{ cardType }}一覧</span>
      </div>
      <el-table
        v-loading="loading"
        element-loading-text="Loading..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        ref="multipleTable"
        :data="cardData"
        stripe
        height="700"
        style="width: 100%"
        @selection-change="selectionChange">
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
          width="350">
        </el-table-column>
        <el-table-column
          property="skill[0].description"
          label="スキル効果"
          width="290"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          property="skill[0].interval"
          label="発動間隔"
          width="100"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          property="skill[0].duration"
          label="発動時間"
          width="100"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>
    </el-card>
</template>

<script>
export default {
  props:['cardType','cardData','loading'],

  methods: {
    selectionChange(val) {
      this.$emit('handleSelectionChange',val)
    }
  }
}
</script>
