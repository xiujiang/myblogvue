import Vue from 'vue'
import axios, {AxiosRequestConfig} from 'axios'
// axios.defaults.headers.post['Content-Type'] = 'application/json'

// axios.interceptors.request.use(
//   config => {
//     config.headers['Content-Type'] = 'text/plain' // 关键所在
//     return config
//   },
//   error => {
//     console.log(error) // for debug
//     Promise.reject(error)
//   }
// )
//公共路径
// let portUrl = "http://www.mangoya.cn/port/";
// let portUrl = "http://118.24.206.210:8080/MyBlog-1.0-SNAPSHOT/";
let portUrl = "http://localhost:8082/";

//用户注册
const getRegister = (username,password,email,callback) =>{
    let url = portUrl+'user/register?name='+name+'&email='+email+'&password='+password;
    axios.get(url).then(num => {
            callback && callback(num.data)
    })
}

//用户登录
const UserLogin =  (email,password,callback) =>{
  console.log("email:",email,"password",password);
    let url =portUrl+'user/login?email='+email+'&password='+password;
    axios.get(url).then(num => {
            callback && callback(num.data);
    },
    )
}
//用户退出
const LoginOut = (token,callback) =>{
  let url = portUrl + 'user//login/out?token='+token;
  axios.get(url).then(num => {
    callback && callback(num.data);
  })
}

//文章分类查询
const ArtClassData = (callback) => {
    if(sessionStorage.getItem('classList')){
        var data = JSON.parse(sessionStorage.getItem('classList'));
        callback && callback(data)
    }else{
        let url = portUrl + 'category/getAll';
        axios.post(url).then(num => {
              console.log(num);
              if(num.data.code=="00"){
                sessionStorage.setItem('classList',JSON.stringify(num.data.data));
                callback && callback(num.data.data)
            }else{
                alert("查询失败")
            }
        })
    }
}
//
// //实验室 列表项目
// const navMenList  = (callback) => {
//     if(sessionStorage.getItem('navMenList')){
//         var data = JSON.parse(sessionStorage.getItem('navMenList'));
//         callback && callback(data)
//     }else{
//         let url = portUrl + 'nav/navMenList';
//         axios.get(url).then(num => {
//             // console.log(num);
//             if(num.data.code==1001){
//                 sessionStorage.setItem('navMenList',JSON.stringify(num.data.data));
//                 callback && callback(num.data.data)
//             }else{
//                 alert("查询失败")
//             }
//         })
//     }
// }

//查询文章列表
const ShowArticleAll = (info,callback) =>{
  console.log("123123123",info)
  let level = 1;
    if(level == 1){
        var url = portUrl + 'article/findAllArticle?pageNum='+info.pageNum+'&categoryId='+info.categoryId;
    }
    axios.get(url).then(num => {
    callback && callback(num.data);
  })
}

//查询文章列表
const saveOrUpdateArticle = (info,callback,isEdit) =>{
// var url = portUrl + 'article/addArticle?&authorId='+info.authorId+'&categoryId='+info.categoryId+'&title='+info.title+'&content='+info.content+'&description='+info.description;
  var url = portUrl + 'article/addArticle';
  if(isEdit){
    url = portUrl + 'article/updateArticle';
  }else{
    url = portUrl + 'article/addArticle';
  }
  console.log(info)
  axios.post(url,info).then(num => {
    callback && callback(num.data);
  }).catch(function (error) {
    console.log(error);
  })
}

//查询文章详情
const getArticleInfo = (info,callback) =>{
    let url = portUrl + 'article/articleInfo?articleId='+info.articleId;
    console.log("url:",url)
    axios.get(url).then(num => {
      console.log("num:",num.data)
        if(num.data.code=="00"){
            callback && callback(num.data.data);
        }else{
            alert("1");
        }
    })
}

//
// //查询文章评论数据
// const ArticleComment = (artId,commentId,callback) =>{
//     let url = portUrl + 'comment/ArticleComment?art_id='+artId+'&comment_id='+commentId;
//     axios.get(url).then(num => {
//             callback && callback(num.data);
//     })
// }

//文章评论
const setArticleComment = (content,user_id,article_id,leave_pid,pid,callback) =>{
    let url = portUrl + 'comment/setArticleComment?content='+content+'&user_id='+user_id+'&article_id='+article_id+'&leave_pid='+leave_pid+'&pid='+pid;
    axios.get(url).then(num => {
            callback && callback(num.data);
    })
}

//其他评论
const setOuthComment = (content,user_id,article_id,leave_id,leave_pid,pid,callback) =>{
    let url = portUrl + 'comment/setOuthComment?content='+content+'&user_id='+user_id+'&article_id='+article_id+'&leave_id='+leave_id+'&leave_pid='+leave_pid+'&pid='+pid;
    axios.get(url).then(num => {
            callback && callback(num.data);
    })
}



//查询用户信息
const getUserInfo = (userId,callback)=>{
    let url = portUrl + 'Userinfo/getUserInfo?user_id='+userId;
    axios.get(url).then(num => {
        if(num.data.code==1001){
            callback && callback(num.data);
        }else{
            alert("查询失败");
        }
    })
}
//修改用户信息
const UserInfoSave = (obj,callback) =>{
    let url = portUrl + 'Userinfo/UserInfoSave';
    var data = {
        'username':obj.username,
        'user_img':obj.avatar,
        'email':obj.email,
        'sex':obj.sex,
        'friend_start':obj.state,
        'user_id':obj.user_id,
        'frie_name':obj.name,
        'frie_url':obj.url,
        'frie_description':obj.description,
        'friend_img':obj.image,
        'label':obj.label,
        'head_start':obj.head_start,
        'logo_start':obj.logo_start
    };
    // console.log(data);
    axios.get(url,{params:data}).then(num => {
        if(num.data.code==1001){
            callback && callback(num.data.msg);
        }else{
            alert("保存失败");
        }
    })
}

//初始化时间
const initDate = (oldDate,full) => {
    var odate = new Date(oldDate);
    var year =  odate.getFullYear();
    var month = odate.getMonth()<9? '0' + (odate.getMonth()+1) : odate.getMonth()+1;
    var date = odate.getDate()<10? '0'+odate.getDate() : odate.getDate();
    if(full=='all'){
        // var t = oldDate.split(" ")[0];
        console.log("oldDate........",oldDate)
      //2019-04-30T00:32:39
        // console.log(oldDate,t.split('-')[0],t.split('-')[1],t.split('-')[2]);
        let arr = oldDate.split("T");
        return arr[0]+"  "+arr[1];
    }else if(full=='year'){
        return year
    }else if(full== 'month'){
        return odate.getMonth()+1
    }else if(full == 'date'){
        return date
    }else if(full== 'newDate'){
        return year+'年'+month+'月'+date+'日';
    }
}


export {
        getRegister,//注册
        UserLogin,//登录
        LoginOut,//退出登录
        ArtClassData,//分类
        ShowArticleAll,//查询文章列表
        getArticleInfo,//文章详情
        setArticleComment,//设置文章评论
        setOuthComment,//设置其他评论
        getUserInfo,//用户信息查询
        UserInfoSave,//修改用户信息
        initDate,//设置时间
        saveOrUpdateArticle,  //  添加帖子
    }
