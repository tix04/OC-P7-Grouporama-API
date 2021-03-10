<template>
  <div>

    <div class="logo">
      <img src="../assets/icon-left-font-monochrome-black.png" alt="Company Logo">
    </div>
    <hr>
    <div class="message">
      <h1>{{ msg + ' username' }}</h1>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'HelloUser',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h1 {
  font-size: 2.5rem;
  font-weight: bold;
}

img {
  width: 25%;
}
</style>
