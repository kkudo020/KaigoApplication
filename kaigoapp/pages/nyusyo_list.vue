<template>
  <div class="container">
      <div>
          <h1>{{title}}</h1>
          <userName />
          <p>{{message}}</p>
      </div>
      <p>[{{personal_data}}] 様</p>
          <table class="list">
              <tr>
                  <th>フロア</th>
                  <th>ベッド</th>
                  <th>開始日</th>
                  <th>終了日</th>
                  <th>備考</th>
              </tr>
              <tr v-for="data in stay_data" :key="data" @click="doAction();" >
                <td style="text-align:center" width="15%">{{bed_data[data.BED_ID]["FLOOR"]}}</td>
                <td style="text-align:center" width="15%">{{bed_data[data.BED_ID]["BED_NUM"]}}</td>
                <td width="20%">{{data.START_DAY}}</td>
                <td width="20%">{{data.LAST_DAY}}</td>
                <td width="30%">{{data.BIRTHDAY}}</td>
              </tr>
          </table>
  </div>
</template>

<script>
const axios = require('axios');
let url = "https://kaigo-db-a268b.firebaseio.com/";
import userName from '../components/userName';

export default {
    data: function(){
        return{
            title:'入所情報一覧',
            message:'確認・変更をしたい入所情報を選択してください。',
        };
    },
    asyncData: async function(context){
        let personal_id = context.query.id;
        let result_stay = await axios.get(url+"STAY.json?orderBy=%22PERSONAL_ID%22&equalTo=%22"+personal_id+"%22");
        let result_bed = await axios.get(url+"BED.json");
        let result_personal = await axios.get(url+"PERSONAL/"+personal_id+"/P_NAME.json")
        return{ stay_data:result_stay.data,
                bed_data:result_bed.data,
                personal_data:result_personal.data
        };
    },
    components:{
        userName
    },
    methods:{
        doAction(){
            // this.$router.push('nyusyokanri_main');
            window.location.href = '/nyusyokanri_main';
        }
    }
}
</script>