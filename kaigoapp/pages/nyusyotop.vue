<template>
  <div class="container">
      <div>
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
<style>
div{
    padding: 10pt;
}
a{
    display: inline-block;
    border-radius: 4px;
    border: 2px solid gray;
    color: black;
    text-decoration: none;
    padding: 10px 30px;
    margin-top:10pt;
}
a:hover {
  color: #fff;
  background-color: gray;
}
</style>