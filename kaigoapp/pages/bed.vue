<template>
  <div class="container">
    <h1>ベッドの空き状況</h1>
    <no-ssr>
      <v-date-picker 
              :input-props="{ class: 'input', name: 'event_dates', placeholder:'日付を入力' }"
              :mode="mode" 
              :formats="formats"
              v-model="selectedDate" class="date">
      </v-date-picker>
    </no-ssr>
    <table>
      <tr>
        <th rowspan="7">1F</th>
        <th></th>
        <th>日付1</th>
        <th>日付2</th>
        <th>日付3</th>
        <th>日付4</th>
        <th>日付5</th>
        <th>日付6</th>
        <th>日付7</th>
      </tr>
      <tr>
        <td>101A</td>
        <td>空</td>
        <td>空</td>
        <td>空</td>
        <td>空</td>
        <td>空</td>
        <td>空</td>
        <td>空</td>
      </tr>
      <tr>
        <td>101B</td>
        <td>空</td>
        <td>空</td>
        <td>空</td>
        <td>空</td>
        <td>空</td>
        <td>空</td>
        <td>空</td>
      </tr>
      <tr>
        <td>101C</td>
        <td>空</td>
        <td>空</td>
        <td>空</td>
        <td>空</td>
        <td>空</td>
        <td>空</td>
        <td>空</td>
      </tr>
      <tr>
        <td>101D</td>
        <td>空</td>
        <td>空</td>
        <td>空</td>
        <td>空</td>
        <td>空</td>
        <td>空</td>
        <td>空</td>
      </tr>
      <tr>
        <td>102A</td>
        <td>空</td>
        <td>空</td>
        <td>空</td>
        <td>空</td>
        <td>空</td>
        <td>空</td>
        <td>空</td>
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
    }
  },
}
</script>

<style>
.date {
  margin-left: 1em;
}
table {
  border-collapse: collapse;
  margin-top: 1em;
  margin-left: 1em;
}
th, td {
  border: solid 1px black;
}
</style>
