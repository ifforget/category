<template>
  <div class="yle_header">
    <div class="yle_header_left">
      <Breadcrumb>
        <BreadcrumbItem to="/" v-for="(item,index) in routeInfo" :key="index">
          <Icon type="ios-home-outline"></Icon>
          {{item}}
        </BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="yle_header_right">
      <Button
        type="primary"
        shape="circle"
        @click="logout"
        style="float: right;margin-top: 18px;font-size:20px;background: rgba(0, 0, 0, 0.1);border:none"
        icon="md-exit"
        title="退出登录"
      ></Button>
      <!-- <Input search enter-button style="float: left; width:80%;margin-top: 15px" placeholder="Enter something..." /> -->
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    loading() {
      const msg = this.$Message.loading({
        content: "正在退出登录，请稍后...",
        duration: 0
      });
      setTimeout(msg, 800);
    },

    logout() {
      this.$axios({
        url: "/admin/account/logout",
        withCredentials: true
      }).then(res => {
        if (res.data.status === 0) {
          this.loading();
          let that = this;
          sessionStorage.setItem("user","");
          localStorage.setItem("user","");
          setTimeout(function() {
            that.$router.replace("/login");
          }, 1000);
        }
      });
    }
  },
  computed: {
    //面包屑组件的数据
    routeInfo() {
      var arr = this.$route.matched.map(v => {
        return v.meta;
      });
      return arr;
    }
  }
};
</script>

<style>
.yle_header  .ivu-btn{
  z-index: 999;
  position: relative;
}
.yle_header {
  /* margin: 0 -30px;
  margin-top:-64px; */
}

.yle_header span,
.yle_header span > a {
  color: #fff;
}

.yle_header_left {
  float: left;
  width: 300px;
}

.yle_header_right {
  width: 300px;
  height: 64px;
  float: right;
}
</style>
