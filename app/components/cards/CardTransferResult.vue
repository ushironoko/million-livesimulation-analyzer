<template>
  <el-card>
    <div>
      <span>{{ `${lcmData}秒後にすべてのスキル発動が被ります`}}</span>
    </div>
    <hr>
    <el-table :data="filteredList" max-height="960" style="width: 800px;">
      <el-table-column label="カード">
          <template slot-scope="scope">
            <img :src="scope.row.resourceId"/>
          </template>
      </el-table-column>
      <el-table-column label="インターバル" prop="skill[0].interval">
      </el-table-column>
      <el-table-column label="スキル秒数" prop="skill[0].duration">
      </el-table-column>
      <el-table-column label="効果量" prop="skill[0].value">
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  props: ['lcmData', 'filteredList']
}
</script>
