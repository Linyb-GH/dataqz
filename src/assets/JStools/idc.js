import {request} from '../../network/request'

export function IdcTools(){
  this.data = 'haha'
  this.now = nowdate();
  this.location = idclocation();
  this.jiliandata = jiliandata();
 
  //this.deviceslect =   jilian(this.data);
  return ;
  //return instance(config) //因为instance就是promise函数。

}
IdcTools.prototype.deviceslect = function(item,callback){
  //console.log(a)
  item.loading = true;
  request({
    url:'/servers',
    params:{
      action:'getjilianinfo',
      column:item.value
    }
  }).then(res=>{
    let jilian = res.data
    item.children = jilian.message.children
    item.loading = false;
    callback();
  })
}


function nowdate(){
  let cdate = new Date()
  let yy = cdate.getFullYear()
  let mm = (cdate.getMonth()<9? '0'+ (cdate.getMonth()+1):cdate.getMonth()+1)
  let dd = cdate.getDate()<10? '0'+(cdate.getDate()):cdate.getDate()
  return yy + "-" + mm + "-" + dd
}
/**
 * 以下拉级联选择的方式获取机房设备
 */
function jiliandata(){
  return [
    {
      value: '3-2_A',
      label: '3-2_A列',
      children: [],
      loading: false
    },
    {
      value: '3-2_B',
      label: '3-2_B列',
      children: [],
      loading:false
    },
    {
      value: '1-2_A',
      label: '1-2_A列',
      children: [],
      loading:false
    },
  ]
}

/**
 * 下拉的方式为设备选择机柜位置，精确到具体U数
 */
function idclocation(){
  let data = [
    {
      value: 'A',
      label: 'A列',
      children: []
    },
    {
      value: 'B',
      label: 'B列',
      children: []
    },
  ];
  for(let i=1;i<23;i++){
    if(i<10){
      data[0].children.push({'value':'0'+i,label:'0'+i});
      data[1].children.push({'value':'0'+i,label:'0'+i});
    }else{
      data[0].children.push({'value':''+i,label:''+i});
      data[1].children.push({'value':''+i,label:''+i});
    }
  }
  return data
}