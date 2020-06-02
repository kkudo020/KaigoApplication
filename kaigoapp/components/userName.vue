<template>
    <div>
        ユーザー：{{this.user_name}}
        <button @click="logout();">ログアウト</button>
    </div>
</template>

<script>
export default {
    name: 'userName',
    data: function(){
        return{
            user_name:'未ログイン',
        };
    },
    mounted(){
        if(localStorage.user_name){
            this.user_name = localStorage.user_name;
        }
    },
    methods:{
        logout(){
            localStorage.removeItem("user_name");
            this.user_name = localStorage.user_name;
        }
    }
}
</script>
<style>
div{
    padding: 10pt;
}
</style>