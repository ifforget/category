<template>
  <div class="admin">
    <Layout>
       <vue-particles
            color="#dedede"
            :particleOpacity="0.7"
            :particlesNumber="80"
            shapeType="circle"
            :particleSize="3"
            linesColor="#dedede"
            :linesWidth="1"
            :lineLinked="true"
            :lineOpacity="0.4"
            :linesDistance="150"
            :moveSpeed="3"
            :hoverEffect="true"
            hoverMode="grab"
            :clickEffect="true"
            clickMode="push"
            class="lizi"
          ></vue-particles>
      <Sider hide-trigger>
        <Aside></Aside>
      </Sider>
      <Layout>

        <Header>
          <Header1></Header1>
        </Header>
        <Content>
         <div style="overflow-x:hidden;height:100%">
           <router-view></router-view>
         </div>
          
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import Header1 from "../components/Header";
import Breadcrumb from "../components/Breadcrumb";
import Aside from "../components/Aside";
export default {
  components: {
    Header1,
    Breadcrumb,
    Aside
  },
  mounted() {
    this.$store.dispatch("verifyLogin", this);
  }
};
</script>

<style>
.admin .ivu-layout-content {
  z-index: 9;
  background-color: #fff;
}
.lizi {
  position: absolute;
  top:0;
  left:0;
  width: 100%;
  z-index: 1;
}
.admin .ivu-layout-has-sider.ivu-layout {
  width: 100%;
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  overflow: hidden;
  margin: 0;
}
.admin .ivu-layout-sider-children {
  width: 100%;
}

.admin .ivu-layout-content {
  overflow: hidden;
}
</style>
