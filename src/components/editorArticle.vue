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
        <RadioGroup v-model="categoryName" type="button">
          <Radio label="java" value="java"></Radio>
          <Radio label="block" value="block"></Radio>
        </RadioGroup>
        <div ref="editor" style="text-align:left;margin-bottom:30px;"></div>
        <Button type="primary" v-on:click="saveInfo">发布内容</Button>
          </div>
    </div>
</template>

<script>
  import {AddArticle,getArticleInfo} from "../utils/server"
  import E from 'wangeditor'
    export default {
    name:"editArticle",
        data() { //选项 / 数据
            return {
              isEditInfo:this.$route.query.isEditInfo,
              aid:(this.$route.query.aid==undefined?0:parseInt(this.$route.query.aid)),
              title:'',
              editorContent: '',
              categoryName:'',
              hasCategoryName:false,
              hasTitle:false,
              categoryId:'',
              description: ''
            }
        },
        methods: { //事件处理器
            saveInfo:function(){
              this.checkInfo()
              AddArticle({title:this.title,content:this.editorContent,authorId:localStorage.getItem('userId'),categoryId:this.categoryId,description:this.description.substr(0,15)},(result)=>{
                if(result.code == "00"){
                   alert("发布成功")
                  this.$router.push({path:'/Home'});
                }
              })
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
            if(this.aid){
              this.userId = JSON.parse(localStorage.getItem('userId'));
              getArticleInfo({articleId:this.aid,authorId:this.userId},function(msg){
                console.log('文章详情',msg);
                if(msg){
                  console.log("msg:",msg.title)
                  this.title=msg.title;
                  this.editorContent = msg.content
                  this.description = msg.description
                }

              })
            }
          }

        },
        components: { //定义组件

        },
      mounted() {
        var editor = new E(this.$refs.editor)
        editor.customConfig.onchange = (html) => {
          this.editorContent = html
          this.description = editor.text()
        }
        editor.create()
        this.initInfo()
      }
    }
</script>

<style scoped>
</style>
