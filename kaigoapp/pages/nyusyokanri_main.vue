<template>
  <div class="container">
    <h1>入所管理画面</h1>
    <button id="btn1">保存</button>
    <button id="btn2">削除</button>
    <table>
        <tr>
            <th colspan="7"></th>
        </tr>
      <tr>
        <td>氏名</td>
        <td colspan="7">Aさん</td>
      </tr>
      <tr>
        <td>開始</td>
        <td><no-ssr>
      <v-date-picker 
              :input-props="{ class: 'input', name: 'event_dates', placeholder:'日付を入力' }"
              :mode="mode" 
              :formats="formats"
              v-model="selectedDate">
        </v-date-picker>
        </no-ssr></td>
        <td>開始時間</td>
        <td><select name="time">
        <option value="9:00">9:00</option></select></td>
        <td>～</td>
        <td><select name="time">
        <option value="9:30">9:30</option></select></td>
      </tr>
      <tr>
        <td>終了</td>
        <td><no-ssr>
      <v-date-picker 
              :input-props="{ class: 'input', name: 'event_dates2', placeholder:'日付を入力' }"
              :mode="mode" 
              :formats="formats"
              v-model="selectedDate2">
        </v-date-picker>
        </no-ssr></td>
        <td>終了時間</td>
        <td><select name="time">
        <option value="16:00">16:00</option></select></td>
        <td>～</td>
        <td><select name="time">
        <option value="16:30">16:30</option></select></td>
      </tr>
      <tr>
        <td>宿泊分類</td>
        <td colspan="7"><input type="checkbox">特養
        <input type="checkbox">ショートステイ</td>
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

table {
  border-collapse: collapse;
  margin-top: 1em;
  margin-left: 1em;
}
th, td {
  border: solid 1px black;
}
th {
    padding: 10px;
}
</style>
