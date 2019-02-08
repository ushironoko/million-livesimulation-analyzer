<template>
  <section>
    <song-selection :songData="songData"/>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import SongSelection from '~/components/songs/SongSelection.vue'

export default {
  data() {
    return {
      selectSong: {}
    }
  },
  async mounted() {
    const delayMsg = await setTimeout(() => {}, 1)
    const songDataLength = this.$store.getters['getSongDataLength']

    if (songDataLength === 0) {
      console.log('Song Full Download')
      await this.$store
        .dispatch('fetchSongData')
        .then(() => {
          this.$notify.success({
            title: '成功',
            message: '楽曲情報を初期化しました',
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
      console.log('Song Update')
      const endSongId = this.$store.getters['getSongDataEndSongId']
      await this.$store
        .dispatch('fetchSongDataIncrementalUpdate', endSongId)
        .then(() => {
          this.$notify.success({
            title: '成功',
            message: '楽曲情報が最新になりました',
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
    ...mapGetters(['songData'])
  },
  components: {
    SongSelection
  }
}
</script>
