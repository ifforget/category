<template>
  <div class="ylq_Article">
    <ul class="ylq_Article_header">
      <li @click="article_li(0)">学员问题汇总</li>
      <li @click="article_li(1)">前端常用功能</li>
      <li @click="article_li(2)">重难点专区</li>
      <li @click="article_li(3)">资源下载</li>
      <li @click="article_li(4)">购物商城</li>
    </ul>

    <div class="ylt_goods_main">
      <div class="ylt_goodsbth">

        <Button type="success" :to="this.skip">新增</Button>
        <Button type="error">批量删除</Button>
      </div>
      <Table border :columns="columns12" :data="data6">
        <template slot-scope="{ row }" slot="name">
          <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="action">  
           <!-- <Button size="small" @click="value4 = true" style="margin-right: 5px" type="success">详情</Button> -->
          <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">修改</Button>
          <Button type="error" size="small" @click="remove(index)">删除</Button>
        </template>
      </Table>

      <Page
        :total="this.total"
        :page-size="this.pageSize"
        @on-change="changepage"
        size="small"
        show-total
        show-elevator
      />
    </div>
<!-- ------------ -->
  <div>
        <Drawer :closable="false" width="640" v-model="value4">
            <p :style="pStyle">User Profile</p>
            <p :style="pStyle">Personal</p>
            <div class="demo-drawer-profile">
                <Row>
                    <Col span="12">
                        Full Name: Aresn
                    </Col>
                    <Col span="12">
                        Account: aresn@aresn.com
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        City: BeiJing
                    </Col>
                    <Col span="12">
                        Country: China
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        Birthday: May 14, 1991
                    </Col>
                    <Col span="12">
                        Website: <a href="https://dev.iviewui.com" target="_blank">https://dev.iviewui.com</a>
                        </Col>
                </Row>
                Message: Hello, Developer
            </div>
            <Divider />
            <p :style="pStyle">Company</p>
            <div class="demo-drawer-profile">
                <Row>
                    <Col span="12">
                        Position: Programmer
                    </Col>
                    <Col span="12">
                        Responsibilities:Coding
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        Department: Map visualization
                    </Col>
                </Row>
                Skills:C / C + +, data structures, software engineering, operating systems, computer networks, databases, compiler theory, computer architecture, Microcomputer Principle and Interface Technology, Computer English, Java, ASP, etc.
            </div>
            <Divider />
            <p :style="pStyle">Contacts</p>
            <div class="demo-drawer-profile">
                <Row>
                    <Col span="12">
                        Email: admin@aresn.com
                    </Col>
                    <Col span="12">
                        Phone Number: +86 18888888888
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        GitHub: <a href="https://github.com/iview/iview" target="_blank">https://github.com/iview/iview</a>
                    </Col>
                </Row>
            </div>
        </Drawer>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      pageIndex: 1,
      pageSize: 8,
      total: 0,
      data1: [],
      por: 0,
      ids: [],
      parameter: ["question", "common", "point", "down", "goods"],
      skip:"ArticleAdd/question",//跳转
      columns12: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          width: 80,
          title: "ID",
          key: "id"
        },
        {
          width: 120,
          title: "作者",
          key: "author"
        },
        {
          title: "name",
          key: "categoryname"
        },
        {
          title: "简介",
          key: "title"
        },
        {
          title: "时间",
          key: "add_time"
        },
        {
          title: "Action",
          slot: "action",
          width: 250,
          align: "center"
        }
      ],
      data6: [],
             value4: false,
                pStyle: {
                    fontSize: '16px',
                    color: 'rgba(0,0,0,0.85)',
                    lineHeight: '24px',
                    display: 'block',
                    marginBottom: '16px'
                },
                message:[],

    };
  },
  methods: {
    article_li(index) {
      this.pageIndex = 1;
      this.por = index;
      this.skip = "ArticleAdd/"+this.parameter[index];
      this.getArticleList(this.por);
    },
    getArticleList(index) {
      //获取数据
      let cc = this.parameter[index];
      this.$axios({
        url: `/admin/article/getlist/${cc}`,
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      }).then(res => {
        let { message } = res.data;
        // console.log(res);
        this.data1 = res.data;
        this.message=message;
        this.data6= message.map(v => {
          return {
            id: v.id,
            author: v.author,
            categoryname: v.categoryname,
            title: v.title,
            add_time: v.add_time
          };
        });
        this.total = res.data.totalcount;
      });
    },
    changepage(index) {//分页
      this.pageIndex = index;
  
      // console.log( this.pageIndex)
      this.getArticleList(this.por);
    },
    show(index) {
    //  parameter
       let id = this.message[index].id;
     let edit_font= this.skip.substring(11)//截取字符串
      this.$router.push(`/admin/articlEdit/${edit_font}/${id}`)
    },
    

    remove(index) {
      //删除

      let id = this.data1.message[index].id;
      let cc = this.parameter[this.por];
     
      this.$axios({
        url: `/admin/article/del/${cc}/${id}`,
        withCredentials: true
      }).then(res => {
        if (res.data.status == 0) {
          this.getArticleList(this.por);
        }
      });
    }
  },
  mounted() {
    this.getArticleList(this.por);
  }
};
</script>

<style>
.ylq_Article {
  padding: 30px;
  list-style: none;
}

.ylq_Article_header {
  height: 40px;
  text-align: center;
}

.ylq_Article_header > li {
  float: left;
  width: 120px;
  height: 40px;
  background: rgba(241, 103, 23, 0.9);
  list-style: none;
  text-align: center;
  color: #fff;
  margin-right: 5px;
  line-height: 40px;
  border-radius: 5px;
  cursor: pointer;
}

.ylt_goods_main {
  padding: 40px;
}
  .demo-drawer-profile{
        font-size: 14px;
    }
    .demo-drawer-profile .ivu-col{
        margin-bottom: 12px;
    }
</style>
