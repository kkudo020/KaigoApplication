<template>
  <div class="container">
      <div>
          <totop />
          <h1>{{title}}</h1>
          <userName />
          <p>{{message}}</p>
          <button @click="doClick">ひとつ前の画面に戻る</button>
      </div>
      <userTable @nextpage="nextpage"/>
  </div>
</template>

<script>
import userName from '../components/userName';
import userTable from '../components/user_table';
import totop from '../components/totop';

export default {
    data: function(){
        return{
            title:'利用者一覧',
            message:'利用者を選択してください。',
        };
    },
    components:{
        userName,
        userTable,
        totop
    },
    methods:{
        nextpage(p_id){
            let next;
            if(this.$store.state.bedid != ''){
                next = "nyusyokanri_main";
            }else{
                next = "nyusyo_list";
            }
            this.$store.commit('set_userid',p_id);
            this.$router.push(next);
        },
        doClick: function() {
            this.$router.push('/nyusyotop');
        }
    }
}
</script>