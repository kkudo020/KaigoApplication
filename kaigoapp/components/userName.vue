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
            user_name:String;
        };
    },
    mounted(){
        if(localStorage.user_name){
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