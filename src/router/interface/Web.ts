// import axios from 'axios'
import {NetRequest} from '../request'
type InsertFnType = (url: string, alt: string, href: string) => void
export default class Web{
  req = new NetRequest()

  //创建新闻
  NewArticle(data:object){
    return this.req.AdminpostReq(
      '?s=Dtqz.Web.NewArticle',data
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }

  //删除文件
  DeleteFile(id_file:number){
    return this.req.AdminpostReq(
      '?s=Dtqz.Web.DeleteFile',{id_file}
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }

  //新闻置顶
  SetTop(article_id:number){
    return this.req.AdminpostReq(
      '?s=Dtqz.Web.SetTop',{article_id}
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }

  //开启与关闭文章
  UpdateNews(id:number,key:string,value:number){
    return this.req.AdminpostReq(
      '?s=Dtqz.Web.UpdateNews',{id,key,value}
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }

  GetMyNews(page:number){
    return this.req.AdmingetReq(
      '?s=Dtqz.Web.GetMyNews',{page:page}
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }

  newGeneral(data:object){
    return this.req.AdminpostReq(
      '?s=Dtqz.Web.newGeneral',data
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }

  getMyGeneral(page:number,limit:number){
    return this.req.AdmingetReq(
      '?s=Dtqz.Web.getMyGeneral',{page,limit}
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }
  getGeneralInfo(id:string){
    return this.req.AdmingetReq(
      '?s=Dtqz.Web.getGeneralInfo',{id}
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }

  //获取轮播图的接口
  getWebLBT(){
    return this.req.AdmingetReq(
      '?s=Dtqz.Web.getWebLBT',
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }
  
  //获取所有带新闻封面的新闻
  GetWebCovers(page:number,limit:number){
    return this.req.AdmingetReq(
      '?s=Dtqz.Web.GetWebCovers',{page,limit}
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }



  //新闻封面替换
  ChangeCovers(s_id:number,article_id:number){
    return this.req.AdminpostReq(
      '?s=Dtqz.Web.ChangeCovers',{s_id,article_id}
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }



  //创建新闻
  PublishArticle(data:object){
    return this.req.AdminpostReq(
      '?s=Dtqz.Web.PublishArticle',data
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }
  //创建新闻
  PublishGeneral(data:object){
    return this.req.AdminpostReq(
      '?s=Dtqz.Web.PublishGeneral',data
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }
  //编辑器上传本体图片接口
  EditorUploadImage(){
    return{
      server: this.req.Netconfig.dataurl+'?s=Dtqz.Web.EditorUploadImage',
        meta: {
          user_id:this.req.user.user_id,//store.state.user.user_id,
          token:this.req.user.token,//store.state.user.token,
          path:this.req.Netconfig.upload_web,
          ipaddr:this.req.Netconfig.ipAddr
        },
        //最大上传限制 100M
        maxFileSize: 100 * 1024 * 1024,
        //上传失败
        onFailed(file: File, res: any) {   // TS 语法
          // onFailed(file, res) {           // JS 语法
          console.log(`${file.name} 上传失败`, res)
        },
        customInsert(res: any, insertFn: InsertFnType) {  // TS 语法

          let dt = res.data
          // console.log(dt)
            // 从 res 中找到 url alt href ，然后插入图片
            insertFn(dt.url, dt.alt, dt.href)
            // console.log(res)
        },
    }

  }


  GetArticleList(page:number){
    return this.req.AdminpostReq(
      '?s=Dtqz.Web.GetArticleList',{page}
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }

  //文件上传接口
  //id_table：关联其它表的表ID，modal:分类
  UploadFile(id_table:number,modal:string){
    return{
        url:this.req.Netconfig.dataurl+'/?s=Dtqz.Web.UploadFile',
        uploaddata:{
          user_id:this.req.user.user_id,
          token:this.req.user.token,
          id_table,
          path:this.req.Netconfig.upload_web,
          ipaddr:this.req.Netconfig.ipAddr,
          modal
        }
      }
  }
  
  getModalFiles(id_table:number,modal:string){
    return this.req.AdminpostReq(
      '?s=Dtqz.Web.getModalFiles',{id_table,modal}
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }

  getNewsbyID(id:string){
    return this.req.AdminpostReq(
      '?s=Dtqz.Web.getNewsbyID',{id}
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }

  GetMyChecked(page:number){
    return this.req.AdminpostReq(
      '?s=Dtqz.Web.GetMyChecked',{page}
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }
}

//export  {GetDeals,WebFront}