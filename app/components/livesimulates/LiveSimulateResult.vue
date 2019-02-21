<template functional>
  <section>
    <el-container style="display: flex; justify-content: center; align-items: flex-start; padding-top:20px;">
      <span>
        <a :href="`https://mltd.matsurihi.me/cards/${props.snapshot[3].id}`" target="_blunk" rel="noopener">
          <img :src="props.snapshot[3].resourceId" style="max-width: 100px; width: 100%;"/>
        </a>
      </span>
      <span>
        <a :href="`https://mltd.matsurihi.me/cards/${props.snapshot[1].id}`" target="_blunk" rel="noopener">
          <img :src="props.snapshot[1].resourceId" style="max-width: 100px; width: 100%;"/>
        </a>
      </span>
      <span>
        <a :href="`https://mltd.matsurihi.me/cards/${props.snapshot[0].id}`" target="_blunk" rel="noopener">
          <img :src="props.snapshot[0].resourceId" style="max-width: 100px; width: 100%; border:solid 2px #9eceff; border-radius: 0.5em;"/>
        </a>
      </span>
      <span>
        <a :href="`https://mltd.matsurihi.me/cards/${props.snapshot[2].id}`" target="_blunk" rel="noopener">
          <img :src="props.snapshot[2].resourceId" style="max-width: 100px; width: 100%;"/>
        </a>
      </span>
      <span>
        <a :href="`https://mltd.matsurihi.me/cards/${props.snapshot[4].id}`" target="_blunk" rel="noopener">
          <img :src="props.snapshot[4].resourceId" style="max-width: 100px; width: 100%;"/>
        </a>
      </span>
    </el-container>

    <el-table border :data="props.simuResult" max-height="960">
      <el-table-column label="楽曲" prop="SongInfo.Name">
      </el-table-column>
      <el-table-column label="難度" prop="SongInfo.Lv">
      </el-table-column>
      <el-table-column label="総アピール値">
        <template v-slot="_">
          <span>{{props.appealValue}}</span>
        </template>
      </el-table-column>
    </el-table>

    <el-table border :data="props.simuResult" max-height="960">
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
          <el-table-column label="スキル" prop="UnitInfo.Main1.SkillEffectDescription">
          </el-table-column>
          <el-table-column label="最大回数" prop="UnitInfo.Main1.MaxActNum">
          </el-table-column>
          <el-table-column label="発動総数" prop="UnitInfo.Main1.TotalSimulatedActNum">
          </el-table-column>
        </el-table>

        <el-table :data="props.simuResult">
          <el-table-column label="カード名" prop="UnitInfo.Main2.Name">
          </el-table-column>
          <el-table-column label="スキル" prop="UnitInfo.Main2.SkillEffectDescription">
          </el-table-column>
          <el-table-column label="最大回数" prop="UnitInfo.Main2.MaxActNum">
          </el-table-column>
          <el-table-column label="発動総数" prop="UnitInfo.Main2.TotalSimulatedActNum">
          </el-table-column>
        </el-table>

        <el-table :data="props.simuResult">
          <el-table-column label="カード名" prop="UnitInfo.Main3.Name">
          </el-table-column>
          <el-table-column label="スキル" prop="UnitInfo.Main3.SkillEffectDescription">
          </el-table-column>
          <el-table-column label="最大回数" prop="UnitInfo.Main3.MaxActNum">
          </el-table-column>
          <el-table-column label="発動総数" prop="UnitInfo.Main3.TotalSimulatedActNum">
          </el-table-column>
        </el-table>

        <el-table :data="props.simuResult">
          <el-table-column label="カード名" prop="UnitInfo.Main4.Name">
          </el-table-column>
          <el-table-column label="スキル" prop="UnitInfo.Main4.SkillEffectDescription">
          </el-table-column>
          <el-table-column label="最大回数" prop="UnitInfo.Main4.MaxActNum">
          </el-table-column>
          <el-table-column label="発動総数" prop="UnitInfo.Main4.TotalSimulatedActNum">
          </el-table-column>
        </el-table>

        <el-table :data="props.simuResult">
          <el-table-column label="カード名" prop="UnitInfo.Main5.Name">
          </el-table-column>
          <el-table-column label="スキル" prop="UnitInfo.Main5.SkillEffectDescription">
          </el-table-column>
          <el-table-column label="最大回数" prop="UnitInfo.Main5.MaxActNum">
          </el-table-column>
          <el-table-column label="発動総数" prop="UnitInfo.Main5.TotalSimulatedActNum">
          </el-table-column>
        </el-table>
      </el-collapse-item>
    </el-collapse>
  </section>
</template>
