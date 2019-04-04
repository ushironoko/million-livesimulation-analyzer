<template>
  <section>
    <el-card v-loading="loading">
      <el-checkbox v-model="isPrincess" @change="princessEmit">Pr</el-checkbox>
      <el-checkbox v-model="isFairy" @change="fairyEmit">Fa</el-checkbox>
      <el-checkbox v-model="isAngel" @change="angleEmit">An</el-checkbox>
      <el-checkbox v-model="isBNP" @change="bnpEmit">BNP</el-checkbox>
      <el-checkbox v-model="isSkillBorder" @change="changeSkillBorder">種別表示</el-checkbox>
      <div>
        <el-input
          style="max-width: 200px;"
          placeholder="カード名"
          v-model="filterWord"
          size="small"
          @input="filterWordEmit"
        ></el-input>
        <el-select
          v-model="sortValue"
          placeholder="Select"
          style="max-width: 100px;"
          size="small"
          @change="changeSortValue"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
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
      isBNP: false,
      filterWord: '',
      loading: true,
      sortValue: 'default',
      options: [
        { value: 'default', label: 'なし' },
        { value: 'Vo', label: 'Vo' },
        { value: 'Da', label: 'Da' },
        { value: 'Vi', label: 'Vi' }
      ],
      isSkillBorder: false
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
    bnpEmit() {
      this.$emit('bnpEmit', this.isBNP)
    },
    filterWordEmit() {
      this.$emit('filterWordEmit', this.filterWord)
    },
    changeSortValue() {
      this.$emit('changeSortValueEmit', this.sortValue)
    },
    changeSkillBorder(){
      this.$emit('changeSkillBorderEmit', this.isSkillBorder)
    }
  },

  mounted() {
    setTimeout(() => {
      this.loading = !this.loading
    }, 1500)
  }
}
</script>

<style scoped>
.el-checkbox {
  width: 50px;
  padding: 5px;
}
</style>
