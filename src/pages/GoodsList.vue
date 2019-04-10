<template>
  <div class="ylt_goodslist">

    <div class="ylt_goodsbth">
      <Input search enter-button style=" width:300px;float:right" placeholder="请搜索..."/>
      <Button type="success" to="goodsAdd">新增</Button>
      <Button type="error">批量删除</Button>
    </div>

    <div class="ylq_goods_table">
      <Table border :columns="columns12" :data="data6">
        <template slot-scope="{ row }" slot="name">
          <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <Button type="success" size="small" style="margin-right: 5px" @click="show(index)">简介</Button>
          <Button type="error" size="small" style="margin-right: 5px" @click="remove(index)">删除</Button>
             <Button type="primary" size="small" @click="edit(index)">编辑</Button>
        </template>
      </Table>
    </div>
          <Page
        :total="this.totalcount"
        :page-size="this.pageSize"
        @on-change="changepage"
        size="small"
        show-total
        show-elevator
        show-sizer
      />
       <!-- <div> <canvas id="canvas"></canvas></div> -->
  </div>

</template>
<script>
import bollAnimation from "../plugin/bollAnimation.js"

export default {
  data() {
    return {
      pageIndex: 1, //当前页码
      searchvalue: "", //条件获取
      pageSize: 5, //条数
      message: [], //数据
      totalcount: 0, //总数
      columns12: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "ID",
          width: 80,
          key: "id"
        },

        {
          title: "标题",
          key: "title"
        },
        {
          title: "图片",
          key: "img_url",
          width: 140,
          columns: {
            width: "90px"
          },
          render: (h, params) => {
            return h("div", [
              h("img", {
                attrs: {
                  src: params.row.img_url
                },
                style: {
                  width: "100px"
                }
              })
            ]);
          }
        },
        {
          title: "简介",
          key: "sub_title"
        },
        {
          title: "时间",
          key: "add_time"
        },
        {
          title: "Action",
          slot: "action",
          width: 200,
          align: "center"
        }
      ],
      data6: []
    };
  },
  methods: {
    getGoodsList() {
      this.$axios({
        url: "/admin/goods/getlist",
        // params相当于post请求的data
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          searchvalue: this.searchvalue
        }
      }).then(res => {
        if (res.data.status == 0) {
          let { message } = res.data;
          this.message = message;
          this.data6 = message.map(v => {
            return {
              id: v.id,
              img_url: "http://localhost:8899" + v.img_url,
              title: v.title,
              sub_title: v.sub_title,
              add_time: v.add_time
            };
          });
          this.totalcount = res.data.totalcount;

          //   console.log(this.totalcount);
        }
      });
    },
    changepage(index) {
      //总页数
      this.pageIndex = index;
      this.getGoodsList();
    },
    show(index) {
      this.$Modal.info({
        title: "User Info",
        content: `标题：${this.message[index].title}<br>
        <br>时间：${this.message[index].add_time}<br>简介：${
          this.message[index].zhaiyao
        }`
      });
    },
    remove(index) {
      //删除数据
      let id = this.message[index].id;
      this.$axios({
        url: `/admin/goods/del/${id}`,
        withCredentials: true
      }).then(res => {
        if (res.data.status == 0) {
          this.getGoodsList();
        }
      });
    },
    edit(index){
       let id = this.message[index].id;
      this.$router.push(`/admin/goodsEdit/${id}`)
    }
  },
  mounted() {
    // bollAnimation.execute()
    this.getGoodsList();
  }
};
</script>

<style>

/* #canvas{
  top: 0;
  left: 0;

position: absolute;
} */

.ylt_goodslist{
  padding: 30px;

}

.ylt_goodsbth {
  padding: 10px;
}
</style>


