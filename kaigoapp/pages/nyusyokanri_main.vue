<template>
  <div class="container">
    <h1>入所管理画面</h1>
    <input type="button" class="btn2" value="保存">
    <input type="button" class="btn" value="削除">
    
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
        <td colspan="3" class="name"><select name="time">
        <option value="09:00">09:00</option></select> ～ <select name="time">
        <option value="09:30">09:30</option></select></td>
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
        <td colspan="3" class="name"><select name="time">
        <option value="16:00">16:00</option></select> ～ <select name="time">
        <option value="16:30">16:30</option></select></td>
        
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


export default {
  data:function() {
    return {
      mode:'single',
      formats: {
        input: ['YYYY-MM-DD'],
      },
      selectedDate:new Date(),
      selectedDate2: new Date(),
    }
  },
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
