// import axios from 'axios'
import {NetRequest} from '../request'

export default class Projects{
  req = new NetRequest()
  getPrjSales(){
    return this.req.AdmingetReq(
      '?s=Dtqz.Projects.getPrjSales'
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }
  getPrjLogs(id:string){
    return this.req.AdmingetReq(
      '?s=Dtqz.Projects.getPrjLogs' ,{id}
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }
  DeletePrjTasks(taskid:string){
    return this.req.AdmingetReq(
      '?s=Dtqz.Projects.DeletePrjTasks' ,{taskid}
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }
  GetPrjTasks(prjid:string){
    return this.req.AdmingetReq(
      '?s=Dtqz.Projects.GetPrjTasks' ,{prjid}
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }
  getTaskInfo(id:string){
    return this.req.AdmingetReq(
      '?s=Dtqz.Projects.getTaskInfo' ,{id}
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }
  getTaskLevels(prjid:string){
    return this.req.AdmingetReq(
      '?s=Dtqz.Projects.getTaskLevels' ,{prjid}
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }
  ModifyPrjInfo(id:string,datakey:string,datavalue:string){
    return this.req.AdmingetReq(
      '?s=Dtqz.Projects.ModifyPrjInfo',{id,datakey,datavalue}
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }
  ModifyTaskInfo(id:string,datakey:string,datavalue:string){
    return this.req.AdmingetReq(
      '?s=Dtqz.Projects.ModifyTaskInfo',{id,datakey,datavalue}
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }
  ModifyTaskSetTodo(id_task:string,settings:string){
    return this.req.AdmingetReq(
      '?s=Dtqz.Projects.ModifyTaskSetTodo',{id_task,settings}
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }
  DealTodo(id:string){
    return this.req.AdmingetReq(
      '?s=Dtqz.Projects.DealTodo',{id}
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }
  
  getPrjInfo(id:string){
    return this.req.AdmingetReq(
      '?s=Dtqz.Projects.getPrjInfo',{id}
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }

  GetPrjWeekly(data:object){
    return this.req.AdmingetReq(
      '?s=Dtqz.Projects.GetPrjWeekly',data
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }
  getRPrjWeekly(){
    return this.req.AdmingetReq(
      '?s=Dtqz.Projects.getRPrjWeekly',
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }
  getPrjContracts(page:number,sereach:string){
    return this.req.AdmingetReq(
      '?s=Dtqz.Projects.getPrjContracts',{page,sereach}
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }

  DeleteContract(id:string){
    return this.req.AdmingetReq(
      '?s=Dtqz.Projects.DeleteContract',{id}
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }

  UpdateContract(id:string,data:string){
    return this.req.AdmingetReq(
      '?s=Dtqz.Projects.UpdateContract',{id,data}
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }

  GetRPrjstatistic(data:object){
    return this.req.AdmingetReq(
      '?s=Dtqz.Projects.GetRPrjstatistic',data
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }

  GetRPrjLogs(page:number){
    return this.req.AdmingetReq(
      '?s=Dtqz.Projects.GetRPrjLogs',{page}
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }
  
  PrjHandover(id:string,id_touser:string){
    return this.req.AdmingetReq(
      '?s=Dtqz.Projects.PrjHandover',{id,id_touser}
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }
  GetPrjDetailed(id:string){
    return this.req.AdmingetReq(
      '?s=Dtqz.Projects.GetPrjDetailed',{id}
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }
  getTaskSetting(id:string){
    return this.req.AdmingetReq(
      '?s=Dtqz.Projects.getTaskSetting',{id}
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }
  
  GetRPrjList(data:object){
    return this.req.AdmingetReq(
      '?s=Dtqz.Projects.GetRPrjList',data
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }

  getRTaskList(data:object){
    return this.req.AdmingetReq(
      '?s=Dtqz.Projects.getRTaskList',data
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }
  

  GetRPrjInfo(prjid:string){
    return this.req.AdmingetReq(
      '?s=Dtqz.Projects.GetRPrjInfo',{prjid}
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }

  GetTaskList(data:object){
    return this.req.AdmingetReq(
      '?s=Dtqz.Projects.GetTaskList',data
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }
  

  //文件上传接口
  //id_table：关联其它表的表ID，modal:分类
  UploadFile(id_prj:string,id_task:string,modal:string){
    return{
      url:this.req.Netconfig.dataurl+'/?s=Dtqz.Projects.UploadFile',
      uploaddata:{
        user_id:this.req.user.user_id,
        token:this.req.user.token,
        id_task,id_prj,
        path:this.req.Netconfig.upload_prj,
        ipaddr:this.req.Netconfig.ipAddr,
        modal
      }
    }
  }
  
  GetPrjFiles(type:string,id:string){
    return this.req.AdmingetReq(
      '?s=Dtqz.Projects.GetPrjFiles',{type,id}
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }
  DeletePrjFiles(id:string){
    return this.req.AdmingetReq(
      '?s=Dtqz.Projects.DeletePrjFiles',{id}
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }
  PrjDelete(prjid:string){
    return this.req.AdmingetReq(
      '?s=Dtqz.Projects.PrjDelete',{prjid}
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }
  
  FileRename(id:string,newname:string){
    return this.req.AdmingetReq(
      '?s=Dtqz.Projects.FileRename',{id,newname}
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }
  DownFile(id:string){
    let pro = this.req.Netconfig.dataurl
    let r = '?s=Dtqz.Projects.DownFile'
    let userinfo ='&user_id='+ this.req.user.user_id+'&token='+this.req.user.token+'&id='+id
    return pro+r+userinfo
  }
  
  getPrjList(data:object){
    return this.req.AdminpostReq(
      '?s=Dtqz.Projects.getPrjList',data
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }


  NewPrj(data:object){
    return this.req.AdminpostReq(
      '?s=Dtqz.Projects.NewPrj',data
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }

  NewPrjMail(data:object){
    return this.req.AdminpostReq(
      '?s=Dtqz.Projects.NewPrjMail',data
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }
  PrjMailList(setFrom:string,page:string){
    return this.req.AdmingetReq(
      '?s=Dtqz.Projects.PrjMailList',{setFrom,page}
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }

  NewContract(data:object){
    return this.req.AdminpostReq(
      '?s=Dtqz.Projects.NewContract',data
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }

  NewTask(data:object){
    return this.req.AdminpostReq(
      '?s=Dtqz.Projects.NewTask',data
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }
  NewTaskDoing(data:object){
    return this.req.AdminpostReq(
      '?s=Dtqz.Projects.NewTaskDoing',data
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }
  NewParticipant(data:object){
    return this.req.AdminpostReq(
      '?s=Dtqz.Projects.NewParticipant',data
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }
  DeleteParticipant(id:string){
    return this.req.AdminpostReq(
      '?s=Dtqz.Projects.DeleteParticipant',{id}
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }
  getTaskDoing(id:string){
    return this.req.AdmingetReq(
      '?s=Dtqz.Projects.getTaskDoing',{id}
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }
  GetParticipant(type:string,id:string){
    return this.req.AdmingetReq(
      '?s=Dtqz.Projects.GetParticipant',{type,id}
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }
  
}

//export  {GetDeals,WebFront}