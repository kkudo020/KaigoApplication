<template>
  <div class="container">
      <div>
          <h1>{{title}}</h1>
          <p>{{message}}</p>
          <userName />
          <a v-if="login_status" href="/bed">ベットの利用状況</a><br>
          <a v-if="login_status" href="/user_list">利用者一覧</a>
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