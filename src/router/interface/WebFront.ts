// import axios from 'axios'
import {NetRequest} from '../request'

export default class WebFront{
  req = new NetRequest()
  GetHomeNews(limit:number|string,page:number){
    return this.req.getReq(
      '?s=Dtqz.WebFront.GetHomeNews',{limit,page}
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }
  
  GetWebRotate(){
    return this.req.getReq(
      '?s=Dtqz.WebFront.GetWebRotate'
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }
  GetGeneral(m_class:string){
    return this.req.getReq(
      '?s=Dtqz.WebFront.GetGeneral',{m_class}
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }
  GetNewsList(page:number,p_type:string){
    return this.req.getReq(
      '?s=Dtqz.WebFront.GetNewsList',{page,p_type}
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }
  GetNewsInfo(id:number){
    return this.req.getReq(
      '?s=Dtqz.WebFront.GetNewsInfo',{id}
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }
}


//export  {GetDeals,WebFront}