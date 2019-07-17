<!-- 关于我 -->
<template>
    <div class="tcommonBox" ref="articleInfo">
        <header>
            <!--<h1>-->
                <!--<a href="#/DetailShare" target="_blank">-->
                    <!--写一篇-->
                <!--</a>-->
            <!--</h1>-->
        </header>
      <div>
        <Input v-model="title" placeholder="输入文章标题" style="width: 100%;height: 30px; margin-bottom: 30px" />

        <div style="margin-bottom: 10px">
          <span style="font-size: 13px; font-weight: bold">类型：</span>
          <RadioGroup v-model="categoryName" type="button"  >
            <Radio label="java" value="java"></Radio>
            <Radio label="block" value="block"></Radio>
          </RadioGroup>
        </div>
        <div ref="editor" style="text-align:left;margin-bottom:30px;"></div>
        <Button type="primary" v-on:click="saveInfo">发布内容</Button>
          </div>
    </div>
</template>
<script>
  import {saveOrUpdateArticle,getArticleInfo,ArtClassData} from "../utils/server"
  import E from 'wangeditor'
  const _ = require("lodash")


  export default {
    name:"editArticle",
    data() { //选项 / 数据
      return {
        isEditInfo:this.$route.query.isEditInfo,
        aid:(this.$route.query.aid==undefined?0:parseInt(this.$route.query.aid)),
        title:'',
        editorContent: '',
        categoryName:'java',
        hasCategoryName:false,
        hasTitle:false,
        categoryId:'',
        description: '',
        editor:Object

      }
    },
    methods: { //事件处理器
      saveInfo:function(){
        this.checkInfo()
        console.log(this.title)
        let isEdit = false;
        if(this.aid){
            isEdit=true;
        }
        saveOrUpdateArticle({id: this.aid,title:this.title,content:this.editorContent,authorId:localStorage.getItem('userId'),categoryId:this.categoryId,description:this.description.substring(0,100)},(result)=>{
          if(result.code == "00"){
            alert("发布成功")
            this.$router.push({path:'/Home'});
          }
        },isEdit)
      },
      checkInfo:function () {
        if(!this.title){
          this.hasTitle = true
        }else{
          this.hasTitle = false
        }
        if(!this.hasCategoryName){
          this.hasCategoryName = true
        }else {
          this.hasCategoryName = false
        }
        console.log("classList:",sessionStorage.getItem("classList"))
        let category = JSON.parse(sessionStorage.getItem("classList"));
        category.forEach(c=>{
          if(c.name == this.categoryName){
            this.categoryId = c.id
          }
        })
      },
      initInfo(){
        var that = this;
        console.log("this.aid:",this.aid)
        if(this.aid){
          this.userId = JSON.parse(localStorage.getItem('userId'));
          getArticleInfo({articleId:this.aid,authorId:this.userId},function(msg){
            console.log('文章详情',msg);
            that.title=msg.title
            ArtClassData(function(listInfo) { //文章分类
              listInfo.forEach(o=>{
                if(o.id === msg.categoryId){
                  that.categoryName = o.name
                }
              });
            })
            that.description = msg.description
            that.editorContent = msg.content
            that.editor.txt.html(that.editorContent)
          })
        }
      },

    },
    components: { //定义组件

    },
    mounted(){
      this.editor = new E(this.$refs.editor)
      this.editor.customConfig.uploadImgServer = 'http://localhost:8082/article/article/upload'
      this.editor.customConfig.uploadFileName = 'file'
      this.editor.customConfig.onchange = (html) => {
        this.editorContent = html
        this.description = this.editor.txt.text().replace(/&nbsp;/g,"")
        console.log("description:", this.description.replace(/&nbsp;/g,""))
      }
      this.initInfo()
      this.editor.create()

    }
  }
</script>


<style scoped>
</style>
