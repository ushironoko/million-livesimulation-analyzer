<template functional>
  <section>
    <el-container>
      <span v-for="(payload, i) in props.snapshot" :key="i">
        <a :href="`https://mltd.matsurihi.me/cards/${payload.id}`" target="_blunk" rel="noopener">
          <img v-if="i === 0" :src="payload.resourceId" style="max-width: 100px; width: 100%; border:solid 2px #9eceff; border-radius: 0.5em;"/>
          <img v-else :src="payload.resourceId" style="max-width: 100px; width: 100%;"/>
        </a>
      </span>
    </el-container>

    <el-table :data="props.simuResult" max-height="960" stripe>
      <el-table-column label="最大" prop="ScoreInfo.Total.Ideal">
      </el-table-column>
      <el-table-column label="0.1%" prop="ScoreInfo.Total.p[0]">
      </el-table-column>
      <el-table-column label="1%" prop="ScoreInfo.Total.p[1]">
      </el-table-column>
      <el-table-column label="50%" prop="ScoreInfo.Total.p[2]">
      </el-table-column>
    </el-table>

    <el-collapse>
      <el-collapse-item title="レポートの詳細">
        <el-table :data="props.simuResult">
          <el-table-column label="カード名" prop="UnitInfo.Main1.Name">
          </el-table-column>
          <el-table-column label="0.1%" prop="UnitInfo.Main1.Name">
          </el-table-column>
          <el-table-column label="1%" prop="UnitInfo.Main1.Name">
          </el-table-column>
          <el-table-column label="50%" prop="UnitInfo.Main1.Name">
          </el-table-column>
        </el-table>

        <el-table :data="props.simuResult">
          <el-table-column label="カード名" prop="UnitInfo.Main2.Name">
          </el-table-column>
          <el-table-column label="0.1%" prop="UnitInfo.Main2.Name">
          </el-table-column>
          <el-table-column label="1%" prop="UnitInfo.Main2.Name">
          </el-table-column>
          <el-table-column label="50%" prop="UnitInfo.Main2.Name">
          </el-table-column>
        </el-table>

        <el-table :data="props.simuResult">
          <el-table-column label="カード名" prop="UnitInfo.Main3.Name">
          </el-table-column>
          <el-table-column label="0.1%" prop="UnitInfo.Main3.Name">
          </el-table-column>
          <el-table-column label="1%" prop="UnitInfo.Main3.Name">
          </el-table-column>
          <el-table-column label="50%" prop="UnitInfo.Main3.Name">
          </el-table-column>
        </el-table>

        <el-table :data="props.simuResult">
          <el-table-column label="カード名" prop="UnitInfo.Main4.Name">
          </el-table-column>
          <el-table-column label="0.1%" prop="UnitInfo.Main4.Name">
          </el-table-column>
          <el-table-column label="1%" prop="UnitInfo.Main4.Name">
          </el-table-column>
          <el-table-column label="50%" prop="UnitInfo.Main4.Name">
          </el-table-column>
        </el-table>

        <el-table :data="props.simuResult">
          <el-table-column label="カード名" prop="UnitInfo.Main5.Name">
          </el-table-column>
          <el-table-column label="0.1%" prop="UnitInfo.Main5.Name">
          </el-table-column>
          <el-table-column label="1%" prop="UnitInfo.Main5.Name">
          </el-table-column>
          <el-table-column label="50%" prop="UnitInfo.Main5.Name">
          </el-table-column>
        </el-table>
      </el-collapse-item>
    </el-collapse>
  </section>
</template>

<style scoped>
.el-table {
  max-width: 800px;
  width: 100%;
}
.el-collapse {
  max-width: 800px;
  width: 100%;
}
</style>
