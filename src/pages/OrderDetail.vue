<template>
  <div>
    <Button @click="value4 = true" type="primary">查看</Button>
    <Drawer :closable="false" width="640" v-model="value4">
      <p :style="pStyle">订单详情</p>
      <div class="demo-drawer-profile">
        <Row>
          <Col span="12">订单id:{{formItem.id}}</Col>
          <Col span="12">账号：{{formItem.mobile}}</Col>
        </Row>
        <Row>
          <Col span="12">会员名称：{{formItem.user_name}}</Col>
          <Col span="12">地址：{{formItem.area}}</Col>
        </Row>
        <Row>
          <Col span="12">快递：{{formItem.expressTitle}}</Col>
          <Col span="12">状态：{{formItem.status}}</Col>
          <Col span="12">购买时间：{{formItem.payment_time}}</Col>
        </Row>
      </div>
      <p :style="pStyle">订单商品列表</p>
      <div class="demo-drawer-profile">
        <Table :columns="columns1" :data="data1"></Table>
      </div>
      <div class="demo-drawer-profile"></div>
    </Drawer>
  </div>
</template>
<script>
export default {
  data() {
    return {
       pageIndex: 1, //当前页码
      pageSize: 1, //条数
      message: [], //数据
      totalcount: 0, //总数
      
      value4: false,
      pStyle: {
        fontSize: "16px",
        color: "rgba(0,0,0,0.85)",
        lineHeight: "25px",
        display: "block",
        marginBottom: "16px"
      },
      formItem:{
        id:"",
        user_name:"",
        area:"",
        expressTitle:"",
        payment_time:"",
        status:"",
        mobile:""
      },
      columns1: [
        {
           title: "商品",
          key: "imgurl",
          width: 100,
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
                  width: "80px"
                }
              })
            ]);
          }
        },
        {
          title: " ",
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
  methods:{
    getDetail(id) {

      this.$axios({
        url: `/admin/order/getorderdetial/${id}`
      }).then(res => {
        // console.log(res);
        const { message } = res.data;
        const {goodslist , orderinfo} = message;
        if (status == 0) {
          this.formItem =orderinfo;
          this.data1 = goodslist;
          // console.log(this.data1)
        }
      });
    },
  },
  mounted(){
      this.getDetail(8)
  }
   

};
</script>
<style scoped>
.demo-drawer-profile {
  font-size: 14px;
}
.demo-drawer-profile .ivu-col {
  margin-bottom: 12px;
}
p {
  font-weight: bolder;
}
.ivu-table-cell >>>  img{
  padding-top: 10px;
}
</style>