<template>
  <div class="container">
      <div>
          <h1>{{title}}</h1>
          <p>{{message}}</p>
      </div>
  </div>
</template>

<script>

export default {
    data: function(){
        return{
            title:'入所情報一覧',
            message:'入所情報を選択してください。',
        };
    },
}
</script>
<style>
div{
    padding: 10pt;
}
a{
    margin-top: 1em;
}

</style>