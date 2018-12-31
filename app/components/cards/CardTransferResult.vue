<template>
  <el-card>
    <div>
      <span>{{ `${lcmData}秒後にすべてのスキル発動が被ります`}}</span>
    </div>
    <hr>
    <el-table :data="filteredList" height="300">
      <el-table-column label="カード名" prop="name">
      </el-table-column>
      <el-table-column label="スキル名" prop="skillName">
      </el-table-column>
      <el-table-column label="インターバル" prop="skill[0].interval">
      </el-table-column>
      <el-table-column label="スキル秒数" prop="skill[0].duration">
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  props: ['lcmData', 'filteredList']
}
</script>
