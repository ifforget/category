import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    user: {
      uname: "",
      upwd: "",
      time: "",
    },
    userinfo:{

    }
  },
  actions:{
    verifyLogin(context,that){
      let sessionUser = sessionStorage.getItem("user");
      let localUser = localStorage.getItem("user");
      let user = null;
      let flag = true;
      if (sessionUser) {
        user = JSON.parse(sessionUser);
      } else if (localUser) {
        user = JSON.parse(localUser);
        user.time - +new Date() / 1000 > 3600 ? (flag = false) : "";
      } else {
        flag = false;
      }
      if (flag) {
        
        that.$axios({
          url: "/admin/account/login",
          data: user,
          method: "POST",
          withCredentials: true
        }).then(res => {
          const { message, status } = res.data;
          if (status === 0) {
            context.commit("setUserinfo", message);
          } else {
            that.$router.replace("/login")
          }
        });
      } else {
        that.$router.replace("/login")
      }
    }
  },
  mutations: {
    //mutations是用于同步改变state里面的值
    //state是用户修改state里面的数据,user是login里面传过来的值
    //  setUser(state,user){
    //     //改变state里面的数据   传过来this.form
    //     state.user = user;
    //     //把这个数据存储起来
    //     sessionStorage.setItem("user",JSON.stringify(state.user));
    //  },
    //  localUser(state,user){
    //   state.user = user;
    //   localStorage.setItem("user",JSON.stringify(state,user));
    //  },
    setSesUser(state, user) {
      state.user = user;
      sessionStorage.setItem("user", JSON.stringify(state.user))
    },
    setLocUser(state, user) {
      state.user = user;
      //获取当前时间并转换成秒
      state.user.time = + new Date() / 1000;
      localStorage.setItem("user", JSON.stringify(state.user))
    },
    setUserinfo(state, user) {
      state.userinfo = user;
    },
    
  }

})


export default store;
