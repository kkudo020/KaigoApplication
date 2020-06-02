<template>
    <div style="text">
        <div>
            <p style="color:red;">{{msg}}</p>
        <table>
            <tr>
                <th><label>ID</label></th>
                <td><input type="text" v-model="id"></td>
            </tr>
            <tr>
                <th><label>PASS</label></th>
                <td><input type="password" v-model="pass"></td>
            </tr>
            <tr>
                <td></td>
                <td><button @click="login();">ログイン</button></td>
            </tr>
        </table>
        </div>
    </div>
</template>

<script>
const axios = require('axios');
let url = "https://kaigo-db-a268b.firebaseio.com/USER";

export default {
    name: 'login',
    data: function(){
        return{
            id:'',
            pass:'',
            msg:'ID[guest] PASS[123abc]',
        };
    },
    methods: {
        login(){
            if(this.id == ''){
                this.msg = "IDが入力されていません";
                return;
            }
            if(this.pass == ''){
                this.msg = "PASSが入力されていません";
                return;
            }
            this.msg = null;
            let input_id = this.id;
            let input_pass = this.pass;
            axios.get(url+"/"+input_id+".json").then((res)=>{
                let result_json = res.data;
                if(result_json == undefined){
                    this.msg = "IDが確認できませんでした。";
                    return;
                }
                console.log(result_json);
                let pass = result_json.PASSWORD;
                console.log(pass+" "+input_pass);
                console.log(pass == input_pass);

                if(pass == input_pass){
                    //ログイン成功
                    localStorage.user_name = result_json.USER_NAME;
                    this.$router.push('/nyusyotop');
                }else{
                    //ログイン失敗
                    this.msg = "ID又はパスワードが間違っています。";
                }
            });
        },
        logout(){
            localStorage.removeItem("user_name");
            this.user_name = localStorage.user_name;
        }
    },
}
</script>
<style>
div{
    padding: 10pt;
}

</style>