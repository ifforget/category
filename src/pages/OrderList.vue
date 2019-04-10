<template>
<div class="bg-scroll">
  <div style="padding: 40px; padding-top:80px;height:100%;" class="orderList">
    <Row :gutter="32">
      <Col span="12">
        <Button style="margin-right: 20px;" @click="handleAll">全部</Button>
        <Button style="margin-right: 20px;" @click="handleNone">待付款</Button>
        <Button @click="handleAlready">已付款</Button>
      </Col>
      <Col span="6">
        <Form>
          <Select v-model="orderstatus">
            <Option value="0">全部</Option>
            <Option value="1">待付款</Option>
            <Option value="2">已付款</Option>
            <Option value="3">已发货</Option>
            <Option value="4">已验收</Option>
            <Option value="5">取消</Option>
          </Select>
        </Form>
      </Col>
      <Col span="6">
        <Input v-model="vipname" @on-enter="handleSearch">
          <Button slot="append" icon="ios-search" @click="handleSearch"></Button>
        </Input>
      </Col>
    </Row>
    <Row :gutter="16" class="title">
      <Col span="3">订单id</Col>
      <Col span="3">会员名称</Col>
      <Col span="6">地址</Col>
      <Col span="3">快递</Col>
      <Col span="6">状态</Col>
      <Col span="3">操作</Col>
    </Row>
    <div v-for="(item,index) in message" class="orderList_item">
      <Row class="orderList_title">
        <Col span="6">订单完成时间：{{item.complete_time}}</Col>
        <Col span="7">订单号：{{item.order_no}}</Col>
      </Row>
      <Row :gutter="16" class="orderList_content">
        <Col span="3" style="padding-left:30px;">{{item.id}}</Col>
        <Col span="3" style="padding-left:0;">
          <div style="float:left">
            <img src="../assets/87ae861b24bc7253c7751333f9face5c.jpeg" alt>
          </div>
          <div style="float:left">{{item.user_name}}</div>
        </Col>
        <Col span="6">{{item.area}}</Col>
        <Col span="3">{{item.expressTitle}}</Col>
        <Col span="6">{{item.statusName}}</Col>
        <Col span="3">
          <Button type="primary" style="margin-right: 10px;" @click="handleEdit(item.id)">编辑</Button>
          <Button type="error" @click="handleDetail(item.id)">查看</Button>
        </Col>  
      </Row> 
    </div> 
    <Page
        :total="totalPage"
        :show-sizer="true"
        :show-total="true"
        :page-size="5"
        class-name="page"
        :page-size-opts="[5,10,15,20]"
        :show-elevator="true"
        @on-change="handlePageChange"
        @on-page-size-change="handlePageSize"
      />

      <Drawer title="编辑订单" v-model="value3" width="720" :mask-closable="true" @on-close="onClose">
        <Form :model="formItem" :label-width="80">
          <FormItem label="订单">{{formItem.id}}</FormItem>

          <FormItem label="快递单号">
            <Input v-model="formItem.express_no"></Input>
          </FormItem>

          <FormItem label="快递费用">
            <Input v-model="formItem.express_fee"></Input>
          </FormItem>

          <FormItem label="收件人">
            <Input v-model="formItem.accept_name"></Input>
          </FormItem>

          <FormItem label="收货电话">
            <Input v-model="formItem.telphone"></Input>
          </FormItem>

          <FormItem label="收货手机">
            <Input v-model="formItem.mobile"></Input>
          </FormItem>

          <FormItem label="收货邮箱">
            <Input v-model="formItem.email"></Input>
          </FormItem>

          <FormItem label="收货地区">
            <Input v-model="formItem.area"></Input>
          </FormItem>

          <FormItem label="收货地址">
            <Input v-model="formItem.address" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
          </FormItem>

          <FormItem label="收货备注">
            <Input v-model="formItem.message" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
          </FormItem>

          <FormItem label="总金额">
            <Input v-model="formItem.order_amount"></Input>
          </FormItem>

          <FormItem label="订单状态">
            <Select v-model="formItem.orderstatus">
              <Option value="1">订单已经生成（待付款）</Option>
              <Option value="2">已付款等待发货</Option>
              <Option value="3">已发货，待完成</Option>
              <Option value="4">已签收，已完成</Option>
              <Option value="5">已取消</Option>
            </Select>
          </FormItem>

        <FormItem>
          <Button type="primary" @click="onSubmit">立即创建</Button>
          <Button style="margin-left: 8px" @click="onClose">取消</Button>
        </FormItem>
      </Form>
      </Drawer>

    <Drawer :closable="false" width="640" v-model="value4">
      <p>订单详情</p>
      <div class="demo-drawer-profile">
        <Row>
          <Col span="12">订单id:{{formItem.id}}</Col>
        </Row>
        <Row>
          <Col span="12">会员名称：{{formItem.user_name}}</Col>
        </Row>
        <Row>
          <Col span="12">地址：{{formItem.area}}</Col>
        </Row>
        <Row>
          <Col span="12">快递：{{formItem.expressTitle}}</Col>
        </Row>
        <Row>
          <Col span="12">状态：{{formItem.paymentTitle}}</Col>
        </Row>
        <Row>
          <Col span="12">购买时间：{{formItem.payment_time}}</Col>
        </Row>
      </div>
      <p>订单商品列表</p>
      <Table :columns="columns1" :data="data1"></Table>
    </Drawer>
    <Drawer title="编辑订单" v-model="value3" width="720" :mask-closable="true" @on-close="onClose">
      <Form :model="formItem" :label-width="80">
        <FormItem label="订单">{{formItem.id}}</FormItem>

        <FormItem label="快递单号">
          <Input v-model="formItem.express_no"></Input>
        </FormItem>

        <FormItem label="快递费用">
          <Input v-model="formItem.express_fee"></Input>
        </FormItem>

        <FormItem label="收件人">
          <Input v-model="formItem.accept_name"></Input>
        </FormItem>

        <FormItem label="收货电话">
          <Input v-model="formItem.telphone"></Input>
        </FormItem>

        <FormItem label="收货手机">
          <Input v-model="formItem.mobile"></Input>
        </FormItem>

        <FormItem label="收货邮箱">
          <Input v-model="formItem.email"></Input>
        </FormItem>

        <FormItem label="收货地区">
          <Input v-model="formItem.area"></Input>
        </FormItem>

        <FormItem label="收货地址">
          <Input v-model="formItem.address" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
        </FormItem>

        <FormItem label="收货备注">
          <Input v-model="formItem.message" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
        </FormItem>

        <FormItem label="总金额">
          <Input v-model="formItem.order_amount"></Input>
        </FormItem>

        <FormItem label="订单状态">
          <Select v-model="formItem.orderstatus">
            <Option value="1">订单已经生成（待付款）</Option>
            <Option value="2">已付款等待发货</Option>
            <Option value="3">已发货，待完成</Option>
            <Option value="4">已签收，已完成</Option>
            <Option value="5">已取消</Option>
          </Select>
        </FormItem>

        <FormItem>
          <Button type="primary" @click="onSubmit">立即创建</Button>
          <Button style="margin-left: 8px" @click="onCancel">取消</Button>
        </FormItem>
      </Form>
    </Drawer>
  </div>
</div>
  
</template>
<script>
import bgImg1 from "../assets/01.jpg";
export default {
  data() {
    return {
      pageIndex: 1,
      pageSize: 5,
      orderstatus: 0,
      vipname: "",
      totalPage: 1,
      message: [],

      value3: false,
      formItem: {
        id: "",
        express_no: "",
        express_fee: "",
        accept_name: "",
        telphone: "",
        mobile: "",
        email: "",
        area: "",
        address: "",
        message: "",
        order_amount: "",
        orderstatus: "",

        user_name: "",
        expressTitle: "",
        payment_time: ""
      },
      value4: false,

      columns1: [
         {
          title: "商品",
          key: "imgurl",
          width: 80,
          columns: {
            width: "50px"
          },
          render: (h, params) => {
            return h("div", [
              h("img", {
                attrs: {
                  src: params.row.imgurl
                },
                style: {
                  width: "60px",
                  height: "60px",
                  marginTop: "10px"
                }
              })
            ]);
          }
        },
        {
          title: " ",
          width: 200,
          key: "goods_title"
        },
        {
          title: "类型",
          key: "goods_no"
        },
        {
          title: "价格",
          key: "goods_price"
        }
      ],
      data1: []
    };
  },

  mounted: function() {
    this.getList();
  },

  methods: {
    //渲染列表
    getList() {
      this.$axios({
        url: "/admin/order/getorderlist",
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          orderstatus: this.orderstatus,
          vipname: this.vipname
        },
        withCredentials: true
      }).then(res => {
        // console.log(res);
        const { message } = res.data;
        this.message = message;
        this.totalPage = res.data.totalcount;
      });
    },
    //分页 页码改变
    handlePageChange(page) {
      this.pageIndex = page;
      this.getList();
    },
    //页码条数改变时触发
    handlePageSize(pagesize) {
      this.pageSize = pagesize;
      this.getList();
    },
    //点击全部
    handleAll() {
      this.orderstatus = 0;
    },
    //点击未付款
    handleNone() {
      this.orderstatus = 1;
    },
    //点击已付款
    handleAlready() {
      this.orderstatus = 2;
    },
    //点击搜索
    handleSearch() {
      this.getList();
    },

    //点击编辑  抽屉
    handleEdit(id) {
      this.value3 = true;
      this.getEdit(id);
    },
    //请求数据
    getEdit(id) {
      this.$axios({
        url: `/admin/order/getorderdetial/${id}`
      }).then(res => {
        const { message } = res.data;
        const {goodslist,orderinfo} = message;
        if (status == 0) {
          this.formItem = orderinfo;
          this.data1 = goodslist;
        }
      });
    },
    //点击X 关闭抽屉
    onClose() {
      this.value3 = false;
    },
    //立即创建
    onSubmit() {
      this.$axios({
        url: `/admin/order/updateorder`,
        method: "POST",
        data: {
          orderinfo: this.formItem
        },
        withCredentials: true
      }).then(res => {
        const { message, status } = res.data;
        //编辑成功
        if (status == 0) {
          //提示消息框
          this.$Message.success("数据编辑成功");
          //返回订单详情页,重新加载订单详情页
          this.value3 = false;
          this.getList();
        }
      });
    },
    //订单详情页
    handleDetail(id) {
      this.value4 = true;
      this.getEdit(id);
    }
  },

  watch: {
    orderstatus() {
      this.getList();
    }
  }
};
</script>

<style scoped>
.bg-scroll {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-image: url("../assets/01.jpg");
  padding-bottom: 100px;
  height: 100%;
  overflow-x: hidden;
  position: relative;
}

.title {
  margin-top: 20px;
  border-radius: 3px;
  height: 45px;
  line-height: 45px;
  color: #666;
  font-size: 14px;
  font-weight: 700;
  background-color: rgba(255, 255, 255, 0.3);
}
.orderList_item {
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
}
.orderList_title {
  line-height: 22px;
  text-indent: 10px;
  background-color: rgba(241, 236, 236, 0.7);
}
.orderList_content {
  line-height: 50px;
  background-color: rgba(255, 255, 255, 0.9);
}
.orderList >>> .ivu-row {
  margin-left: 0 !important;
  margin-right: 0 !important;
}
.orderList_content img {
  width: 40px;
  margin: 5px;
  display: block;
  border-radius: 20px;
}
.ivu-input-group {
  top: 0;
}
.page {
  margin-top: 20px;
}
.orderList >>> .ivu-input:focus {
  outline: none;
  box-shadow: none;
  border-color: #57a3f3;
}
.orderList >>> .ivu-input:hover,
.orderList >>> .ivu-select-selection:hover {
  border-color: #ccc;
}
.orderList >>> .ivu-input-group-append .ivu-btn {
  box-shadow: none;
}
.orderList >>> .ivu-select-visible .ivu-select-selection {
  outline: none;
  box-shadow: none;
}

.demo-drawer-footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 1px solid #e8e8e8;
  padding: 10px 16px;
  text-align: left;
  background: #fff;
}

.orderList >>> .ivu-btn-primary {
  background-color: #fff;
  border-color: #ccc;
  color: black;
}
.orderList >>> .ivu-btn-primary:hover {
  border-color: #2d8cf0;
  color: #2d8cf0;
}

.demo-drawer-profile {
  font-size: 16px;
  color: #333;
}
.demo-drawer-profile .ivu-col {
  margin-bottom: 12px;
}
p {
  font-weight: bolder;
  font-size: 18px;
  color: #000;
  line-height: 50px;
}
.orderList
  >>> .ivu-drawer.ivu-drawer-right.ivu-drawer-no-header
  .ivu-drawer-content {
  background-color: #57a3f3 !important;
}
</style>
