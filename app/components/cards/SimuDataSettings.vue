<template>
  <section>
    <el-card style="width: 100%;">
      <span slot="header">設定</span>
      <el-checkbox v-model="isPrincess" @change="princessEmit">Pr</el-checkbox>
      <el-checkbox v-model="isFairy" @change="fairyEmit">Fa</el-checkbox>
      <el-checkbox v-model="isAngel" @change="angleEmit">An</el-checkbox>
    </el-card>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isPrincess: true,
      isFairy: true,
      isAngel: true
    }
  },
  methods: {
    princessEmit() {
      this.$emit('isPrincess', this.isPrincess)
    },
    fairyEmit() {
      this.$emit('isFairy', this.isFairy)
    },
    angleEmit() {
      this.$emit('isAngel', this.isAngel)
    }
  }
}
</script>
