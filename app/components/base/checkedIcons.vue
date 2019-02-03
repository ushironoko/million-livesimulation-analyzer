<template>
  <span @click="changeChecked" >
    <img :id="cardId" :src="imageUrl" style="max-width: 100px;" :class="{ checked:isChecked }">
  </span>
</template>

<script>
export default {
  props:['imageUrl','cardId'],
  data() {
    return {
      isChecked: false
    }
  },
  methods: {
    changeChecked(){
      this.checked = !this.checked
    }
  }
}
</script>

<style>
.checked {
   border:solid 2px #9eceff;
   border-radius: 0.5em;
}
</style>
