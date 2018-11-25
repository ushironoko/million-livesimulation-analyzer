<template>
  <section class="container">
    <div>
      {{ chartdata[0] }}
      <div class="bar-chart">
        <skill-graph
        v-if="$store.state.loaded"
        :chartdata="chartdata"
        :options="options"/>
      </div>
      <Card />
    </div>
  </section>
</template>

<script>
import Card from '~/components/cards/Card.vue'
import SkillGraph from '~/components/skill-graphs/SkillGraph.vue'
import { mapGetters } from 'vuex'

export default {
   data() {
    return {
      chartdata : {
        datasets: [
            {
              backgroundColor: '#41b883',
              data: [101,0]
            }
          ]
      }
    }
  },
  async mounted() {
    await this.$store.dispatch('fetchCard')
    .then(()=> {
      const x = store.state.cardData[0].skill.duration
      const y = store.state.cardData[0].skill.interval
      this.$store.commit('changeLoaded')
    })
    .catch((err) => {
      return 'err'
    })
  },
  components: {
    SkillGraph,
    Card
  },
  computed: {
    ...mapGetters(['cardData'])
  }
}
</script>

<style>
.bar-chart {
  top: 10%;
  width: 50%;
  height: 50%;
}

.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
