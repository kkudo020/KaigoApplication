<template>
  <div class="container">
    <h1>ベッドの空き状況</h1>
    <no-ssr>
      <v-date-picker 
              :input-props="{ class: 'input', name: 'event_dates' }"
              :mode="mode" 
              :formats="formats"
              :update-on-input="true"
              v-model="selectedDate" @input="inputEvent" >
      </v-date-picker>
    </no-ssr>
    <table>
      <tr>
        <th rowspan="7">1F</th>
        <th></th>
        <th>{{ day1 }}</th>
        <th>{{ day2 }}</th>
        <th>{{ day3 }}</th>
        <th>{{ day4 }}</th>
        <th>{{ day5 }}</th>
        <th>{{ day6 }}</th>
        <th>{{ day7 }}</th>
      </tr>
      <tr>
        <td>101A</td>
        <td><button><a href="/nyusyokanri_main">空</a></button></td>
        <td><button>空</button></td>
        <td><button>空</button></td>
        <td><button>空</button></td>
        <td><button>空</button></td>
        <td><button>空</button></td>
        <td><button>空</button></td>
      </tr>
      <tr>
        <td>101B</td>
        <td><button>空</button></td>
        <td><button>空</button></td>
        <td><button>空</button></td>
        <td><button>空</button></td>
        <td><button>空</button></td>
        <td><button>空</button></td>
        <td><button>空</button></td>
      </tr>
      <tr>
        <td>101C</td>
        <td><button>空</button></td>
        <td><button>空</button></td>
        <td><button>空</button></td>
        <td><button>空</button></td>
        <td><button>空</button></td>
        <td><button>空</button></td>
        <td><button>空</button></td>
      </tr>
      <tr>
        <td>101D</td>
        <td><button>空</button></td>
        <td><button>空</button></td>
        <td><button>空</button></td>
        <td><button>空</button></td>
        <td><button>空</button></td>
        <td><button>空</button></td>
        <td><button>空</button></td>
      </tr>
      <tr>
        <td>102A</td>
        <td><button>空</button></td>
        <td><button>空</button></td>
        <td><button>空</button></td>
        <td><button>空</button></td>
        <td><button>空</button></td>
        <td><button>空</button></td>
        <td><button>空</button></td>
      </tr>
    </table>
  </div>
</template>

<script>


export default {
  data:function() {
    var d = new Date();
    return {
      mode:'single',
      formats: {
        input: ['YYYY-MM-DD'],
      },
      selectedDate:d,
      day1: (d.getMonth() + 1) + '/' + d.getDate() ,
      day2: (d.getMonth() + 1) + '/' + (d.getDate() + 1) ,
      day3: (d.getMonth() + 1) + '/' + (d.getDate() + 2) ,
      day4: (d.getMonth() + 1) + '/' + (d.getDate() + 3) ,
      day5: (d.getMonth() + 1) + '/' + (d.getDate() + 4),
      day6: (d.getMonth() + 1) + '/' + (d.getDate() + 5) ,
      day7: (d.getMonth() + 1) + '/' + (d.getDate() + 6) ,
    }
  },
  methods: {
    inputEvent: function() {
        var newday = this.selectedDate;
        this.day1 = (newday.getMonth() + 1) + '/' + newday.getDate();
        this.day2 = (newday.getMonth() + 1) + '/' + (newday.getDate() + 1);
        this.day3 = (newday.getMonth() + 1) + '/' + (newday.getDate() + 2);
        this.day4 = (newday.getMonth() + 1) + '/' + (newday.getDate() + 3);
        this.day5 = (newday.getMonth() + 1) + '/' + (newday.getDate() + 4);
        this.day6 = (newday.getMonth() + 1) + '/' + (newday.getDate() + 5);
        this.day7 = (newday.getMonth() + 1) + '/' + (newday.getDate() + 6);
      } 
  }
}
</script>

<style>
input {
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
td {
  text-align: center;
}
button {
  background-color: white;
  border: solid 1px white;
}
</style>
