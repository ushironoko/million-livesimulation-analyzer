<template>
  <section>
    <el-container
      style="display: flex; justify-content: center; align-items: flex-start; padding-top:20px;"
    >
      <span>
        <a
          :href="`https://mltd.matsurihi.me/cards/${snapshot[3].id}`"
          target="_blunk"
          rel="noopener"
        >
          <img
            :src="snapshot[3].resourceId"
            style="max-width: 100px; width: 100%;"
          />
        </a>
      </span>
      <span>
        <a
          :href="`https://mltd.matsurihi.me/cards/${snapshot[1].id}`"
          target="_blunk"
          rel="noopener"
        >
          <img
            :src="snapshot[1].resourceId"
            style="max-width: 100px; width: 100%;"
          />
        </a>
      </span>
      <span>
        <a
          :href="`https://mltd.matsurihi.me/cards/${snapshot[0].id}`"
          target="_blunk"
          rel="noopener"
        >
          <img
            :src="snapshot[0].resourceId"
            style="max-width: 100px; width: 100%;"
          />
        </a>
      </span>
      <span>
        <a
          :href="`https://mltd.matsurihi.me/cards/${snapshot[2].id}`"
          target="_blunk"
          rel="noopener"
        >
          <img
            :src="snapshot[2].resourceId"
            style="max-width: 100px; width: 100%;"
          />
        </a>
      </span>
      <span>
        <a
          :href="`https://mltd.matsurihi.me/cards/${snapshot[4].id}`"
          target="_blunk"
          rel="noopener"
        >
          <img
            :src="snapshot[4].resourceId"
            style="max-width: 100px; width: 100%;"
          />
        </a>
      </span>
    </el-container>

    <el-table border :data="simuResult" max-height="960">
      <el-table-column label="楽曲" prop="SongInfo.Name"> </el-table-column>
      <el-table-column label="難度" prop="SongInfo.Lv"> </el-table-column>
      <el-table-column label="総アピール値">
        <template v-slot="_">
          <span>{{ appealValue }}</span>
        </template>
      </el-table-column>
    </el-table>

    <el-table border :data="simuResult" max-height="960">
      <el-table-column label="最大" prop="ScoreInfo.Total.Ideal">
      </el-table-column>
      <el-table-column label="0.1%" prop="ScoreInfo.Total.p[0]">
      </el-table-column>
      <el-table-column label="1%" prop="ScoreInfo.Total.p[1]">
      </el-table-column>
      <el-table-column label="50%" prop="ScoreInfo.Total.p[2]">
      </el-table-column>
    </el-table>

    <el-table border :data="simuResult" max-height="960">
      <el-table-column label="バースト前 最大" prop="ScoreInfo.1stHalf.Ideal">
      </el-table-column>
      <el-table-column label="0.1%" prop="ScoreInfo.1stHalf.p[0]">
      </el-table-column>
      <el-table-column label="1%" prop="ScoreInfo.1stHalf.p[1]">
      </el-table-column>
      <el-table-column label="50%" prop="ScoreInfo.1stHalf.p[2]">
      </el-table-column>
    </el-table>

    <el-table border :data="simuResult" max-height="960">
      <el-table-column label="バースト後 最大" prop="ScoreInfo.2ndHalf.Ideal">
      </el-table-column>
      <el-table-column label="0.1%" prop="ScoreInfo.2ndHalf.p[0]">
      </el-table-column>
      <el-table-column label="1%" prop="ScoreInfo.2ndHalf.p[1]">
      </el-table-column>
      <el-table-column label="50%" prop="ScoreInfo.2ndHalf.p[2]">
      </el-table-column>
    </el-table>

    <el-collapse>
      <el-collapse-item title="レポートの詳細">
        <el-table :data="simuResult">
          <el-table-column label="カード名" prop="UnitInfo.Main1.Name">
          </el-table-column>
          <el-table-column
            label="スキル"
            prop="UnitInfo.Main1.SkillEffectDescription"
          >
          </el-table-column>
          <el-table-column label="最大回数" prop="UnitInfo.Main1.MaxActNum">
          </el-table-column>
          <el-table-column
            label="発動総数"
            prop="UnitInfo.Main1.TotalSimulatedActNum"
          >
          </el-table-column>
        </el-table>

        <el-table :data="simuResult">
          <el-table-column label="カード名" prop="UnitInfo.Main2.Name">
          </el-table-column>
          <el-table-column
            label="スキル"
            prop="UnitInfo.Main2.SkillEffectDescription"
          >
          </el-table-column>
          <el-table-column label="最大回数" prop="UnitInfo.Main2.MaxActNum">
          </el-table-column>
          <el-table-column
            label="発動総数"
            prop="UnitInfo.Main2.TotalSimulatedActNum"
          >
          </el-table-column>
        </el-table>

        <el-table :data="simuResult">
          <el-table-column label="カード名" prop="UnitInfo.Main3.Name">
          </el-table-column>
          <el-table-column
            label="スキル"
            prop="UnitInfo.Main3.SkillEffectDescription"
          >
          </el-table-column>
          <el-table-column label="最大回数" prop="UnitInfo.Main3.MaxActNum">
          </el-table-column>
          <el-table-column
            label="発動総数"
            prop="UnitInfo.Main3.TotalSimulatedActNum"
          >
          </el-table-column>
        </el-table>

        <el-table :data="simuResult">
          <el-table-column label="カード名" prop="UnitInfo.Main4.Name">
          </el-table-column>
          <el-table-column
            label="スキル"
            prop="UnitInfo.Main4.SkillEffectDescription"
          >
          </el-table-column>
          <el-table-column label="最大回数" prop="UnitInfo.Main4.MaxActNum">
          </el-table-column>
          <el-table-column
            label="発動総数"
            prop="UnitInfo.Main4.TotalSimulatedActNum"
          >
          </el-table-column>
        </el-table>

        <el-table :data="simuResult">
          <el-table-column label="カード名" prop="UnitInfo.Main5.Name">
          </el-table-column>
          <el-table-column
            label="スキル"
            prop="UnitInfo.Main5.SkillEffectDescription"
          >
          </el-table-column>
          <el-table-column label="最大回数" prop="UnitInfo.Main5.MaxActNum">
          </el-table-column>
          <el-table-column
            label="発動総数"
            prop="UnitInfo.Main5.TotalSimulatedActNum"
          >
          </el-table-column>
        </el-table>
      </el-collapse-item>
    </el-collapse>
  </section>
</template>

<script>
export default {
  props: {
    snapshot: {
      type: Array,
      required: true,
      default: []
    },
    appealValue: {
      type: Number,
      required: true,
      default: 0
    },
    simuResult: {
      type: Array,
      required: true,
      default: []
    }
  }
}
</script>
