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

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
