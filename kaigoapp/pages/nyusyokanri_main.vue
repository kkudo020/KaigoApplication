<template>
  <div class="container">
    <h1>入所管理画面</h1>
    <button id="btn" class="btn2" @click="addData">保存</button>
    <button id="btn1" class="btn" @click="delData">削除</button>
    
    <table>
        <tr>
            <th colspan="7"></th>
        </tr>
      <tr>
        <td class="txt">氏名</td>
        <td colspan="7" class="name">Aさん</td>
      </tr>
      <tr>
        <td class="txt">開始</td>
        <td class="name"><no-ssr>
      <v-date-picker 
              :input-props="{ class: 'input', name: 'event_dates', placeholder:'日付を入力' }"
              :mode="mode" 
              :formats="formats"
              v-model="selectedDate">
        </v-date-picker>
        </no-ssr></td>
        <td class="txt">開始時間</td>
        <td colspan="3" class="name"><vue-timepicker :format="format" :minute-interval="minInterval" v-model="stringTime"></vue-timepicker> ～ <vue-timepicker :format="format" :minute-interval="minInterval" v-model="stringTime2"></vue-timepicker></td>
      </tr>
      <tr>
        <td class="txt">終了</td>
        <td class="name"><no-ssr>
      <v-date-picker 
              :input-props="{ class: 'input', name: 'event_dates2', placeholder:'日付を入力' }"
              :mode="mode" 
              :formats="formats"
              v-model="selectedDate2">
        </v-date-picker>
        </no-ssr></td>
        <td class="txt">終了時間</td>
        <td colspan="3" class="name"><vue-timepicker :format="format" :minute-interval="minInterval" v-model="stringTime3"></vue-timepicker> ～ <vue-timepicker :format="format" :minute-interval="minInterval" v-model="stringTime4"></vue-timepicker></td>
        
      </tr>
      <tr>
        <td class="txt">宿泊分類</td>
        <td colspan="7" name="type"><input type="radio" name="type" id="toku"><label for="toku">特養</label>
        <input type="radio" name="type" id="short"><label for="short">ショートステイ</label></td>
      </tr>
    </table>
  </div>
</template>

<script>
import VueTimepicker from 'vue2-timepicker'
import 'vue2-timepicker/dist/VueTimepicker.css'
import firebase from '@/plugins/firebase'
const axios = require('axios');
let url = "https://kaigo-db-a268b.firebaseio.com/STAY";
export default {
  data:function() {
    return {
      mode:'single',
      formats: {
        input: ['YYYY-MM-DD'],
      },
      selectedDate:new Date(),
      selectedDate2: new Date(),
      format: 'HH:mm',
      minInterval: 30,
      stringTime: "09:00",
      stringTime2: "09:30",
      stringTime3: "16:00",
      stringTime4: "16:30",
      json_data:{},
    }
  },
  components: {
      VueTimepicker,
  },
  methods: {
    addData: function() {
      let data = {
         START_DAY: (this.selectedDate.getMonth() + 1) + '/' + (this.selectedDate.getDate()),
         IN_TIME_S: this.stringTime,
         IN_TIME_E: this.stringTime2,
         LAST_DAY: (this.selectedDate2.getMonth() + 1) + '/' + (this.selectedDate2.getDate()),
         OUT_TIME_S: this.stringTime3,
         OUT_TIME_E: this.stringTime4,
         PERSONAL_ID:this.$store.state.userid,
         BED_ID:this.$store.state.bedid,
         KEY:this.$store.state.stayid,
       };
           let updates = {};
           updates['/STAY/' + this.$store.state.stayid] = data;
           return new Promise((resolve, reject) =>{
             firebase.database().ref().update(updates).then((res) =>{
               resolve(res)
             }).catch((err) =>{
               reject(err)
             })
           })
    },
    delData:function(){
      let del_url = url + '/0001.json';
      var btn = document.getElementById('btn1');
       btn.addEventListener('click', function() {
         var result = window.confirm('保存されているデータも削除されてしまいますがよろしいですか？');
         if(result) {
           axios.delete(del_url).then((re) =>{
          this.getData();
        });
         }
       })
    },
    getData: function() {
      axios.get(url + '.json').then((res) =>{
        this.json_data = res.data;
      }).catch((error) =>{
        this.json_data = {};
      });
    }
  },
  created: function() {
    this.getData();
  }
}
</script>

<style>
.btn {
    float: right;
    margin-right: 100px;
}
.btn2 {
    margin-left: 1100px;
}

table {
  border-collapse: collapse;
  margin-top: 3em;
  width: 100%;
  height: 500px;
}
th, td {
  border: solid 1px black;
}
th {
    padding: 3px;
    background-color: lightblue;
}
.txt {
    text-align: center;
    background-color: lightblue;
}
.name {
    padding-left: 1em;
}
td {
    background-color: lightcyan;
}
</style>
