<template>
    <div>
        <table>
            <tr>
                <th><label>ID</label></th>
                <td><input type="text" v-model="id"></td>
            </tr>
            <tr>
                <th><label>PASS</label></th>
                <td><input type="text" v-model="pass"></td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    name: 'login',
    data: function(){
        return{
            id:'',
            pass:''
        };
    },
    methods: {
        login(id,pass){
            
        }
    }
}
</script>
<style>
div{
    padding: 10pt;
}
</style>