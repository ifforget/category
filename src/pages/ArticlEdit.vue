<template>
  <div class="ylq_goodsadd">
    <Form :model="formItem" :label-width="80">
      <FormItem label="文章所属所属类别">
         <Select  v-model="formItem.category_id">
          <Option 
          v-for="(item,index) in categorys"
          :label="item.title"
          :key="index"
          :value="item.id"
          ></Option>
              </Select>
      </FormItem>

      <FormItem label="推荐类名">
        <CheckboxGroup ></CheckboxGroup>
          <Checkbox  v-model="formItem.is_top">热门</Checkbox>
          <Checkbox  v-model="formItem.is_hot">置顶</Checkbox>
        </CheckboxGroup>
      </FormItem>

      <FormItem label="是否发布">
        <i-switch v-model="formItem.status" size="large">
          <span slot="open">是</span>
          <span slot="close">否</span>
        </i-switch>
      </FormItem>

      <FormItem label="标题">
        <Input v-model="formItem.title"></Input>
      </FormItem>

      <FormItem label="副标题">
        <Input v-model="formItem.sub_title"></Input>
      </FormItem>

      <FormItem label="封面图片">
        <Upload multiple type="drag" 
         action="http://localhost:8899/admin/article/uploadimg"
                :on-success="handleAvatarSuccess"
        >
        
          <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>点击上传或者拖拽上传</p>
          </div>
        </Upload>
      </FormItem>

      <FormItem label="图片">
        <Upload multiple  
        :max-size="2048"
         action="http://localhost:8899/admin/article/uploadimg"
            :on-success="handlePictureCard"
        >
          <Button icon="ios-cloud-upload-outline">上传多张图片</Button>
        </Upload>
      </FormItem>

      <FormItem label="内容摘要">
        <Input
        v-model="formItem.zhaiyao"
          type="textarea"
          :autosize="{minRows: 2,maxRows: 5}"
          placeholder="Enter something..."
        ></Input>
      </FormItem>

      <FormItem label="内容简介">
        <quillEditor v-model="formItem.content"></quillEditor>
      </FormItem>

      <FormItem>
        <Button type="primary"  @click="onSubmit">修改</Button>
        <Button style="margin-left: 8px"  @click="towclick">取消</Button>
      </FormItem>
    </Form>
  </div>
</template>

<style>
.ylq_goodsadd {
  padding: 30px;
}
</style>

<script>
// 1.添加样式
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

// 2.导入组件并且注册局部组件
import { quillEditor } from "vue-quill-editor";
import { setTimeout } from "timers";

export default {
  components: {
    // 编辑器组件
    quillEditor
  },
  data() {
    return {
      formItem: {
        category_id: "", // 所属类别id
        status: false,
        is_top: false,
        is_hot: false,
        title: "",
        sub_title: "",
        imgList: [],
        fileList: [],
        content: "",
        zhaiyao: "",
        is_slide: false 
      },
     parameter: ["question", "common", "point", "down", "goods"],
      categorys:[],
    };
  },
  methods:{
       success (nodesc) {
      this.$Notice.success({
       title: '哦豁，修改成功！',
          });
            },
      onSubmit(){//点击修改
         this.$axios({
         url: `/admin/article/edit/${this.$route.params.id}/${this.$route.params.is}`,
        method: "POST",
        data:this.formItem,
        //跨域
        withCredentials: true
         }).then(res=>{
             if(res.data.status==0){
             this.success(true)
              this.$router.back();
             }
         })
      },
 towclick(){
     this.$router.back();
},

          //单图片上传后
    handleAvatarSuccess(res, file) {
      this.formItem.imgList[0] = res;
  },
      //多图上传成功
    handlePictureCard(res, file) {
        res.size=12345
   this.formItem.fileList.push(res);
    },
  },
    mounted(){
   this.$axios({//类型数据
      url: `/admin/article/getcategorylist/${this.$route.params.id}`
   }).then(res=>{
      //  console.log(res)
     let {message}=res.data;
      this.categorys=message; //存储
   })

   this.$axios({//获取数据
      url:`admin/article/getarticle/${this.$route.params.id}/${this.$route.params.is}`
   }).then(res=>{
     let {message}=res.data;
      this.formItem = message; //存储到data
   })
  }
};
</script>
