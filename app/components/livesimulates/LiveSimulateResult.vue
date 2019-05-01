<template>
  <section>
    <el-container
      style="display: flex; justify-content: center; align-items: flex-start; padding-top:20px;"
    >
      <span v-for="i in teamMapping" :key="i">
        <a
          :href="`https://mltd.matsurihi.me/cards/${snapshot[i].id}`"
          target="_blunk"
          rel="noopener"
        >
          <img
            :src="snapshot[i].resourceId"
            style="max-width: 100px; width: 100%;"
          />
        </a>
      </span>
    </el-container>

    <el-table border :data="SongInfo" max-height="960">
      <el-table-column label="楽曲" prop="Name"> </el-table-column>
      <el-table-column label="難度" prop="Lv"> </el-table-column>
      <el-table-column label="総アピール値">
        <template v-slot="_">
          <span>{{ appealValue }}</span>
        </template>
      </el-table-column>
    </el-table>

    <el-table border :data="Total" max-height="960">
      <el-table-column label="最大" prop="Ideal">
      </el-table-column>
      <el-table-column label="0.1%" prop="p[0]">
      </el-table-column>
      <el-table-column label="1%" prop="p[1]">
      </el-table-column>
      <el-table-column label="50%" prop="p[2]">
      </el-table-column>
    </el-table>

    <el-table border :data="FirstHalf" max-height="960">
      <el-table-column label="バースト前 最大" prop="Ideal">
      </el-table-column>
      <el-table-column label="0.1%" prop="p[0]">
      </el-table-column>
      <el-table-column label="1%" prop="p[1]">
      </el-table-column>
      <el-table-column label="50%" prop="p[2]">
      </el-table-column>
    </el-table>

    <el-collapse>
      <el-collapse-item title="レポートの詳細">
        <el-table :data="Mains">
          <el-table-column label="カード名" prop="Main.Name">
          </el-table-column>
          <el-table-column
            label="スキル"
            prop="Main.SkillEffectDescription"
          >
          </el-table-column>
          <el-table-column label="最大回数" prop="Main.MaxActNum">
          </el-table-column>
          <el-table-column
            label="発動総数"
            prop="Main.TotalSimulatedActNum"
          >
          </el-table-column>
        </el-table>
      </el-collapse-item>
    </el-collapse>
  </section>
</template>

<script>
import teamMapping from '@/utils/teamMapping.js'

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
  },
  data() {
    return {
      teamMapping: teamMapping
    }
  },
  computed: {
    SongInfo() {
      return [this.simuResult[0].SongInfo]
    },
    Mains() {
      const UnitInfo = this.simuResult[0].UnitInfo
      const values = Object.values(UnitInfo)
      const mains = values.map(v => {
        return {
          'Main': v
        }
      })

      mains.shift()
      return mains
    },
    FirstHalf() {
      return [this.simuResult[0].ScoreInfo['1stHalf']]
    },
    Total() {
      return [this.simuResult[0].ScoreInfo['Total']]
    }
  }
}
</script>
