<template>
  <div class="container">
      <div>
          <h1>{{title}}</h1>
      </div>
      <login/>
  </div>
</template>

<script>
import login from '../components/login';

export default {
    data: function(){
        return{
            title:'ログイン',
        };
    },
    mounted(){
        if(localStorage.user_name){
            this.$router.push('/nyusyotop');
        }
    },
    components:{
        login
    },
}

</script>