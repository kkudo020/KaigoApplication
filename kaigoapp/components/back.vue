<template>
    <div>
      <button @click="onClick()">前のページに戻る</button>
    </div>
</template>

<script>
export default {
    name: 'back',
    methods: {
      onClick(){
        this.$router.push(this.$store.state.url.pop());
      }
    },
}
</script>