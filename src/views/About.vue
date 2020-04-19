<template>
  <div class="about">
    <img v-bind:src="image" class="imageStyle">
    <h1>Tech Enthusiast</h1>
  </div>
</template>

<script>
export default {
  data () {
  return {
    image: require('../assets/ysskrishna.jpg')
  }
},
}
</script>
<style scoped>
.imageStyle {
  max-width: 450px;
  padding: 20px;
}
</style>