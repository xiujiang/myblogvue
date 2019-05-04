<template>
  <div>
    <div>
      <wbc-nav></wbc-nav>
      <div class="container">
        <el-row  :gutter="30">
          <el-col :sm="24"  :md="20" >
            <edit-article ref="articleInfo"></edit-article>
          </el-col>
        </el-row>
      </div>
      <wbc-footer></wbc-footer>
    </div>
  </div>
</template>

<script>
  import E from 'wangeditor'
  import header from '../components/header.vue'
  import footer from '../components/footer.vue'
  import temRightlist from '../components/temRightlist.vue'
  import temAbout from '../components/temAbout.vue'
  import editorArticle from "../components/editorArticle"

  export default {
    name: 'addArticle',
    data () {
      return {
        editorContent: ''
      }
    },
    components: { //定义组件
      'edit-article':editorArticle,
      'wbc-nav':header,
      'wbc-about':temAbout,
      'wbc-rightlist':temRightlist,
      'wbc-footer':footer
    },
    methods: {

    },
    mounted() {
    }
  }
</script>

<style scoped>
</style>
