<template>
  <section>
    <span>選択</span>
    <div v-for="item in checkedCard" :key="item.id">
      {{ item.name }}
      {{ item.skill[0].duration }}
      {{ item.skill[0].interval }}
    </div>
  </section>
</template>

<script>
export default {
  props: ['checkedCard']
}
</script>
