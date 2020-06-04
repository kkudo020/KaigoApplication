<template>
  <div class="container">
    <h1>ベッドの空き状況</h1>
     日付 (～1週間を表示)
    <no-ssr>
      <v-date-picker 
              :input-props="{ class: 'input', name: 'event_dates' }"
              :mode="mode" 
              :formats="formats"
              v-model="selectedDate" @input="inputEvent" >
      </v-date-picker>
    </no-ssr>
    <table>
      <tr>
        <th></th>
        <th></th>
        <th v-for="(data,key) in day" :key="key" >{{(data.getMonth() + 1) + '/' + data.getDate() +'('+ (weekDay[data.getDay()]) +')'}}</th>
      </tr>
      <tr v-for="(data,key) in room_data" v-bind:key="key">
        <th rowspan="8" v-if="data.BED_ID == flag">{{ data.FLOOR }}F</th>
        <td class="room">{{ data.BED_NUM }}</td>
        <td v-for="(c_data,c_key) in day" v-bind:key="c_key" >
          <!-- <button v-if="data.SCHEDULE.hasOwnProperty((c_data.getMonth()+1)+'_'+c_data.getDate())" onclick="#">{{data}}</button> -->
          <!--data.SCHEDULE[(c_data.getMonth()+1)+"_"+c_data.getDate()]-->
          <button @click="blank(data.BED_ID,c_data);">空</button><!--クリックでメソッド(data.BED_ID,date)へ-->
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
const axios = require('axios');
let url = "https://kaigo-db-a268b.firebaseio.com/BED.json";


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
      
    }
  },
  methods: {
    inputEvent: function() {
        var newday = new Date(this.selectedDate);
        console.log(newday);
        for(var i=0;i<7;i++){
          this.$set(this.day,i,new Date(newday));
          //(newday.getMonth() + 1) + '/' + newday.getDate() +'('+ this.weekDay[newday.getDay()] +')'
          newday.setDate(newday.getDate()+1);
        }
        console.log(this.day);
      },
    blank: function(bedid,date){
      this.$store.commit('set_bedid',bedid);
      this.$store.commit('set_date',date);
      this.$router.push('user_list');
    }
  },
  asyncData: async function() {
    let result = await axios.get(url);
    return { room_data: result.data };
  },
}
</script>

<style>
input {
  margin-top:2em;
  margin-left: 3.5em;
  width: 100px;
}

table {
  border-collapse: collapse;
  margin-top: 3em;
  margin-left: 2em;
  width: 97%;
  height: 800px;
}
.room {
  background-color: lightgray;
}
th, td {
  border: solid 1px black;
}
th {
  background-color: gray;
}
td {
  text-align: center;
}
button {
  background-color: white;
  border-style: none;
  outline: none;
}
button:hover {
  color:lightblue;
}
</style>
