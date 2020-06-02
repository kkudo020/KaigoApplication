<template>
  <div class="container">
      <div>
          <h1>{{title}}</h1>
          <userName />
          <p>{{message}}</p>
      </div>
      <div>
          <form action="">
              <input type="text" name="name" id="">
              <button type="submit">検索</button>
          </form>
      </div>
      <div>
          <table>
              <tr>
                  <th>利用者氏名</th>
                  <th>生年月日</th>
                  <th>性別</th>
              </tr>
              <tr v-for="data in html_data" :key="data" >
                <td>{{data.P_NAME}}</td>
                <td>{{data.BIRTHDAY}}</td>
                <td>
                    <span v-if="data.GENDER == 1">男</span>
                    <span v-if="data.GENDER == 2">女</span>
                </td>
              </tr>
          </table>
      </div>
      <router-link to="/nyusyo_list?id=001">入所情報一覧へ</router-link>
  </div>
</template>

<script>
const axios = require('axios');
let url = "https://kaigo-db-a268b.firebaseio.com/PERSONAL.json";
import userName from '../components/userName';

export default {
    data: function(){
        return{
            title:'利用者一覧',
            message:'利用者を選択してください。',
        };
    },
    asyncData: async function(){
        let result = await axios.get(url);
        return{ html_data:result.data };
    },
    components:{
        userName
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
table{
  border-collapse: collapse;
}
th{
    font-size: 14pt;
    color: white;
    padding: 5pt;
    border: 2px solid white;
    background: steelblue;
}
td{
    padding: 1pt 5pt;
    border: 2px solid white;
    background: lightblue;
}
tr:nth-child(odd){
    background: steellightblue;
}
</style>