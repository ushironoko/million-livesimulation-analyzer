<template>
  <section>
    <song-selection :musicData="musicData"/>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import SongSelection from '~/components/songs/SongSelection.vue'

export default {
  data() {
    return {
      selectMusic: {}
    }
  },
  async mounted() {
    const delayMsg = await setTimeout(() => {}, 1)
    const musicDataLength = this.$store.getters['getMusicDataLength']

    if (musicDataLength === 0) {
      console.log('Music Full Download')
      await this.$store
        .dispatch('fetchMusicData')
        .then(() => {
          this.$notify.success({
            title: '成功',
            message: '楽曲情報を取得しました',
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
    } else {
      console.log('Music Update')
      const endSongId = this.$store.getters['getMusicDataEndSongId']
      await this.$store
        .dispatch('fetchMusicDataIncrementalUpdate', endSongId)
        .then(() => {
          this.$notify.success({
            title: '成功',
            message: '追加の楽曲を取得しました',
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
    }
  },
  computed: {
    ...mapGetters(['musicData'])
  },
  components: {
    SongSelection
  }
}
</script>
