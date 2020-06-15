<template>
  <div class="container">
    <totop />
    <h1>ベッドの空き状況</h1>
    <userName />
    <br>
    <span>日付 (～1週間を表示)</span>
    <no-ssr>
      <v-date-picker 
              :input-props="{ class: 'input', name: 'event_dates' }"
              :mode="mode" 
              :formats="formats"
              v-model="selectedDate" @input="inputEvent" >
      </v-date-picker>
    </no-ssr>
    <table class="table">
      <tr>
        <th></th>
        <th></th>
        <th v-for="(data,key) in day" :key="key" v-bind:class="{sunday:data.getDay()==0,saturday:data.getDay()==6}" >{{(data.getMonth() + 1) + '/' + data.getDate() +'('+ (weekDay[data.getDay()]) +')'}}</th>
      </tr>
      <tr v-for="(data,key) in room_data" v-bind:key="key">
        <th rowspan="8" v-if="data.BED_ID == flag">{{ data.FLOOR }}F</th>
        <td class="room">{{ data.BED_NUM }}</td>
        <td v-for="(c_data,c_key) in day" v-bind:key="c_key">
          <button v-if="staySwitch(data.BED_ID,c_data)" @click="stayed(stayed_table[''+data.BED_ID+c_data]);" >
            {{personal_data[stay_data[stayed_table[""+data.BED_ID+c_data]].PERSONAL_ID].P_NAME}}
          </button>
          <button v-else class="button" @click="blank(data.BED_ID,c_data);">空</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
const axios = require('axios');
let url = "https://kaigo-db-a268b.firebaseio.com/";
import userName from '../components/userName';
import totop from '../components/totop';

export default {
  data:function() {
    var d = new Date();
    return {
      mode:'single',
      formats: {
        input: ['YYYY-MM-DD'],
      },
      weekDay:["日","月","火","水","木","金","土"],
      selectedDate:d,
      day: [],
      flag:'001',
      stayed_table:{},
    }
  },
  methods: {
    inputEvent: function() {
        var newday = new Date(this.selectedDate);
        for(var i=0;i<7;i++){
          this.$set(this.day,i,new Date(newday));
          //(newday.getMonth() + 1) + '/' + newday.getDate() +'('+ this.weekDay[newday.getDay()] +')'
          newday.setDate(newday.getDate()+1);
        }
      },
    staySwitch: function(bedid,day){
      for(var key in this.stay_data){
        if(this.stay_data[key].BED_ID == bedid){//bedidが一致
        var today = day.getFullYear()*100 + (day.getMonth() + 1) + 0.01*(day.getDate());
          if(today<=this.stay_data[key].LAST_DAY){//LAST_DAYの範囲内
            if(this.stay_data[key].START_DAY<=today){//START_DAYの範囲内
              this.$set(this.stayed_table,""+bedid+day,key);
              return true;
            }
          }
        }
      }
      return false;
    },
    blank: function(bedid,date){
      this.$store.commit('set_bedid',bedid);
      this.$store.commit('set_date',date);
      if(this.$store.state.userid){
        this.$router.push('nyusyokanri_main');
      }else{
        this.$router.push('user_list');
      }
    },
    stayed: function(stay_id){
      this.$store.commit('set_stayid',stay_id);
      this.$router.push('/nyusyokanri_main');
    },
  },
  asyncData: async function() {
    let res = await axios.get(url+"BED.json");
    let p_res = await axios.get(url+"PERSONAL.json");
    let s_res = await axios.get(url+"STAY.json");//ステイテーブル一括は危ない
    return { room_data: res.data,
             stay_data: s_res.data,
             personal_data: p_res.data};
  },
  components:{
      userName,
      totop
    },
}
</script>

<style>
.table {
  border-collapse: collapse;
  margin-top: 3em;
  margin-left: 2em;
  width: 97%;
  height: 800px;
}
.room {
  background-color: lightgray;
}
.table th, td {
  border: solid 1px black;
  width: 8em;
}
.table th {
  background-color: gray;
}
.table td {
  text-align: center;
}
.table .sunday{
  background-color: lightcoral;
}
.table .saturday{
  background-color: lightskyblue;
}
.button {
  background-color: white;
  border-style: none;
  outline: none;
}
.button:hover {
  color:lightblue;
}
</style>
