<template>
  <div class="container">
      <div>
          <h1>{{title}}</h1>
          <userName />
          <p>{{message}}</p>
      </div>
          <form action="/user_list" method="GET">
              <input type="text" name="name" id="">
              <input type="submit" value="検索" >
          </form>
          <table class="list">
              <tr style="cursor:default;">
                  <th>利用者氏名</th>
                  <th>生年月日</th>
                  <th>性別</th>
              </tr>
              <tr v-for="data in personal_data" :key="data" @click="doAction(data.PERSONAL_ID)" >
                <td>{{data.P_NAME}}</td>
                <td>{{data.BIRTHDAY}}</td>
                <td>
                    <span v-if="data.GENDER == 1">男</span>
                    <span v-if="data.GENDER == 2">女</span>
                </td>
              </tr>
          </table>
  </div>
</template>

<script>
const axios = require('axios');
let url = "https://kaigo-db-a268b.firebaseio.com/PERSONAL.json";
import userName from '../components/userName';
import nyusyokanri_mainVue from './nyusyokanri_main.vue';

export default {
    data: function(){
        return{
            title:'利用者一覧',
            message:'利用者を選択してください。',
        };
    },
    asyncData: async function(context){
        let get_url=url;
        if(context.query.name){
            get_url += "?orderBy=%22P_NAME%22&equalTo=%22"+context.query.name+"%22";
        }
        let result = await axios.get(get_url);
        console.log(result.data);
        return{ personal_data:result.data };
    },
    components:{
        userName
    },
    methods:{
        doAction(p_id){
            this.$router.push('nyusyo_list?id='+p_id);
        }
    }
}
</script>
<style>
.list{
  border-collapse: collapse;
}
.list th{
    font-size: 14pt;
    color: white;
    padding: 5pt;
    border: 2px solid gray;
    background: steelblue;
}
.list tr{
    padding: 1pt 5pt;
    border: 2px solid gray;
    background: rgb(223, 234, 238);
}
.list tr:hover{
    background: rgb(158, 215, 236);
    cursor: pointer;
}
.list td{
    padding: 1pt 5pt;
    border: none;
}

</style>