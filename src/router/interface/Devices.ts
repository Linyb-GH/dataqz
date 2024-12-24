// import axios from 'axios'
import {NetRequest} from '../request'

export default class Devices{
  req = new NetRequest()
  GetNetActions(page:number){
    return this.req.AdmingetReq(
      '?s=Dtqz.Devices.GetNetActions',{page}
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }
  
  GetNetWiringBynum(number:string){
    return this.req.AdmingetReq(
      '?s=Dtqz.Devices.GetNetWiringBynum',{number}
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }
  GetNetipList(page:number){
    return this.req.AdmingetReq(
      '?s=Dtqz.Devices.GetNetipList',{page}
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }
  GetDeviceMoveList(page:number){
    return this.req.AdmingetReq(
      '?s=Dtqz.Devices.GetDeviceMoveList',{page}
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }
  
  GetchangeList(page:number){
    return this.req.AdmingetReq(
      '?s=Dtqz.Devices.GetchangeList',{page}
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }

  GetSystemList(page:number){
    return this.req.AdmingetReq(
      '?s=Dtqz.Devices.GetSystemList',{page}
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }
  GetDeviceBynum(number:string){
    return this.req.AdmingetReq(
      '?s=Dtqz.Devices.GetDeviceBynum',{number}
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }

  GetRepairList(page:number){
    return this.req.AdmingetReq(
      '?s=Dtqz.Devices.GetRepairList',{page}
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }
  GetNetzxList(page:number){
    return this.req.AdmingetReq(
      '?s=Dtqz.Devices.GetNetzxList',{page}
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }

  getRestartList(page:number){
    return this.req.AdmingetReq(
      '?s=Dtqz.Devices.getRestartList',{page}
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }

  DeviceUp(data:object){
    return this.req.AdminpostReq(
      '?s=Dtqz.Devices.DeviceUp',data
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }

  DeviceChange(data:object){
    return this.req.AdminpostReq(
      '?s=Dtqz.Devices.DeviceChange',data
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }

  DeviceRestart(data:object){
    return this.req.AdminpostReq(
      '?s=Dtqz.Devices.DeviceRestart',data
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }

  WiringAction(data:object){
    return this.req.AdminpostReq(
      '?s=Dtqz.Devices.WiringAction',data
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }
  NetZX(data:object){
    return this.req.AdminpostReq(
      '?s=Dtqz.Devices.NetZX',data
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }
  
  WiringDelete(data:object){
    return this.req.AdminpostReq(
      '?s=Dtqz.Devices.WiringDelete',data
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }

  DeviceSystem(data:object){
    return this.req.AdminpostReq(
      '?s=Dtqz.Devices.DeviceSystem',data
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }

  DeviceMove(data:object){
    return this.req.AdminpostReq(
      '?s=Dtqz.Devices.DeviceMove',data
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }

  DeviceOut(data:object){
    return this.req.AdminpostReq(
      '?s=Dtqz.Devices.DeviceOut',data
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }

  DeviceRepair(data:object){
    return this.req.AdminpostReq(
      '?s=Dtqz.Devices.DeviceRepair',data
    ).then((data)=>{
      return data
    }).catch((err)=>{
      console.log(err)
      return false
    })
  }


}

//export  {GetDeals,WebFront}