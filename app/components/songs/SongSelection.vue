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
  @select="selectEmit"
 ></el-autocomplete>
</template>

<script>
export default {
  props: ['songData'],
  data() {
    return {
      field: '',
      loading: true
    }
  },
  methods: {
    selectEmit() {
      const songData = this.songData
      const result = songData.filter(x => x.SongName === this.field)
      this.$emit('selectEmit', result)
    },
    querySearch(songName, cb) {
      const songData = this.songData
      const results = songName
        ? songData.filter(x => this.songFilter(x, songName))
        : songData
      cb(results)
    },
    songFilter(x, songName) {
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
  margin-top: 10px;
  width: 100%;
  max-width: 300px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
