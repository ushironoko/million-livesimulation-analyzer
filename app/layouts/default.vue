<template>
  <div>
    <Header />
      <nuxt class="container"/>
    <Footer />
  </div>
</template>

<script>
import Header from '~/components/TheHeader.vue'
import Footer from '~/components/TheFooter.vue'

export default {
  components: {
    Header,
    Footer
  }
}
</script>
