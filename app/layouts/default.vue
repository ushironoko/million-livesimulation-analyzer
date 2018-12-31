<template>
  <div>
    <Header />
    <div class="wrapper">
      <nuxt class="container"/>
    </div>
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
