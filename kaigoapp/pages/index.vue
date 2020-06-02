<template>
  <div class="container">
      <div>
          <h1>{{title}}</h1>
          <p>{{message}}</p>
      </div>
      <login />
      <div>
          <a href="/bed">ベットの利用状況</a><br>
          <a href="/user_list">利用者一覧</a>
      </div>
  </div>
</template>

<script>
const axios = require('axios');
let url = "https://kaigo-db-a268b.firebaseio.com/USER";
import login from '../components/login';

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
        login
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