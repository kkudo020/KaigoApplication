<template>
  <div class="container">
      <div>
          <h1>{{title}}</h1>
          <p>{{message}}</p>
      </div>
      <div>
          <form action="">
              <table>
                  <tr>
                      <th><label>ID</label></th>
                      <td><input type="text" name="" id=""></td>
                  </tr>
                  <tr>
                      <th><label>PASS</label></th>
                      <td><input type="text" name="" id=""></td>
                  </tr>
              </table>
              
              
          </form>
      </div>
      <div>
          <a href="/bed_list" class="button--grey">ベットの利用状況</a><br>
          <a href="/user_list" class="button--grey">利用者一覧</a>
      </div>
  </div>
</template>

<script>

export default {
    data: function(){
        return{
            title:'入所管理画面',
            message:'利用者を選択してください。',
        };
    },
}

</script>
<style>
div{
    padding: 10pt;
}
a{
    margin-top: 1em;
}

</style>