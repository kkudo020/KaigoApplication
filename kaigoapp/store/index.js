import Vuex from 'vuex'

const createStore = ()=>{
    return new Vuex.Store({
        state: function(){
            return {
                userid:'',
                bedid:'',
                stayid:'',
                date:'',
            };
        },
        mutations:{
            set_userid: function(state,id){
                state.userid = id;
            },
            set_bedid: function(state,id){
                state.bedid = id;
            },
            set_stayid: function(state,id){
                state.stayid = id;
            },
            set_date: function(state,id){
                state.date = id;
            },
        },
    })
}

export default createStore