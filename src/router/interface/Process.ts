// import axios from 'axios'
import {NetRequest} from '../request'

export default class Process{
  req = new NetRequest()
  NewNodeProcess(data:object){
    return this.req.AdminpostReq(
      '?s=Dtqz.Process.NewNodeProcess',data
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }

  GetPendingNode(data:object){
    return this.req.AdminpostReq(
      '?s=Dtqz.Process.GetPendingNode',data
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }
  GetProcessNode(id_table:number,modal:string){
    return this.req.AdminpostReq(
      '?s=Dtqz.Process.GetProcessNode',{id_table,modal}
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }

  GetMyProcess(page:number,limit:number,title:string){
    return this.req.AdminpostReq(
      '?s=Dtqz.Process.GetMyProcess',{page,limit,title}
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }

  BackNode(data:object){
    return this.req.AdminpostReq(
      '?s=Dtqz.Process.BackNode',data
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }
}

//export  {GetDeals,WebFront}