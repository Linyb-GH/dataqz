<template>
  <div class="bodysty">
    <div style="width:100vw">
      <Button @click="devin" style="float:left;margin-left:30px;margin-top:20px" type="primary">设备上架</Button>
      <Button @click="devout" style="float:left;margin-left:10px;margin-top:20px" type="primary">设备下架</Button>
      <Button @click="devmove" style="float:left;margin-left:10px;margin-top:20px" type="primary">设备迁移</Button>
      <!-- <Button @click="movedev" style="float:left;margin-left:10px;margin-top:20px" type="primary">测试tabs</Button> -->
    </div>
    <Table class="tablesty" :columns="columns" :data="devices">
      <template #name="{ row }" >
        <a :href= urlstr+row.number>{{ row.name }}</a>
      </template>
      <template #state="{ index,row }">
        <Button type="warning" :disabled = "row.state == '已完成'" size="small" @click="statebtn(index)">{{row.state}}</Button>
      </template>
    </Table>
    <div style="width:100vw">
      <Page class="pagesty" @on-change="tuenpage" :total="pagenum" />
    </div>

    <Modal v-model="modalin" :styles="{top: '50px'}" 
      @on-ok="modalinconfirm" @on-cancel="modalcancel" width="700">
      <p slot="header" style="color:#f60;text-align:center">
          <Icon type="ios-information-circle"></Icon>
          <span>设备上架编辑框</span>
      </p>
      <div style="text-align:center">
        <Form :model="modalindata" :label-width="80">
          <Row>
            <Col span="12">
              <FormItem label="设备名称">
                <Input v-model="modalindata.name" placeholder="Enter something..."></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="上架日期">
                <DatePicker  v-model="modalindata.date" placeholder="Select date" style="width: 200px" />
                <!-- <Input type="date" v-model="modalindata.date" placeholder="Enter something..."></Input> -->
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="设备厂商" >
                <Input v-model="modalindata.manufacturer" placeholder="设备厂商"></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="设备型号">
                <Input v-model="modalindata.devicemodel" placeholder="设备型号"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="序列号" >
                <Input v-model="modalindata.serial" placeholder="序列号"></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="设备类型" >
                <Select v-model="modalindata.types">
                  <Option v-for="(item,i) in SelectData.types" :key="i"  :value="item">{{item}}</Option>
                </Select>
              </FormItem>
              
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="列位置" >
                <Select v-model="modalindata.column">
                  <Option v-for="(item,i) in SelectData.columns" :key="i"  :value="item">{{item}}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="行位置" >
                <Select v-model="modalindata.row">
                  <Option v-for="(item,i) in SelectData.rows" :key="i"  :value="item">{{item}}</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="U数位置">
                <Select v-model="modalindata.Usite">
                  <Option v-for="(item,i) in SelectData.Usite" :key="i"  :value="item">{{item}}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="上架机房">
                <RadioGroup v-model="modalindata.room">
                  <Radio label="3-2">3-2</Radio>
                  <Radio label="1-2">1-2</Radio>
                </RadioGroup>
              </FormItem>
            </Col>
          </Row>
        
          <Row>
            <Col span="12">
              <FormItem label="设备归属" >
                <Select v-model="modalindata.belong" placeholder="设备归属">
                  <Option v-for="(item,i) in SelectData.belong" :key="i"  :value="item">{{item}}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="大小(U)">
                <InputNumber :max="40" :min="1" v-model="modalindata.size" />
                <!-- <Input v-model="modalindata.size" placeholder="设备大小/U"></Input> -->
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="联系人" >
                <Input v-model="modalindata.contact" placeholder="上架对接联系人"></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="备注" >
                <Input v-model="modalindata.remark" placeholder="备注"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="上架状态">
                <RadioGroup v-model="modalindata.state">
                  <Radio label="待完成">待完成</Radio>
                  <Radio label="已完成">已完成</Radio>
                </RadioGroup>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal>
    <Modal v-model="modalout" footer-hide width="560">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>设备迁出编辑框</span>
      </p>
      <div style="text-align:center">
        <Form :model="modaloutdata"  :label-width="80">
          <Row>
            <Col span="12">
              <FormItem label="设备编号" >
                <Input v-model="modaloutdata.number" @on-blur = "selectdevice"  placeholder="设备编号"></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="状态">
                <RadioGroup v-model="modaloutdata.state" >
                  <Radio label="已完成" disabled>已完成</Radio>
                  <Radio label="待完成" disabled>待完成</Radio>
                </RadioGroup>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="设备名称" >
                <Input v-model="modaloutdata.name" @on-blur = "selectdevice"  placeholder="设备编号"></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="序列号" >
                <Input v-model="modaloutdata.serial" @on-blur = "selectdevice"  placeholder="设备编号"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="日期">
                <DatePicker  v-model="modaloutdata.date" placeholder="迁出时间" style="width: auto" />
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="联系人员">
                <Input v-model="modaloutdata.contact"  placeholder="迁出联系人员"></Input>
              </FormItem>
            </Col>
          </Row>
          <FormItem label="备注">
            <Input v-model="modaloutdata.remark"  placeholder="备注迁出原因"></Input>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button type="primary" style="margin-left: 10px;" :disabled="modalmove.moveoutbtn" @click="modaloutconfirm">确定</Button>
        <Button type="primary" style="margin-left: 10px;" @click="modalcancel">取消</Button>
        </div>
    </Modal>
    <Modal v-model="modalmove.frame" footer-hide width="560">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>设备迁移编辑框</span>
      </p>
      <div style="text-align:center">
        <Form :model="modalmove.data" :label-width="80">
          <Row>
            <Col span="12">
              <FormItem label="设备编号" >
                <Input v-model="modaloutdata.number" @on-blur = selectdevice  placeholder="设备迁移前的编号"></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="迁移状态">
                <RadioGroup v-model="modalmove.data.state" >
                  <Radio label="已完成" disabled >已完成</Radio>
                  <Radio label="待完成" disabled >待完成</Radio>
                </RadioGroup>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="新名称">
                <Input v-model="modalmove.data.name" placeholder="输入设备迁移后的新名称"></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="迁移日期">
                <DatePicker  v-model="modalmove.data.date" placeholder="迁移日期" style="width: auto" />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="列位置" >
                <Select v-model="modalmove.data.devcolumn">
                  <Option v-for="(item,i) in SelectData.columns" :key="i"  :value="item">{{item}}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="行位置" >
                <Select v-model="modalmove.data.devrow">
                  <Option v-for="(item,i) in SelectData.rows" :key="i"  :value="item">{{item}}</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="上架机房">
                <RadioGroup v-model="modalmove.data.room">
                  <Radio label="3-2">3-2</Radio>
                  <Radio label="1-2">1-2</Radio>
                </RadioGroup>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="U数位置">
                <Select v-model="modalmove.data.devsite">
                  <Option v-for="(item,i) in SelectData.Usite" :key="i"  :value="item">{{item}}</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
          <FormItem label="联系人" >
            <Input v-model="modalmove.data.contact" placeholder="迁移对接联系人"></Input>
          </FormItem>
          <FormItem label="备注" >
            <Input v-model="modalmove.data.remark" placeholder="备注原设备位置名称，迁移原因等"></Input>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button type="primary" style="margin-left: 10px;" :disabled="modalmove.statebtn" @click="modalmoveconfirm">确定</Button>
        <Button type="primary" style="margin-left: 10px;" @click="modalcancel">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import store from '@/store'
import {NetRequest} from '@/router/request'
import {Devices} from '@/router/interface'
export default defineComponent({
  setup() {
    
  },
  data(){
    return{
      urlstr:'baseurl'+'/#/infodev?number=',
      columns:[{title: '日期',key: 'date',width:'120px'},{title: '设备名称',slot: 'name',width:'200px'},
              {title: '序列号',key:'serial',width:'250px'},{title: '类型',key:'changetype',width:'80px'},{title: '位置',key: 'site',width:'200px'},
              {title: '联系人员',key: 'contact',width:'180px'},{title: '经办',key: 'operator'},
              {title: '状态',slot: 'state'}],
      devices:[],
      listdata:[],
      modalmove:{moveoutbtn:true,frame:false,statebtn:true,
        data:{name:'',oldname:'',oldnumber:'',location:'',number:'',devcolumn:'',date:'',room:'',devrow:'',devsite:'',contact:'',remark:'',state:''}},
      modalin:false,
      modalinstate:false,
      modalindata:{
        number:'',name:'',date:'',manufacturer:'',devicemodel:'',serial:'',types:'',column:'',row:'',room:'',Usite:'',
        contact:'',size:2,remark:'',state:'',belong:'',location:'',action:'',id:''
      
      },
      modalout:false, //设备迁出对话框
      modaloutstate:true,//设备下架对话框disable状态
      modaloutdata:{name:'',manufacturer:'',devicemodel:'',serial:'',number:'',state:'',date:'',contact:'',remark:'',location:'',room:''},//设备迁出对话框数据
      netData:{action:''},
      SelectData:{types:[''],rows:[''],columns:[''],Usite:[''],system:[''],systemarea:[''],belong:['']},
      pagenum:1
    }
  },
  mounted(){
    this.SelectData.columns = ['A','B','C','D','E','F','G','H','I','J']
    this.SelectData.rows = ['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22']
    for(var i=0;i<42;i++){
      i<9? this.SelectData.Usite[i]='0'+(i+1):this.SelectData.Usite[i]= (1+i).toString()
    }
    this.SelectData.types = ['服务器','交换机','防火墙','路由器','负载均衡','存储设备','安全设备','其它']
    this.SelectData.system = ['政务外网','政务信息网']
    this.SelectData.systemarea = ['信息网区','互联网区','管理区','公用网络区','专用网络区','行业区','其它']
    this.SelectData.belong = ['云谷采购','项目合作','租用','测试','其它']
    this.modaloutdata.date = this.$Date().format('YYYY-MM-DD')
    const rq = new NetRequest()
    this.urlstr = rq.Netconfig.protocol+'://'+rq.Netconfig.ipAddr+'/#/infodev?number='
    this.getMovesList(1)
  },
  methods:{
    modalindatainit(){
      this.modalindata.date = this.$Date().format('YYYY-MM-DD')
      
      this.modalindata.room = '3-2'
      this.modalindata.state = '待完成'
      this.modalindata.id = ''
    },
    devin(){
      this.netData.action = '新增'
      this.modalindatainit()
      this.modalin = true
    },
    async modalinconfirm(){
      //if(!this.datacheck()){return }
      const temdate = this.$Date(this.modalindata.date).format('YYYY-MM-DD');
      this.modalindata.date = temdate
      let roomstr
      this.modalindata.room == '3-2' ?  roomstr = '32':roomstr='12'
      this.modalindata.number = roomstr+this.modalindata.column+this.modalindata.row+this.modalindata.Usite
      this.modalindata.location = this.modalindata.column+'#'+this.modalindata.row+'_'+this.modalindata.Usite

      let x = new Devices()
      let y = await x.DeviceUp(this.modalindata)
      if(y.ret == 200 ){
        this.$Message.success('设备上架信息提交成功！')
        this.getMovesList(1)
      }else{
        this.$Message.error(y.msg)
      }
      

    },
    datacheck(){
      if(this.modalindata.name == ''){this.$Message.warning('设备名称不能为空');return false}
      if(this.modalindata.date == ''){this.$Message.warning('日期不能为空');return false}
      if(this.modalindata.manufacturer == ''){this.$Message.warning('厂商不能为空');return false}
      if(this.modalindata.devicemodel == ''){this.$Message.warning('设备型号不能为空');return false}
      if(this.modalindata.serial == ''){this.$Message.warning('设备序列号不能为空');return false}
      if(this.modalindata.types == ''){this.$Message.warning('设备类型不能为空');return false}
      if(this.modalindata.column == ''){this.$Message.warning('设备上架列不能为空');return false}
      if(this.modalindata.row == ''){this.$Message.warning('设备上架行不能为空');return false}
      if(this.modalindata.room == ''){this.$Message.warning('上架机房不能为空');return false}
      if(this.modalindata.Usite == ''){this.$Message.warning('设备上架位置不能为空');return false}
      if(this.modalindata.belong == ''){this.$Message.warning('设备归属不能为空');return false}
      return true
    },
    modalcancel(){
      this.modalout = false
      this.modalmove.frame = false
    },
    async selectdevice(){
      //设备迁出选择
      let x = new Devices()
      let y = await x.GetDeviceBynum(this.modaloutdata.number)
      if(y.ret == 200 ){
        if(y.data){
          this.modalmove.moveoutbtn = false
          this.modalmove.statebtn = false
          this.modalmove.data.oldname = y.data.name
          this.modalmove.data.oldnumber = y.data.number
          this.modaloutdata.name = y.data.name
          this.modaloutdata.serial = y.data.serial
          this.modaloutdata.manufacturer = y.data.manufacturer
          this.modaloutdata.devicemodel = y.data.devicemodel
          this.modaloutdata.location = y.data.location2
          this.modaloutdata.room = y.data.room
          this.$Message.success(y.data.name)
          console.log(y.data)
        }else{
          this.modaloutdata.number = ''
          this.$Message.error('设备编号不存在！')
        }
      }else{
        this.$Message.error(y.msg)
      }
    },
    devout(){
      this.modaloutdata.state = '已完成'
      this.modalout = true
    },
    devmove(){
      this.modalmove.statebtn = true; //确定按钮禁止
      this.modalmove.frame = true;//弹出迁移编辑框
      this.modalmove.data.date = this.$Date().format('YYYY-MM-DD');
      this.modalmove.data.room = '3-2'
      this.modalmove.data.state = '已完成'
      
    },
    async modalmoveconfirm(){
      let roomstr
      this.modalmove.data.room == '3-2' ?  roomstr = '32':roomstr='12'
      this.modalmove.data.date = this.$Date(this.modalmove.data.date).format('YYYY-MM-DD');
      this.modalmove.data.number = roomstr+this.modalmove.data.devcolumn+this.modalmove.data.devrow+this.modalmove.data.devsite
      this.modalmove.data.location = this.modalmove.data.devcolumn+'#'+this.modalmove.data.devrow+'_'+this.modalmove.data.devsite
      
      let x = new Devices()
      let y = await x.DeviceMove(this.modalmove.data)
      if(y.ret == 200 ){
        this.$Message.success('设备迁移完成！')
        this.modalmove.frame = false;
        this.getMovesList(1)
      }else{
        this.$Message.error(y.msg)
      }
      console.log(this.modalmove)
    },
    async modaloutconfirm(){
      this.modaloutdata.date = this.$Date(this.modaloutdata.date).format('YYYY-MM-DD');
      let x = new Devices()
      let y = await x.DeviceOut(this.modaloutdata)
      if(y.ret == 200 ){
        this.$Message.success('设备迁出完成！')
        this.modalout = false
        this.getMovesList(1)
      }else{
        this.$Message.error(y.msg)
      }
    },
    statebtn(index:number){
      let x:{location:''} = this.listdata[index]
      this.modalindata = this.listdata[index]
      this.modalindata.column = x.location.substring(0,1)
      this.modalindata.row = x.location.substring(2,4)
      this.modalindata.Usite = x.location.substring(5)
      this.modalin = true
      console.log(this.modalindata)
    },
    tuenpage(p:number){
      this.getMovesList(p)
    },
    async getMovesList(page:number){
      let x = new Devices()
      let y = await x.GetDeviceMoveList(page)
      if(y.ret == 200 ){
        this.listdata = y.data.list
        this.pagenum = y.data.total
        this.devices = y.data.list.map((item:{date:'',name:'',serial:'',room:'',location:'',
          contact:'',operator:'',state:'',changetype:'',number:''})=>{
          return{date:item.date,name:item.name,serial:item.serial,site:item.room+'机房-'+item.location,
            contact:item.contact,operator:item.operator,state:item.state,changetype:item.changetype,number:item.number}
        })
      }else{
        this.$Message.error(y.msg)
      }

    },
  }
})
</script>

<style scoped>
.bodysty{
  margin-bottom: 5px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  border: #dcdee2 1px solid;
}
.tablesty{
  margin-top: 10px;
  width:80vw;
}
.pagesty{
  margin-top: 10px;
  margin-bottom: 20px;
}
</style>