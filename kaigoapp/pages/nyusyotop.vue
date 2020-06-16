<template>
  <div class="container">
      <div class="main">
          <h1>{{title}}</h1>
          <p>{{message}}</p>
          <userName />
          <button @click="logout();">ログアウト</button><br>
          <a href="/bed">ベットの利用状況</a><br>
          <a href="/user_list">利用者一覧</a>
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
        }
    },
    components:{
        login,
        userName
    },
}
</script>
