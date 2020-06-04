<template>
  <div class="container">
    <totop />
    <h1>入所管理画面</h1>
    <userName />
    <span class="box">
      <button id="btn"  class="btn" @click="addData">データの登録</button>
      <button id="btn1" class="btn" @click="upData">データの更新</button>
      <button id="btn2" class="btn" @click="delData">データの削除</button>
    </span>
    
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
              :update-on-input="true"
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
        <td class="txt" >宿泊分類</td>
        <td colspan="7" name="type"><label for="toku"><input type="radio" name="type" id="toku" v-model="type" value="特養" checked>特養</label>
        <label for="short"><input type="radio" name="type" id="short" value="ショートステイ" v-model="type">ショートステイ</label></td>
      </tr>
    </table>
  </div>
</template>

<script>
import VueTimepicker from 'vue2-timepicker';
import 'vue2-timepicker/dist/VueTimepicker.css';
import firebase from '@/plugins/firebase';
import totop from '../components/totop';
import userName from '../components/userName';
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
      type: '特養',
    }
  },
  components: {
      VueTimepicker,
      userName,
      totop
  },
  methods: {
    addData: function() {
      var data = {
         START_DAY: (this.selectedDate.getMonth() + 1) + '/' + (this.selectedDate.getDate()),
         IN_TIME_S: this.stringTime,
         IN_TIME_E: this.stringTime2,
         LAST_DAY: (this.selectedDate2.getMonth() + 1) + '/' + (this.selectedDate2.getDate()),
         OUT_TIME_S: this.stringTime3,
         OUT_TIME_E: this.stringTime4,
         PERSONAL_ID:this.$store.state.userid,
         BED_ID:this.$store.state.bedid,
         STAY_TYPE:this.type,
       };
      var key = firebase.database().ref().child('STAY').push().key;
        var result = window.confirm('データを登録します');
        if(result){
          firebase.database().ref('/STAY/' + key).set(data);
          this.$store.commit('set_stayid');
          var day = this.$store.state.date;
          firebase.database().ref('/BED/' + this.$store.state.bedid + '/SCHEDULE/' + (day.getMonth()+1)+'_'+(day.getDate()) + '/stay_id').set(key);
        }
    },
    upData:function() {
      var data = {
         START_DAY: (this.selectedDate.getMonth() + 1) + '/' + (this.selectedDate.getDate()),
         IN_TIME_S: this.stringTime,
         IN_TIME_E: this.stringTime2,
         LAST_DAY: (this.selectedDate2.getMonth() + 1) + '/' + (this.selectedDate2.getDate()),
         OUT_TIME_S: this.stringTime3,
         OUT_TIME_E: this.stringTime4,
         PERSONAL_ID:this.$store.state.userid,
         BED_ID:this.$store.state.bedid,
         STAY_TYPE:this.type,
       };
      firebase.database().ref('STAY/' + this.$store.state.stayid).once("value", snapshot =>{
        console.log(snapshot.val())
      })
        var result = window.confirm('データを保存します');
        if(result){
          firebase.database().ref('/STAY/' + this.$store.state.stayid).set(data);
         }
    },
    delData:function(){
        let sendData = {
            START_DAY: null,
            IN_TIME_S: null,
            IN_TIME_E: null,
            LAST_DAY: null,
            OUT_TIME_S: null,
            OUT_TIME_E: null,
            PERSONAL_ID:null,
            BED_ID:null,
            STAY_TYPE:null,
           };
        firebase.database().ref('STAY/' + this.$store.state.stayid).once("value", snapshot =>{
          console.log(snapshot.val())
        })
        var result = window.confirm('保存されているデータも削除されてしまいますがよろしいですか？');
         if(result) {
           firebase.database().ref('/STAY/' + this.$store.state.stayid).set(sendData);
        }
      }
    },
  }
</script>

<style>
.btn {
    margin-right: 100px;
}
.box {
  float:right;
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
