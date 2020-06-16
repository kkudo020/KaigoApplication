<template>
  <div class="container">
    <totop />
    <h1>入所管理画面</h1>
    <userName />
    <button @click="doClick">ひとつ前の画面に戻る</button>
    <span class="box">
      <button id="btn"  class="btn" @click="addData">データの登録</button>
      <button id="btn1" class="btn" @click="upData">データの更新</button>
      <button id="btn2" class="btn" @click="delData">データの削除</button>
    </span>
    <table class="kanri">
        <tr>
            <th colspan="7"></th>
        </tr>
      <tr>
        <td class="txt">氏名</td>
        <td colspan="7" class="item">{{ personal_data }}様</td>
      </tr>
      <tr>
        <td class="txt">ベッド</td>
        <td colspan="7" class="name td">{{bed_num.BED_NUM}}</td>
      </tr>
      <tr>
        <td class="txt">開始</td>
        <td class="item"><no-ssr>
        <v-date-picker 
              :input-props="{ class: 'input', name: 'event_dates', placeholder:'日付を入力' }"
              :mode="mode" 
              :update-on-input="true"
              :formats="formats"
              v-model="selectedDate">
        </v-date-picker>
        </no-ssr></td>
        <td class="txt">開始時間</td>
        <td colspan="3" class="item"><vue-timepicker :format="format" :minute-interval="minInterval" v-model="stringTime"></vue-timepicker> ～ <vue-timepicker :format="format" :minute-interval="minInterval" v-model="stringTime2"></vue-timepicker></td>
      </tr>
      <tr>
        <td class="txt">終了</td>
        <td class="item"><no-ssr>
        <v-date-picker 
              :input-props="{ class: 'input', name: 'event_dates2', placeholder:'日付を入力' }"
              :mode="mode" 
              :formats="formats"
              v-model="selectedDate2">
        </v-date-picker>
        </no-ssr></td>
        <td class="txt">終了時間</td>
        <td colspan="3" class="item"><vue-timepicker :format="format" :minute-interval="minInterval" v-model="stringTime3"></vue-timepicker> ～ <vue-timepicker :format="format" :minute-interval="minInterval" v-model="stringTime4"></vue-timepicker></td>
      </tr>
      <tr>
        <td class="txt" >宿泊分類</td>
        <td colspan="7" name="type" class="item"><label for="toku"><input type="radio" name="type" id="toku" v-model="type" value="特養" checked>特養</label>
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
let url = "https://kaigo-db-a268b.firebaseio.com/";

export default {
  data:function() {
    return {
      mode:'single',
      formats: {
        input: ['YYYY-MM-DD'],
      },
      format: 'HH:mm',
      minInterval: 30,
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
        START_DAY: this.selectedDate.getFullYear()*100 + (this.selectedDate.getMonth() + 1) + 0.01*(this.selectedDate.getDate()),
        IN_TIME_S: this.stringTime,
        IN_TIME_E: this.stringTime2,
        LAST_DAY: this.selectedDate2.getFullYear()*100 + (this.selectedDate2.getMonth() + 1) + 0.01*(this.selectedDate2.getDate()),
        OUT_TIME_S: this.stringTime3,
        OUT_TIME_E: this.stringTime4,
        PERSONAL_ID:this.personal_id,
        BED_ID:this.bed_id,
        STAY_TYPE:this.type,
       };
      var key = firebase.database().ref().child('STAY').push().key;
      var result = window.confirm('データを登録します');
      if(result){
        firebase.database().ref('/STAY/' + key).set(data);
        this.$store.commit('set_stayid',key);
      }
    },
    upData:function() {
      var data = {
        START_DAY: this.selectedDate.getFullYear()*100 + (this.selectedDate.getMonth() + 1) + 0.01*(this.selectedDate.getDate()),
        IN_TIME_S: this.stringTime,
        IN_TIME_E: this.stringTime2,
        LAST_DAY: this.selectedDate2.getFullYear()*100 + (this.selectedDate2.getMonth() + 1) + 0.01*(this.selectedDate2.getDate()),
        OUT_TIME_S: this.stringTime3,
        OUT_TIME_E: this.stringTime4,
        PERSONAL_ID:this.personal_id,
        BED_ID:this.bed_id,
        STAY_TYPE:this.type,
       };
      firebase.database().ref('STAY/' + this.$store.state.stayid).on("value", snapshot =>{
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
        firebase.database().ref('STAY/' + this.$store.state.stayid).on("value", snapshot =>{
          console.log(snapshot.key)
        })
        var result = window.confirm('保存されているデータも削除されてしまいますがよろしいですか？');
        if(result) {
          firebase.database().ref('/STAY/' + this.$store.state.stayid).set(sendData);
        }
      },
      doClick: function() {
        if(this.$store.state.stayid != ''){
          this.$router.push('/nyusyo_list');
        } else {
          this.$router.push('/user_list');
        }
      },
    },
    asyncData: async function(context) {
      let personal_id;
      let start_day;
      let last_day;
      let time = "09:00";
      let time2= "09:30";
      let time3= "16:00";
      let time4= "16:30";
      let type = "特養";
      let bed_id;
      if(context.store.state.stayid == ''){
        personal_id = context.store.state.userid;
        start_day = context.store.state.date;
        last_day = context.store.state.date;
        bed_id = context.store.state.bedid;
      }else{
        let res = await axios.get(url+"STAY/"+context.store.state.stayid+".json");
        personal_id = res.data.PERSONAL_ID;
        start_day = new Date(Math.floor(res.data.START_DAY/100),(Math.floor(res.data.START_DAY)%100-1),(res.data.START_DAY*100)%100);
        last_day = new Date(Math.floor(res.data.START_DAY/100),(Math.floor(res.data.LAST_DAY)%100-1),(res.data.LAST_DAY*100)%100);
        time = res.data.IN_TIME_S;
        time2= res.data.IN_TIME_E;
        time3= res.data.OUT_TIME_S;
        time4= res.data.OUT_TIME_E;
        type = res.data.STAY_TYPE;
        bed_id = res.data.BED_ID;
      }
      
      let result_p_data = await axios.get(url + 'PERSONAL/' + personal_id + '/P_NAME.json');
      let bed_num = await axios.get(url + 'BED/' + bed_id + '.json');
      return { personal_data:result_p_data.data,
               personal_id:personal_id,
               selectedDate:start_day,
               selectedDate2:last_day,
               stringTime : time,
               stringTime2: time2,
               stringTime3: time3,
               stringTime4: time4,
               type:type,
               bed_num:bed_num.data,
               bed_id:bed_id,
      };
    }
  }
</script>

