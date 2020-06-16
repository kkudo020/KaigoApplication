<template>
  <div class="container">
      <div class="main">
          <h1>{{title}}</h1>
          <p>{{message}}</p>
          <userName />
          <button @click="logout();">ログアウト</button><br>
          <a @click="bed">ベットの利用状況</a><br>
          <a @click="user_list">利用者一覧</a>
      </div>
  </div>
</template>

<script>
import login from '../components/login';
import userName from '../components/userName';

export default {
    data: function(){
        return{
            title:'入所管理',
            message:'',
        };
    },
    methods:{
        logout(){
            localStorage.removeItem("user_name");
            this.user_name = localStorage.user_name;
            this.$router.push("/");
        },
        bed(){
            this.$store.commit('set_url',"/nyusyotop");
            this.$router.push('/bed');
        },
        user_list(){
            this.$store.commit('set_url',"/nyusyotop");
            this.$router.push('/user_list');
        }
    },
    components:{
        login,
        userName
    },
}
</script>
