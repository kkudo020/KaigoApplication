<template>
  <div class="container">
      <div>
          <totop />
          <back />
          <h1>{{title}}</h1>
          <userName />
          <p>{{message}}</p>
      </div>
      <userTable @nextpage="nextpage"/>
  </div>
</template>

<script>
import userName from '../components/userName';
import userTable from '../components/user_table';
import totop from '../components/totop';
import back from '../components/back';

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
        totop,
        back
    },
    methods:{
        nextpage(p_id){
            let next;
            this.$store.commit('set_url',"/user_list");
            if(this.$store.state.bedid != ''){
                next = "nyusyokanri_main";
            }else{
                next = "nyusyo_list";
            }
            this.$store.commit('set_userid',p_id);
            this.$router.push(next);
        },
    }
}
</script>