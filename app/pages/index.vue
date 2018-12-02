<template>
  <section class="container">
    <div>
      <!-- <SsrCard /> -->
      <SrCard />
    </div>
  </section>
</template>

<script>
import SsrCard from '~/components/cards/SsrCards.vue'
import SrCard from '~/components/cards/SrCards.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    SsrCard,
    SrCard
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
