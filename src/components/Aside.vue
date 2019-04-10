git<template>
  <div class="ylq_broadside">
    <div class="ylq_broadside_logo">第七小组</div>
    <div class="ylq_broadside_user">
       <div class="ylq_portrait"> <img src="../assets/87ae861b24bc7253c7751333f9face5c.jpeg" width="80" alt></div>
      <div class="ylq_broadside_user_name">超级管理员</div>
      <div class="ylq_broadside_user_hi">hi~ 下午好！</div>
    </div>
    <Menu>
      <Submenu :name="`${index+1}`" v-for="(item,index) in meuns" :key="`${index+1}`">
        <template slot="title">
          <Icon :type="item.icon"/>
          {{item.title}}
        </template>
        <MenuItem
          :name="`${index+1}-${subIndex+1}`"
          v-for="(subItem,subIndex) in item.group"
          :to="`${subItem.path}`"
          :key="`${subIndex}`"
        >{{subItem.title}}</MenuItem>
      </Submenu>
    </Menu>

    <div class="ylq_col">
      <ColorPicker v-model="color5" :colors="colors" @on-change="changebgc"/>

      <div class="ylq_col_font">选择主题</div>
    </div>
  </div>
</template>
<script>
import bgImg1 from "../assets/01.jpg";
export default {
  data() {
    return {
      color5: "#fff",
      colors: ["#311B92", "#512DA8", "#673AB7", "#9575CD", "#D1C4E9"],
      meuns: [
        {
          icon: "logo-linkedin",
          title: "网站总览",
          group: [{ path: "/admin/dataGrid", title: "成员列表" }]
        },

        {
          icon: "ios-create",
          title: "商品管理",
          group: [
            { path: "/admin/goodsList", title: "商品列表" },
            { path: "/admin/goodsAdd", title: "新增商品" }
          ]
        },
        {
          icon: "ios-photos-outline",
          title: "文章管理",
          group: [
            { path: "/admin/article", title: "文章列表" },
            { path: "/admin/ArticleAdd/question", title: "新增文章" }
          ]
        },

        {
          icon: "md-list",
          title: "订单管理",
          group: [
            { path: "/admin/order-list", title: "订单列表" },
            // { path: "/admin/order-edit", title: "编辑订单" }
          ]
        }
      ]
    };
  },

  methods: {
    changebgc(val) {
      if (val !== null) {
        document.querySelector(".ivu-layout-sider").style.background = val;
        document.querySelector(".ivu-layout-sider").style.boxShadow =
          "0px 0px 20px 2px" + val;
          console.log(document.querySelectorAll(".ylq_member ul li"));
          
         if(document.querySelectorAll(".ylq_member ul li")){
           for (let i = 0; i < document.querySelectorAll(".ylq_member ul li").length; i++) {
              document.querySelectorAll(".ylq_member ul li")[i].style.borderColor = val;
           }
            
         }
        setTimeout(() => {
          document.querySelector(".ivu-layout-header").style.background = val;
          document.querySelector(".ivu-layout-header").style.boxShadow =
            "0px 0px 20px 2px" + val;
          document.querySelector(".ivu-layout-header").style.zIndex = 1;
        }, 20);
      }
    }
  }
};
</script>

<style scoped >
.ylq_broadside .ivu-menu-light {
  width: 201px !important;
  background: rgba(0, 0, 0, 0.1) !important;
  color: #fff;

  overflow: hidden;
}
.ylq_broadside .ivu-menu-light li a {
  color: #fff;
}

.ylq_broadside .ylq_broadside_user {
  width: 200px;
  height: 200px;

  overflow: hidden;
}

.ylq_broadside_logo {
  height: 64px;
  color: #ffffff;
  font-size: 18px;
}
.ylq_portrait {
  width: 80px;
  height: 80px;
  background: #ffffff;
  border-radius: 50%;
  margin: 20px auto 10px;
  z-index: 999;
  position: relative;
}.ylq_portrait img {
  border-radius: 50%;
}
    
.ylq_broadside_user_name {
  text-align: center;
  color: #fff;
}

.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) {
  color: #fff !important;
  background: rgba(255, 255, 255, 0.5) !important;
  border: none !important;
}

.ylq_col {
  position: absolute;
  bottom: 0;
  z-index: 999;
}

.ylq_broadside >>> .ylq_col .ivu-color-picker-rel {
  width: 200px;
  background: none;
  border: none;
}

.ylq_broadside >>> .ylq_col .ivu-color-picker-input {
  background: rgba(0, 0, 0, 0.1);
  cursor: pointer;
  border: none;
}

.ylq_col_font {
  position: absolute;
  top: 7px;
  left: 70px;
  color: #fff;
  cursor: pointer;
}

.ylq_broadside_user_hi {
  text-align: center;
  color: #fff;
  margin-top: 15px;
  font-size: 18px;
}
</style>


