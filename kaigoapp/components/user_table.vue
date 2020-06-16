<template>
  <div class="container" >
          <form @submit.prevent="doSearch" method="POST" >
              <input type="text" name="name" v-model="name">
              <input type="submit" value="検索">
          </form>
          <table class="list">
              <tr style="cursor:default;">
                  <th>利用者氏名</th>
                  <th>生年月日</th>
                  <th>性別</th>
              </tr>
              <tr v-for="data in personal_data" :key="data.PERSONAL_ID" @click="doAction(data.PERSONAL_ID)" >
                <td width="40%">{{data.P_NAME}}</td>
                <td width="40%">{{data.BIRTHDAY}}</td>
                <td style="text-align:center" width="20%">
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

export default {
    data: function(){
        return{
            title:'利用者一覧',
            message:'利用者を選択してください。',
            personal_data:{},
            name:"",
        };
    },
    mounted(){
        axios.get(url).then((res)=>{
          this.personal_data = res.data;
        });
    },
    methods:{
      doAction(d){
        this.$emit('nextpage',d);
      },
      doSearch(){
        let get_url=url;
        get_url += "?orderBy=%22P_NAME%22&equalTo=%22"+this.name+"%22";
        axios.get(get_url).then((res)=>{
          this.personal_data = res.data;
        });
      }
    }
}
</script>
