import React, { Component } from 'react';
import {Upload,Icon,Cascader,Table,message,Input ,Button,Modal,InputNumber} from 'antd';
import './menu.css'
import apis from './../../api/api';


const confirm = Modal.confirm;
class Menu extends Component {
  constructor(props) {
    super(props);
    this.state={
      menu_name:'',//菜单名称
      menu_parentUuid:[],//父级菜单uuid
      menu_state:'',//菜单状态
      menuList:[],//菜单列表
      flag:false,//是否加载图标
      currentPage:1,//当前页码
      curPageSize:10,//每页显示数据条数
      tableDataTotal:0,//数据总条数
      add_visible:false,//是否展示增加菜单框
      update_visible:false,//是否展示更新菜单框
      addlist:{},//增加菜单的记录
      updatelist:{},//正在更新的记录
      loading:false,//上传图片的标志
      imageUrl:'',//上传图片返回的图标地址
      privilegeList:[],//所有菜单列表
    }
  }

  componentDidMount(){
      this.getMenuList();
  }

  getMenuList(_page_size,_query_child,_updateUuid){
    var _this=this;
    let _name,_state;
    if(_page_size===undefined){
       _this.setState({flag:true});
       _name=_this.state.menu_name;
       _state=_this.state.menu_state;
    }else{
       _name='';
       _state='';
    }
    let _menu_parentUuid=_this.state.menu_parentUuid;
    let _parent_uuid=_menu_parentUuid.slice(-1).join();
    var params={
      access_token:sessionStorage.getItem("access_token"),
      parent_uuid:_parent_uuid,
      name:_name,
      state:_state,
      page:_this.state.currentPage,
      page_size:_page_size,
      query_child:_query_child,
    }
    var _menuList=[];
    var _privilegeList=[{uuid:'0',name:'无',childs:[]}];
    apis.getMenuList(params).then(res => {
    
      console.log(res);
      if(res.code === 0){
       let list=res.content.list;
       if(res.content.list.length){
        for(let i=0;i<list.length;i++){
          if(_page_size===false){
            if(list[i].parent_uuid===0){
              _privilegeList.push(list[i]);
              _this.setState({privilegeList:_privilegeList},()=>{_this.getDate(this.state.privilegeList,_updateUuid)});
            }
          }else{
            let _key=i;
            let _uuid=list[i].uuid;
            let _parent_uuid=list[i].parent_uuid;
            let _parent_name=list[i].parent_name;
            let _name=list[i].name;
            let _type=list[i].type;
            let _redirect_url=list[i].redirect_url;
            let _icon_url=list[i].icon_url;
            let _state=list[i].state;
            let _create_time=list[i].create_time;
            let _sort=list[i].sort;
            _menuList.push({'key':_key,'uuid':_uuid,'parent_uuid':_parent_uuid,'parent_name':_parent_name,'name':_name,'type':_type,'redirect_url':_redirect_url,'icon_url':_icon_url,'state':_state,'create_time':_create_time,'sort':_sort});
            _this.setState({menuList:_menuList,tableDataTotal:res.content.total,flag:false});
          }
        }
       }else{
          let list=res.content.list;
          _this.setState({menuList:list,tableDataTotal:res.content.total,flag:false});
       }
      }else{
        message.error(res.message);
      }

    })
  }

  addMenuApi(_uuid){
    var _this=this;
    var params={
      access_token:sessionStorage.getItem("access_token"),
      parent_uuid:_this.state.addlist.parent_uuid.slice(-1).join(),
      name:_this.state.addlist.name,
      type:_this.state.addlist.type.slice(-1).join(),
      redirect_url:_this.state.addlist.redirect_url,
      icon_url:_this.state.imageUrl,
      state:_this.state.addlist.state.slice(-1).join(),
      sort:_this.state.addlist.sort
    }
    apis.createMenu(params).then(res => {
    
      // console.log(res);
      if(res.code === 0){
        message.success(res.message);
        _this.setState({add_visible:false,addlist:{}},()=>{
          _this.getMenuList();
        });
      }else if(res.content[0]==="跳转地址 格式不正确。"){
        message.error('跳转地址格式不正确。');
      }else{
        message.error(res.message);
        // _this.getMenuList();
      }

    })
  }

  updateMenuApi(){
    var _this=this;
    var params={
      access_token:sessionStorage.getItem("access_token"),
      uuid:_this.state.updatelist.uuid,
      parent_uuid:_this.state.updatelist.parent_uuid.slice(-1).join(),
      name:_this.state.updatelist.name,
      type:_this.state.updatelist.type,
      redirect_url:_this.state.updatelist.redirect_url,
      icon_url:_this.state.updatelist.icon_url,
      state:_this.state.updatelist.state,
      sort:_this.state.updatelist.sort
    }
    apis.updateMenu(params).then(res => {
    
      // console.log(res);
      if(res.code === 0){
        message.success(res.message);
        _this.setState({update_visible:false});
        // _this.getMenuList();
        window.location.reload();
      }else if(res.content[0]==="跳转地址 格式不正确。"){
        message.error('跳转地址格式不正确。');
      }else{
        message.error(res.message);
        _this.getMenuList();
      }

    })
  }

  deleteMenuApi(_uuid){
    var params={
      access_token:sessionStorage.getItem("access_token"),
      uuid:_uuid
    }
    apis.deleteMenu(params).then(res => {
    
      // console.log(res);
      if(res.code === 0){
        message.success(res.message);
        window.location.reload();
      }else{
        message.error(res.message);
      }

    })
  }

  //输入菜单名称搜索
  changeMenuname(e){
    var val=e.target.value;
    this.setState({menu_name:val});
  }

  popupVisibleChange(value){
    var _this=this;
    if(value){
      let _page_size=false;
      _this.getMenuList(_page_size,1,_this.state.updatelist.uuid);
    }
  }

  //选择父级菜单名称(未完成)
  changeMenuParentname(value){
    this.setState({menu_parentUuid:value})
  }

  //选择后展示的渲染函数
  displayRender(label){
    return label[label.length - 1];
  }

  //选择状态
  changeMenuState(value){
    this.setState({menu_state:value[0]});
  }

  //搜索
  search(){
    this.getMenuList()
  }


  // 添加菜单
  addMenu(){
    let addlist={type:[1],state:[1]}
    this.setState({add_visible:true,imageUrl:'',addlist});
  }

  addMenuParentname(value,selectedOptions){
    let _addlist=this.state.addlist;
    _addlist.parent_uuid=value;
    this.setState({addlist:_addlist})
  }
  addMenuname(e){
    let val=e.target.value;
    let _addlist=this.state.addlist;
    _addlist.name=val;
    this.setState({addlist:_addlist})
  }
  addMenutype(value){
    let _addlist=this.state.addlist;
    _addlist.type=value;
    this.setState({addlist:_addlist})
  }
  addMenuRedirectUrl(e){
    let val=e.target.value;
    let _addlist=this.state.addlist;
    _addlist.redirect_url=val;
    this.setState({addlist:_addlist})
  }
  addMenuIconUrl(e){
    let val=e.target.value;
    let _addlist=this.state.addlist;
    _addlist.icon_url=val;
    this.setState({addlist:_addlist})
  }
  addMenuState(value){
    let _addlist=this.state.addlist;
    _addlist.state=value;
    this.setState({addlist:_addlist})
  }
  addMenuSort(value){
    let _addlist=this.state.addlist;
    _addlist.sort=value;
    this.setState({addlist:_addlist})
  }
  // 增加菜单点击确定按钮
  add_handleOk = (e) => {
    if(this.state.addlist.name===undefined){
      message.error('菜单名称不能为空！');
    }else if(this.state.addlist.parent_uuid===undefined){
      message.error('父级菜单不能为空！');
    }else if(this.state.addlist.type[0]===2&&this.state.addlist.redirect_url===undefined){
      message.error('跳转菜单必须输入跳转地址！');
    }else{
      this.addMenuApi();
    }
  }

  // 更新菜单
  updateMenu(record){ 
    this.getMenuList(false,1,record.uuid);
    let _record=record;
    let _parent_uuid;
    if(record.parent_uuid==="0"){
      _parent_uuid=["0"];
    }else{
      _parent_uuid=record.parent_uuid;
    }
    _record.parent_uuid=_parent_uuid;
    this.setState({update_visible:true,updatelist:_record});
  }

  getDate(_list,_uuid){
    var _this=this;
    if(_list){
      _list.map((item)=>{
        if(item.uuid===_uuid){
          return item.disabled=true;
        }else{
          return _this.getDate(item.childs,_uuid);
        }
      });
    }
  }

  updateMenuParentname(value){
    let _updatelist=this.state.updatelist;
    _updatelist.parent_uuid=value;
    this.setState({updatelist:_updatelist})
  }
  updateMenuName(e){
    let val=e.target.value;
    let _updatelist=this.state.updatelist;
    _updatelist.name=val;
    this.setState({updatelist:_updatelist})
  }
  updateMenuType(value){
    let _updatelist=this.state.updatelist;
    _updatelist.type=value[0];
    this.setState({updatelist:_updatelist})
  }
  updateMenuRedirectUrl(e){
    let val=e.target.value;
    let _updatelist=this.state.updatelist;
    _updatelist.redirect_url=val;
    this.setState({updatelist:_updatelist})
  }
  updateMenuIconUrl(e){
    let val=e.target.value;
    let _updatelist=this.state.updatelist;
    _updatelist.icon_url=val;
    this.setState({updatelist:_updatelist})
  }
  updateMenuState(value){
    let _updatelist=this.state.updatelist;
    _updatelist.state=value[0];
    this.setState({updatelist:_updatelist})
  }

  updateMenuSort(value){
    let _updatelist=this.state.updatelist;
    _updatelist.sort=value;
    this.setState({updatelist:_updatelist})
  }

  // 更新菜单点击确定按钮
  update_handleOk = (e) => {
    if(this.state.updatelist.name===""){
      message.error('菜单名称不能为空！');
    }else if(this.state.updatelist.parent_uuid===""){
      message.error('父级菜单不能为空！');
    }else if(this.state.updatelist.type===2&&this.state.updatelist.redirect_url===""){
      message.error('跳转菜单必须输入跳转地址！');
    }else{
      this.updateMenuApi();
    }
    
  }

  // 对话框点击取消按钮
  handleCancel= (e) => {
    this.setState({add_visible:false,update_visible:false,addlist:{}},()=>{this.getMenuList();});
  }

  // 删除菜单
  deleteMenu(uuid){
    var _this=this;
    confirm({
      title: '确认删除菜单吗?',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        _this.deleteMenuApi(uuid);
      },
      onCancel() {
        
      },
    });
    
  }


  handleTableChange = pagination => {
    var _this = this;
    const current = pagination.current || 1;
    this.setState({ currentPage: current },()=>{
      _this.getMenuList();
    });
  }

  //转化成固定的日期格式
  formatDate(now) { 
    var year=now.getFullYear(); 
    var month=now.getMonth()+1; 
    var date=now.getDate(); 
    var hour=now.getHours(); 
    var minute=now.getMinutes(); 
    var second=now.getSeconds(); 
    return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second; 
    } 

  render() {
   
    var _this=this;
    const columns = [{
      title: '序号',
      dataIndex: 'key',
      key: 'key',
      width:'5%',
      align:'center',
      render:text => (<span>{text+1}</span>)
    }, {
      title: '父级菜单名称',
      dataIndex: 'parent_name',
      key: 'parent_name',
      width:'15%',
      align:'center',
      render:text => (<span>{(!text)?'无':text}</span>)
    }, {
      title: '菜单名称',
      dataIndex: 'name',
      key: 'name',
      width:'10%',
      align:'center',
      render:text => (<span>{text}</span>)
    }, {
      title: '菜单类型',
      key: 'type',
      dataIndex: 'type',
      width:'10%',
      align:'center',
      render:text => (<div>
        {(text===1)?"普通菜单":""}
        {text===2?"跳转菜单":""}
      </div>)
    }, {
      title: '跳转地址',
      key: 'redirect_url',
      dataIndex: 'redirect_url',
      width:'10%',
      align:'center',
      render:text => (<span>{text}</span>)
    }, {
      title: '图标',
      key: 'icon_url',
      dataIndex: 'icon_url',
      width:'5%',
      align:'center',
      render:text => (<span>{text?(<img src={text} style={{width:32,height:32}} alt=''/>):'无'}</span>)
    },{
      title: '状态',
      key: 'state',
      dataIndex: 'state',
      width:'10%',
      align:'center',
      render:text => (<div>
                      {(text===1)?"正常":""}
                      {text===2?"禁用":""}
                      {text===3?"隐藏":""}
      </div>)
    }, {
      title: '创建时间',
      key: 'create_time',
      dataIndex: 'create_time',
      width:'10%',
      align:'center',
      render:text => (<span>{this.formatDate(new Date(parseInt(text,10)*1000))}</span>)
    },  {
      title: '菜单顺序',
      key: 'sort',
      dataIndex: 'sort',
      width:'5%',
      align:'center',
      render:text => (<span>{text}</span>)
    },{
      title: '操作',
      key: 'operation',
      dataIndex: 'operation',
      width:'20%',
      align:'center',
      render:(text, record,index) => (<div>
         <a style={{marginRight:10}} onClick={this.updateMenu.bind(this,record)}>更新菜单</a>
         <a style={{marginRight:10}} onClick={this.deleteMenu.bind(this,record.uuid)}>删除菜单</a>
      </div>)
    }];

    const type_options=[{value: 1,label: '普通菜单'},{value: 2,label: '跳转菜单'}];
    const state_options=[{value: 1,label: '正常'},{value: 2,label: '禁用'},{value: 3,label: '隐藏'}];
    const parentName_options=this.state.privilegeList;

    const props = {
      name: 'image',
      action: `${apis._baseUrl}/api/upload/image`,
      data:{access_token:sessionStorage.getItem("access_token")},
      showUploadList:false,
      onChange(info) {
        _this.setState({ loading: true });
        let res=info.file.response
        if (info.file.status !== 'uploading') {
          if (res.code === 0) {
            if(_this.state.add_visible){
              _this.setState({loading: false,imageUrl:res.content.url});
            }else{
              let _updatelist=_this.state.updatelist;
              _updatelist.icon_url=res.content.url;
              _this.setState({loading: false,updatelist:_updatelist});
            }
          message.success('上传成功！');
          } else {
          _this.setState({loading: false});
          message.error('上传失败！');
         }
        }
      }
    };

    return (
      <div className='_menuWrapper'>
       <div style={{display:'flex'}}>
              <p style={{paddingTop:5}}>菜单名称：</p>
              <div style={{width:'15%',marginRight:20}}> <Input placeholder="请输入菜单名称" onChange={this.changeMenuname.bind(this)} onPressEnter={this.search.bind(this)}/></div>
              <p style={{paddingTop:5}}>父级菜单：</p>
              <Cascader fieldNames={{ label: 'name', value: 'uuid', children: 'childs' }} options={parentName_options} onPopupVisibleChange={this.popupVisibleChange.bind(this)}  onChange={this.changeMenuParentname.bind(this)} value={this.state.menu_parentUuid} placeholder="请选择" style={{width:'15%',marginRight:20}} changeOnSelect displayRender={this.displayRender.bind(this)}/>
              <p style={{paddingTop:5}}>状态：</p>
              <Cascader options={state_options} onChange={this.changeMenuState.bind(this)} placeholder="请选择" style={{width:'15%',marginRight:20}}/>
              <Button type="primary" onClick={this.search.bind(this)}>搜索</Button>
      </div>

      <div className="_addMenu"><Button type="primary" onClick={this.addMenu.bind(this)}>添加菜单</Button></div>

      <div className="_table">
                <Table columns={columns} dataSource={this.state.menuList} loading={this.state.flag} bordered 
                       pagination={{
                            current: this.state.currentPage,
                            pageSize: this.state.curPageSize,
                            total: this.state.tableDataTotal
                       }}
                        onChange={this.handleTableChange}/>
      </div>

      {/* 添加菜单 */}
      <Modal
          title="添加菜单"
          visible={this.state.add_visible}
          onOk={this.add_handleOk}
          onCancel={this.handleCancel}
          okText="确定"
          cancelText="取消"
        >
        <div style={{marginLeft:30}}>
        <div style={{display:'flex',marginBottom:20}}>
              <p style={{paddingTop:5,width:100}}>父级菜单：</p>
              <Cascader fieldNames={{ label: 'name', value: 'uuid', children: 'childs' }} options={parentName_options} onPopupVisibleChange={this.popupVisibleChange.bind(this)}  onChange={this.addMenuParentname.bind(this)} value={this.state.addlist.parent_uuid} placeholder="请选择" style={{width:300,marginRight:20}} displayRender={this.displayRender.bind(this)} changeOnSelect/>
        </div>
        <div style={{display:'flex',marginBottom:20}}>
              <p style={{paddingTop:5,width:100}}>菜单名称：</p>
              <div style={{width:300,marginRight:20}}> <Input placeholder="请输入菜单名称" value={this.state.addlist.name} onChange={this.addMenuname.bind(this)}/></div>
        </div>
        <div style={{display:'flex',marginBottom:20}}>
              <p style={{paddingTop:5,width:100}}>菜单类型：</p>
             <Cascader options={type_options} onChange={this.addMenutype.bind(this)} value={this.state.addlist.type} placeholder="请选择" style={{width:300,marginRight:20}}/>
        </div>
        <div style={{display:'flex',marginBottom:20}}>
              <p style={{paddingTop:5,width:100}}>跳转地址：</p>
              <div style={{width:300,marginRight:20}}> <Input placeholder='请输入跳转地址(以"http://"开头)' value={this.state.addlist.redirect_url} onChange={this.addMenuRedirectUrl.bind(this)}/></div>
        </div>
        <div style={{display:'flex',marginBottom:20}}>
              <p style={{paddingTop:5,width:100}}>图标地址：</p>
              <div style={{width:300,marginRight:20,display:'flex'}}> 
              <Upload {...props} style={{marginRight:20}}>
                <Button style={this.state.imageUrl ?{padding:0}:{}}>
                   {this.state.imageUrl ? <img src={this.state.imageUrl} alt="avatar" style={{width:32,height:32}}/> : ( <Icon type={this.state.loading ? 'loading' : 'upload'} />)}
                </Button>
              </Upload>
              <Input placeholder="请输入图标地址" value={this.state.imageUrl} onChange={this.addMenuIconUrl.bind(this)}/>
              </div>
        </div>
        <div style={{display:'flex',marginBottom:20}}>
              <p style={{paddingTop:5,width:100}}>状态：</p>
              <Cascader options={state_options} onChange={this.addMenuState.bind(this)}  value={this.state.addlist.state} placeholder="请选择" style={{width:300,marginRight:20}}/>
        </div>
        <div style={{display:'flex',marginBottom:20}}>
              <p style={{paddingTop:5,width:100}}>菜单顺序：</p>
              <div style={{width:300,marginRight:20}}> <InputNumber value={this.state.addlist.sort} onChange={this.addMenuSort.bind(this)} /></div>
        </div>
        </div>
    
      </Modal>

      {/* 更新菜单 */}
      <Modal
          title="更新菜单"
          visible={this.state.update_visible}
          onOk={this.update_handleOk}
          onCancel={this.handleCancel}
          okText="确定"
          cancelText="取消"
        >
        <div style={{marginLeft:30}}>
        <div style={{display:'flex',marginBottom:20}}>
              <p style={{paddingTop:5,width:100}}>菜单uuid：</p>
              <div style={{width:300,marginRight:20}}> <Input value={this.state.updatelist.uuid} disabled/></div>
        </div>
        <div style={{display:'flex',marginBottom:20}}>
              <p style={{paddingTop:5,width:100}}>父级菜单：</p>
              <Cascader fieldNames={{ label: 'name', value: 'uuid', children: 'childs' }} options={parentName_options} onPopupVisibleChange={this.popupVisibleChange.bind(this)}  onChange={this.updateMenuParentname.bind(this)} value={this.state.updatelist.parent_uuid} placeholder="请选择" style={{width:300,marginRight:20}} displayRender={this.displayRender.bind(this)} changeOnSelect />
        </div>
        <div style={{display:'flex',marginBottom:20}}>
              <p style={{paddingTop:5,width:100}}>菜单名称：</p>
              <div style={{width:300,marginRight:20}}> <Input placeholder="请输入菜单名称" value={this.state.updatelist.name} onChange={this.updateMenuName.bind(this)}/></div>
        </div>
        <div style={{display:'flex',marginBottom:20}}>
              <p style={{paddingTop:5,width:100}}>菜单类型：</p>
              <Cascader options={type_options} onChange={this.updateMenuType.bind(this)} placeholder="请选择" value={[this.state.updatelist.type]} style={{width:300,marginRight:20}}/>
        </div>
        <div style={{display:'flex',marginBottom:20}}>
              <p style={{paddingTop:5,width:100}}>跳转地址：</p>
              <div style={{width:300,marginRight:20}}> <Input placeholder='请输入跳转地址(以"http://"开头)' value={this.state.updatelist.redirect_url} onChange={this.updateMenuRedirectUrl.bind(this)}/></div>
        </div>
        <div style={{display:'flex',marginBottom:20}}>
              <p style={{paddingTop:5,width:100}}>图标地址：</p>
              <div style={{width:300,marginRight:20,display:'flex'}}> 
              <Upload {...props} style={{marginRight:20}}>
                <Button style={this.state.updatelist.icon_url ?{padding:0}:{}}>
                   {this.state.updatelist.icon_url ? <img src={this.state.updatelist.icon_url} alt="avatar" style={{width:32,height:32}}/> : ( <Icon type={this.state.loading ? 'loading' : 'upload'} />)}
                </Button>
              </Upload>
              <Input placeholder="请输入图标地址" value={this.state.updatelist.icon_url} onChange={this.updateMenuIconUrl.bind(this)}/>
              </div>
        </div>
        <div style={{display:'flex',marginBottom:20}}>
              <p style={{paddingTop:5,width:100}}>状态：</p>
              <Cascader options={state_options} onChange={this.updateMenuState.bind(this)} placeholder="请选择" value={[this.state.updatelist.state]} style={{width:300,marginRight:20}}/>
        </div>
        <div style={{display:'flex',marginBottom:20}}>
              <p style={{paddingTop:5,width:100}}>菜单顺序：</p>
              <div style={{width:300,marginRight:20}}> <InputNumber value={this.state.updatelist.sort} onChange={this.updateMenuSort.bind(this)} /></div>
        </div>
       </div>
      </Modal>
      </div>
    );
  }
}

export default Menu;
