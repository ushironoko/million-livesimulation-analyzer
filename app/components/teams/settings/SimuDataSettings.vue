<template>
  <section>
    <el-card v-loading="loading" style="width: 100%;">
      <el-checkbox v-model="isPrincess" @change="princessEmit">Pr</el-checkbox>
      <el-checkbox v-model="isFairy" @change="fairyEmit">Fa</el-checkbox>
      <el-checkbox v-model="isAngel" @change="angleEmit" style="padding-right: 10px;">An</el-checkbox>
      <el-input style="max-width: 200px;" placeholder="カード名" v-model="filterWord" @input="filterWordEmit"></el-input>
    </el-card>

  </section>
</template>

<script>
export default {
  data() {
    return {
      isPrincess: true,
      isFairy: true,
      isAngel: true,
      filterWord: '',
      loading: true
    }
  },
  methods: {
    princessEmit() {
      this.$emit('princessEmit', this.isPrincess)
    },
    fairyEmit() {
      this.$emit('fairyEmit', this.isFairy)
    },
    angleEmit() {
      this.$emit('angleEmit', this.isAngel)
    },
    filterWordEmit() {
      this.$emit('filterWordEmit', this.filterWord)
    }
  },

  mounted() {
    setTimeout(() => {
      this.loading = !this.loading
    }, 1500)
  }
}
</script>
