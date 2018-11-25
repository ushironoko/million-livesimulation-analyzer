<template>
  <section>
    {{ cardData[0].skill }}
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
