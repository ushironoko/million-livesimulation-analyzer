<template>
  <section>
    <el-card v-for="card in cardData" :key="card.id">
      {{ card }}
    </el-card>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['cardData'])
  }
}
</script>
