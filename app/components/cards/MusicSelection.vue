<template>
  <el-autocomplete
  class="inline-input"
  v-model="field"
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
      field: ''
    }
  },
  methods: {
    handleSelect() {
      this.$nuxt.$emit('SELECTED_MUSIC', this.field)
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
  watch: {}
}
</script>

<style scoped>
.inline-input {
  margin-top: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
