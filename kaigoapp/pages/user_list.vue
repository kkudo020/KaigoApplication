<template>
  <div class="container">
      <div>
          <h1>{{title}}</h1>
          <userName />
          <p>{{message}}</p>
      </div>
      <userTable v-bind:name=$route.query.name @nextpage="nextpage"/>
  </div>
</template>

<script>
import userName from '../components/userName';
import userTable from '../components/user_table';

export default {
    data: function(){
        return{
            title:'利用者一覧',
            message:'利用者を選択してください。',
        };
    },
    components:{
        userName,
        userTable
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
        }
    }
}
</script>