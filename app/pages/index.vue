<template>
  <section class="container">
    <div>
      <Card />
      <el-input v-model="cardId" placeholder="カードIDを入力..." style="padding-top: 10px; width: 160px;"></el-input>
      <Button style="padding-top: 10px;" :cardId="cardId" />
    </div>
  </section>
</template>

<script>
import Card from '~/components/Card.vue'
import Button from '~/components/CardFetchButton.vue'

export default {
  data(){
    return {
      cardId : ''
    }
  },
  components: {
    Card,
    Button
  }
}
</script>

<style>

.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
