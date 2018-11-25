<template>
  <div>
    <Header />
    <div class="wrapper">
      <nuxt class="container"/>
    </div>
  </div>
</template>

<script>
import Header from '~/components/TheHeader.vue'

export default {
  components: {
    Header
  }
}
</script>
