<template>
  <section>
    <el-card>{{ cardData }}</el-card>
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
