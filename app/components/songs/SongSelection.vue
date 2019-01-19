<template>
  <el-autocomplete
  class="inline-input"
  v-model="field"
  v-loading="loading"
  :debounce="0"
  :fetch-suggestions="querySearch"
  value-key="SongName"
  placeholder="楽曲名で検索"
  :minlength="200"
  @select="handleSelect"
 ></el-autocomplete>
</template>

<script>
export default {
  props: ['musicData'],
  data() {
    return {
      field: '',
      loading: true
    }
  },
  methods: {
    handleSelect() {
      const musicData = this.musicData
      const result = musicData.filter(x => x.SongName === this.field)
      this.$nuxt.$emit('SELECTED_MUSIC', result)
    },
    querySearch(songName, cb) {
      const musicData = this.musicData
      const results = songName
        ? musicData.filter(x => this.musicFilter(x, songName))
        : musicData
      cb(results)
    },
    musicFilter(x, songName) {
      return x.SongName.toLowerCase().indexOf(songName.toLowerCase()) != -1
    }
  },
  mounted() {
    setTimeout(() => {
      this.loading = !this.loading
    }, 1000)
  }
}
</script>

<style scoped>
.inline-input {
  margin-top: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
