<template>
    <div>
        ユーザー：{{this.user_name}}
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
        }else{
            window.location.href = '/';
        }
    },
}
</script>
<style>
</style>