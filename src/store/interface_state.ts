
interface tabdata{
  id?:number
  label:string
  component:string
  data?:object
}
interface UserData{
  is_login:boolean
  user_id:string
  token:string
  name:string
  avatar:string
}

interface StateData{
  user:UserData,
  tabs:{
    tabcurrent:string
    tablists:tabdata[]
  },
  notices:{
    todoList:[
      { title:string,
      content:string,
      tag:string,
      tagProps: {color: string},
      read: number}
    ]
  },

  page_data:[{
    manu:object
    micon:object
    sider:[{
      icon:string,sidername:string,sidermem:[{
        itemname:string,url:string}]
    }]
  }],
}
export {StateData,UserData,tabdata,}
