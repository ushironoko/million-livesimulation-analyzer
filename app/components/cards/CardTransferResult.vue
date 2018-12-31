<template>
  <el-card>
    <div>
      <span>{{ `${lcmData}秒後にすべてのスキル発動が被ります`}}</span>
    </div>
    <hr>
    <el-table :data="filteredList" max-height="800" fixed>
      <el-table-column label="カード名" fixed prop="name">
      </el-table-column>
      <el-table-column label="スキル名" fixed prop="skillName">
      </el-table-column>
      <el-table-column label="インターバル" fixed prop="skill[0].interval">
      </el-table-column>
      <el-table-column label="スキル秒数" fixed prop="skill[0].duration">
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  props: ['lcmData', 'filteredList']
}
</script>
