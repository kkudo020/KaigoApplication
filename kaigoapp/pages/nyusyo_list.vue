<template>
  <div class="container">
      <div>
          <h1>{{title}}</h1>
          <p>{{message}}</p>
          <p>{{this.$route.query.id}}</p>
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
                  <th>フロア</th>
                  <th>ベッド</th>
                  <th>ベッド</th>
                  <th>開始日</th>
                  <th>終了日</th>
                  <th>備考</th>
              </tr>
              <tr v-for="data in html_data" :key="data" v-if="">
                <td>{{}}</td>
                <td>{{data.BIRTHDAY}}</td>
                <td>{{data.BIRTHDAY}}</td>
                <td>{{data.BIRTHDAY}}</td>
                <td>{{data.BIRTHDAY}}</td>
              </tr>
          </table>
      </div>
  </div>
</template>

<script>
const axios = require('axios');
let url = "https://kaigo-db-a268b.firebaseio.com/";
export default {
    data: function(){
        return{
            title:'入所情報一覧',
            message:'確認・変更をしたい入所情報を選択してください。',
        };
    },
    asyncData: async function(){
        let personal_id = '001';//ほんとはクエリから取得したい
        let result_stay = await axios.get(url+"stay.json?orderBy=%22PERSONAL_ID%22&"+personal_id);
        let result_personal = await axios.get(url+"personal.json");

        return{ html_data:result_stay.data };
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