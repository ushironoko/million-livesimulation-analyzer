<template>
  <section>
    <music-selection :musicData="musicData"/>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import MusicSelection from '~/components/cards/MusicSelection.vue'

export default {
  data() {
    return {
      selectMusic: ''
    }
  },
  async created() {
    await this.$store
      .dispatch('fetchMusicData')
      .then(() => {
        this.$notify.success({
          title: '成功',
          message: '楽曲情報を更新しました',
          position: 'top-right',
          duration: '3000'
        })
      })
      .catch(err => {
        this.$notify.error({
          title: '失敗',
          message: `${err}`,
          position: 'top-right',
          duration: '3000'
        })
      })
  },
  computed: {
    ...mapGetters(['musicData'])
  },
  components: {
    MusicSelection
  },
  mounted() {
    this.$nuxt.$on('SELECTED_MUSIC', val => {
      this.selectMusic = val
    })
  }
}
</script>
