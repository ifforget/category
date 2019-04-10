<template>
  <div>
    <div class="btnInput">
      <Button @click="value3 = true" type="primary">编辑</Button>
    </div>
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
s
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
</template>
<script>
export default {
  data() {
    return {
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
        orderstatus: ""
      }
    };
  },

  //方法
  methods: {
    //请求数据
    getEdit() {
      let id = this.$route.params.id;
      id = 3;
      this.$axios({
        url: `/admin/order/getorderdetial/${id}`
      }).then(res => {
        const { message } = res.data;
        if (status == 0) {
          //成功
          this.formItem = message.orderinfo;
        }
      });
    },
    onClose(){
      this.getEdit();
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
          this.$Message.success("订单修改成功");
          //返回订单详情页,重新加载订单详情页
          this.value3 = false;
          this.getEdit();
        }
      });
    },

    //取消请求并重新获取
    onCancel() {
      this.value3 = false;
      this.getEdit();
    }
  },

  //请求数据
  mounted() {
    this.getEdit();
  }
};
</script>
<style scoped>
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

.btnInput >>> .ivu-btn-primary {
  background-color: #fff;
  border-color: #ccc;
  color: black;
}
.btnInput >>> .ivu-btn-primary:hover {
  border-color: #2d8cf0;
  color: #2d8cf0;
}
</style>
