<template>
  <div class="login-box-zm">
    <canvas id="canvas"></canvas>
    <div class="login_zm" ref="login_zm">
      <div class="box_zm">
        <h3>后台管理系统</h3>
        <Input prefix="ios-contact" placeholder="请输入用户名" v-model="form.uname"/>
        <Input prefix="ios-contact" placeholder="请输入密码" v-model="form.upwd" type="password"/>
        <Checkbox label="Eat">下次是否无需登录</Checkbox>
        <Button type="success" ghost @click="changeBG">切换背景</Button>
        <Button type="primary" long @click="loginZm">立即登录</Button>
      </div>
    </div>
  </div>
</template>
 
<script>
import loginAnimation from "../plugin/loginAnimation.js";
import dandelion from "../assets/dandelion.png";
import snowflake from "../assets/snowflake.png";
import bgImg1 from "../assets/01.jpg";
import bgImg3 from "../assets/03.jpg";
export default {
  data() {
    return {
      form: {
        uname: "",
        upwd: ""
      },
      dh: "pgy",
      img: dandelion
    };
  },
  methods: {
    changeBG() {
      if (this.dh == "pgy") {
        this.dh = "xh";
        this.img = snowflake;
        this.$refs.login_zm.style.backgroundImage = `url('${bgImg3}')`;

      } else {
        this.dh = "pgy";
        this.img = dandelion;
        this.$refs.login_zm.style.backgroundImage = `url('${bgImg1}')`;
      }
      loginAnimation.execute(this.dh, this.img);
    },
    loginZm() {
      this.$axios({
        url: "/admin/account/login",
        data: this.form,
        method: "POST",
        withCredentials: true
      }).then(res => {
        const { message, status } = res.data;
        if (status == 0) {
          this.$store.commit("setUserinfo", message);
          //果然点击这个按钮时候，√有这个 ivu-checkbox-checked类名
          const hook = document.querySelector(".ivu-checkbox-checked");
          if (hook) {
            //记住密码就永久保存
            this.$store.commit("setLocUser", this.form);
            this.$router.push("/admin");
          } else {
            document
              .querySelector(".ivu-checkbox")
              .classList.remove(".ivu-checkbox-checked");
            //把登录的信息传给index.js  传一个对象
            this.$store.commit("setSesUser", this.form);
            this.$router.push("/admin");
          }
        } else {
          this.$Message.error(message);
        }
      });
    }
  },
  created() {
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
      this.$axios({
        url: "/admin/account/login",
        data: user,
        method: "POST",
        withCredentials: true
      }).then(res => {
        const { message, status } = res.data;
        if (status === 0) {
          this.$store.commit("setUserinfo", message);
          this.$router.replace("/admin");
        }
      });
    }
  },
  mounted() {
    loginAnimation.execute(this.dh, this.img);
    //  先判断本地存储是否有哦数据 有就获取，没有就什么也不做
    // const userJsonStr  =  sessionStorage.getItem("user");
    // const perpetual =  localStorage.getItem("user");
    // if(userJsonStr){
    //      const name = JSON.parse(userJsonStr);
    //      this.form = name;
    //     document.querySelector('.ivu-checkbox').classList.remove('.ivu-checkbox-checked');
    // }else if(perpetual){
    //      const name = JSON.parse(perpetual);
    //      this.form = name;
    //      document.querySelector('.ivu-checkbox').classList.add('.ivu-checkbox-checked');
    // }
  }
};
</script>

<style scoped>
#canvas {
  position: absolute;
  top: 0;
  left: 0;
}
.login-box-zm {
  height: 100%;
}
 .login_zm {
  height: 100%;
  /* background-image: url("https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=179223418,855835344&fm=26&gp=0.jpg"); */
  background-image: url("../assets/01.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  transition: all 1s;
}
.box_zm {
  width: 380px;
  /* height: 400px; */
  /* border: 1px solid #ccc; */
  background-color: rgba(45, 45, 45, 0.2);
  border-radius: 12px;
  color: #fff;
  margin-left: -190px;
  margin-top: -150px;
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 0px 15px 25px;
}
.login-box-zm >>> h3 {
  border-bottom: 1px solid #fff;
  text-align: center;
  height: 42px;
  line-height: 42px;
  font-weight: 400;
  font-size: 18px;
}
.login-box-zm >>> .ivu-input.ivu-input-default.ivu-input-with-prefix {
  background-color: rgba(45, 45, 45, 0.15);
  color: #fff;
  height: 40px;
  font-size: 15px;
}
.login-box-zm >>> .ivu-input-type {
  margin-top: 30px;
}

.login-box-zm >>> .ivu-input-wrapper .ivu-input-prefix i {
  color: #fff;
  font-size: 22px;
  line-height: 40px;
}
.login-box-zm >>> .ivu-input:hover {
  border-color: #fff !important;
}
.login-box-zm >>> .ivu-input:focus {
  border-color: #fff !important;
}
.login-box-zm >>> .ivu-checkbox-wrapper {
  margin-top: 13px;
  margin-bottom: 15px;
}
.login-box-zm >>> .ivu-btn-primary {
  opacity: 0.9;
}

.login-box-zm >>> .ivu-btn-ghost.ivu-btn-success {
  color: skyblue;
  float: right;
  margin-top: 8px;
  border-color: skyblue;
}
</style>
