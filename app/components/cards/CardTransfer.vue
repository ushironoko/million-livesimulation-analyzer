<template>
  <section>
    <el-transfer
      style="text-align: left; display: inline-block"
      v-loading="loading"
      class="transfer"
      filterable
      v-model="selection"
      :props="{
        key:'name',
        label:'カード名'
      }"
      :titles="['カード一覧','編成']"
      :data="cardData.filter(data => data.name.toLowerCase())"
      @change="transferChange"
      >
    </el-transfer>
  </section>
</template>

<script>
const emitData = []

export default {
  props: ['cardData'],
  data() {
    return {
      selection: [],
      loading: true
    }
  },
  computed: {
    filteredList() {
      const filteredList = this.cardData.filter(data => {
        return this.selection.includes(data.name)
      })

      return filteredList
    }
  },
  methods: {
    transferChange() {
      this.emitData = this.filteredList
      this.$nuxt.$emit('SELECTED_CARD_LIST', this.emitData)
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
.transfer {
  margin-top: 30px;
}
</style>
