
interface tabdata{
  id?:number
  label:string
  component:string
  data?:object
}
interface UserData{
  is_login:boolean
  user_id:string,
  token:string,
  name:string
}
interface StateData{
  user:UserData,
  tabs:{
    tabcurrent:string
    tablists:tabdata[]
  }
}
export {StateData,UserData,tabdata}
