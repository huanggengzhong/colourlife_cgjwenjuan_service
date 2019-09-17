import React, { Component } from 'react';
import {Tree,Table,message,Input ,Button,Modal,Spin} from 'antd';
import apis from './../../api/api';
import './../Menu/menu.css'

const confirm = Modal.confirm;
const TreeNode = Tree.TreeNode;
class Menu extends Component {
  constructor(props) {
    super(props);
    this.state={
      role_name:'',//角色名称
      roleList:[],//角色列表
      flag:false,//是否加载角色用户列表图标
      flag2:false,
      currentPage:1,//当前角色列表页码
      currentPage2:1,//当前角色用户列表页码
      curPageSize:10,//每页显示数据条数
      tableDataTotal:0,//角色列表数据总条数
      tableDataTotal2:0,//角色用户列表数据总条数
      add_visible:false,//是否展示增加菜单框
      add_rolename:'',//增加角色名称
      update_visible:false,//是否展示更新菜单框
      updatelist:{},//正在更新的记录
      roleUser:false,//是否展示关联员工框
      rolePrivilege_visible:false,//是否展示角色权限框
      role_uuid:'',//点击关联员工的角色uuid
      mobile:'',//添加员工手机号
      _roleUserList:[],//角色用户关联列表
      addUser_visible:false,//是否展示添加员工框
      loadingTree:false,//加载权限树
      treeData:[],//角色权限列表
      expandedKeys: [],//（受控）展开指定的树节点
      autoExpandParent: true,//是否自动展开父节点
      checkedKeys: [],//选中复选框的树节点
      privilege_uuids:[],//选择的权限uuid
    }
  }

  componentDidMount(){
      this.getRoleList();
  }

  //获取角色列表api
  getRoleList(){
    var _this=this;
    _this.setState({flag:true})
    var params={
      access_token:sessionStorage.getItem("access_token"),
      name:_this.state.role_name,
      page:_this.state.currentPage,
    }
    var _roleList=[];
    apis.getRoleList(params).then(res => {
    
      // console.log(res);
      if(res.code === 0){
        let list=res.content.list;
        for(let i=0;i<list.length;i++){
          let _key=i;
          let _id=list[i].id;
          let _uuid=list[i].uuid;
          let _name=list[i].name;
          let _create_time=list[i].create_time;
          let _update_time=list[i].update_time;
          _roleList.push({'key':_key,'id':_id,'uuid':_uuid,'name':_name,'create_time':_create_time,'update_time':_update_time})
        }
          _this.setState({flag:false})
          _this.setState({tableDataTotal:res.content.total})
          _this.setState({roleList:_roleList})
      }else{
        _this.setState({flag:false})
        message.error(res.message);
      }

    })
  }

  //获取角色用户列表api
  getUserRoleList(){
    var _this=this;
    _this.setState({flag2:true})
    var params={
      access_token:sessionStorage.getItem("access_token"),
      role_uuid:_this.state.role_uuid
    }
    var _roleUserList=[];
    apis.getUserRoleList(params).then(res => {
    
      // console.log(res);
      if(res.code === 0){
        let list=res.content;
         for(let i=0;i<list.length;i++){
          let _key=i;
          let _role_uuid=list[i].role_uuid;
          let _role_name=list[i].role_name;
          let _user_uuid=list[i].user_uuid;
          let _user_name=list[i].user_name;
          _roleUserList.push({'key':_key,'role_uuid':_role_uuid,'role_name':_role_name,'user_uuid':_user_uuid,'user_name':_user_name})
         }
          _this.setState({flag2:false})
          _this.setState({tableDataTotal2:res.content.total})
          _this.setState({roleUserList:_roleUserList})
      }else{
        _this.setState({flag2:false})
        message.error(res.message);
      }

    })
  }

   //角色用户页码改变
  // handleTableChange2= pagination => {
  //   var _this = this;
  //   const current = pagination.current || 1;
  //   this.setState({ currentPage: current },()=>{
  //     _this.getUserRoleList();
  //   });
  // }
  // }

  //获取角色权限列表api
  getPrivilegeList(){
    var _this=this;
    var params={
      access_token:sessionStorage.getItem("access_token"),
      role_uuid:_this.state.role_uuid
    }
    var _checkedKeys=[];
    var _expandedKeys=[];
    apis.getPrivilegeList(params).then(res => {
    
      // console.log(res);
      if(res.code === 0){
        let list=res.content;
        _this.setState({treeData:list,loadingTree:false},()=>{_this.getDate(_this.state.treeData,_checkedKeys,_expandedKeys);});
      }else{
        message.error(res.message);
      }

    })
  }

  getDate(_list,_checkedKeys,_expandedKeys){
    var _this=this;
    if(_list){
      _list.map((item)=>{
        if(item.has_permission===1){
            _expandedKeys.push(item.parent_uuid);
            // if(!item.children.length){
              _checkedKeys.push(item.uuid);
            // }
            _this.setState({checkedKeys:_checkedKeys,expandedKeys:_expandedKeys});
        }
        return _this.getDate(item.children,_checkedKeys,_expandedKeys);
      });
    }
  }

  //更新角色权限关联
  updateUserRoleApi(_str,_type){
    var _this=this;
    var params={
      access_token:sessionStorage.getItem("access_token"),
      role_uuid:_this.state.role_uuid,
      privilege_uuids:_str,
      type:_type
    }
    apis.updateUserRole(params).then(res => {
    
      // console.log(res);
      if(res.code === 0){
        if(_type===1){
          message.success("添加角色权限成功！");
        }else{
          message.success("删除角色权限成功！");
        }
      }else{
        message.error(res.message);
      }

    })
  }

  //添加角色api
  addRoleApi(){
    var _this=this;
    var params={
      access_token:sessionStorage.getItem("access_token"),
      name:_this.state.add_rolename
    }
    apis.createRole(params).then(res => {
    
      // console.log(res);
      if(res.code === 0){
        message.success("添加角色成功！");
        this.setState({add_visible:false},()=>{this.setState({add_rolename:""})});
        _this.getRoleList();
      }else{
        message.error(res.message);
      }

    })
  }

  //更新角色api
  updateRoleApi(_uuid){
    var _this=this;
    var params={
      access_token:sessionStorage.getItem("access_token"),
      role_uuid:_this.state.updatelist.uuid,
      name:_this.state.updatelist.name
    }
    apis.updateRole(params).then(res => {
    
      // console.log(res);
      if(res.code === 0){
        message.success("更新角色成功！");
        _this.setState({update_visible:false});
        _this.getRoleList();
      }else{
        message.error(res.message);
      }

    })
  }

  //删除角色api
  deleteRoleApi(_uuid){
    var _this=this;
    var params={
      access_token:sessionStorage.getItem("access_token"),
      role_uuid:_uuid
    }
    apis.deleteRole(params).then(res => {
    
      // console.log(res);
      if(res.code === 0){
        message.success("删除角色成功！");
        _this.getRoleList();
      }else{
        message.error(res.message);
      }

    })
  }

  //添加用户api
  addUserRoleAPI(){
    var _this=this;
    var params={
      access_token:sessionStorage.getItem("access_token"),
      role_uuid:_this.state.role_uuid,
      mobile:this.state.mobile
    }
    apis.createUserRole(params).then(res => {
    
      // console.log(res);
      if(res.code === 0){
        message.success("添加用户成功！");
        _this.setState({addUser_visible:false},()=>{_this.setState({mobile:""});});
        _this.getUserRoleList();
      }else{
        message.error(res.message);
      }

    })
  }

  //删除角色用户关联用户api
  deleteUserRoleApi(_user_uuid){
    var _this=this;
    var params={
      access_token:sessionStorage.getItem("access_token"),
      role_uuid:_this.state.role_uuid,
      user_uuid:_user_uuid
    }
    apis.deleteUserRole(params).then(res => {
    
      // console.log(res);
      if(res.code === 0){
        message.success("删除用户成功！");
        _this.getUserRoleList();
      }else{
        message.error(res.message);
      }

    })
  }

  //输入角色名称搜索
  changeRolename(e){
    var val=e.target.value;
    this.setState({role_name:val})
  }

  //搜索
  search(){
    this.getRoleList()
  }

  // 添加角色
  addRole(){
    this.setState({add_visible:true});
  }
  
  //输入角色名称添加角色
  addRolename(e){
    let val=e.target.value;
    this.setState({add_rolename:val});
  }

  // 增加角色点击确定按钮
  add_handleOk = (e) => {
    if(this.state.add_rolename){
      this.addRoleApi();
    }else{
      message.error('请输入角色名称！')
      // this.setState({add_visible:false});
    }
    
  }

  // 更新角色
  updateRole(record){
    this.setState({update_visible:true,updatelist:record});
  }

  //输入角色名称更新角色列表
  updateRoleName(e){
    let val=e.target.value;
    let _updatelist=this.state.updatelist;
    _updatelist.name=val;
    this.setState({updatelist:_updatelist})
  }

  // 更新角色点击确定按钮
  update_handleOk = (e) => {
    if(this.state.updatelist.name===''){
      message.error('请输入角色名称！')
    }else{
      this.updateRoleApi();
    }
    
  }

  // 删除角色
  deleteRole(uuid){
    var _this=this;
    confirm({
      title: '确认删除角色吗?',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        _this.deleteRoleApi(uuid);
      },
      onCancel() {
        
      },
    });
    
  }

  //点击角色权限
  rolePrivilege(_uuid){
    var _this=this;
    this.setState({rolePrivilege_visible:true,role_uuid:_uuid,loadingTree:true},()=>{ _this.getPrivilegeList();});
  }

  //树形控件内容
  renderTreeNodes = (data) => {
    return data.map((item) => {
      if(item.status===2){//禁用
        if (item.children) {
          return (
            <TreeNode title={item.name} key={item.uuid} disabled dataRef={item}>
              {this.renderTreeNodes(item.children)}
            </TreeNode>
          );
        }
        return <TreeNode {...item} />;
      }else{
        if (item.children) {
          return (
            <TreeNode title={item.name} key={item.uuid} dataRef={item}>
              {this.renderTreeNodes(item.children)}
            </TreeNode>
          );
        }
        return <TreeNode {...item} />;
      }
      
    });
  }

  //展开/收起节点树形控件时触发
  onExpand = (expandedKeys) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }

  //点击复选框触发e:{checked: bool, checkedNodes, node, event}
  onCheck = (checkedKeys,e) => {
    var _this=this;
    var type;
    // console.log(checkedKeys.checked)
    // console.log(e)
    if(e.checked===true){
      type=1;
    }else{
      type=2;
    }
    this.setState({ checkedKeys,privilege_uuids:e.node.props.eventKey},()=>{this.updateUserRoleApi(_this.state.privilege_uuids,type);});
  }

  //角色权限框点击确定按钮
  rolePrivilege_handleOk=(e)=>{
    this.setState({rolePrivilege_visible:false});
  }

  //点击关联员工
  roleUser(_uuid){
      var _this=this;
      this.setState({roleUser_visible:true,role_uuid:_uuid},()=>{_this.getUserRoleList();});
  }

  //点击添加员工
  addUser(){
    this.setState({addUser_visible:true});
  }

  //输入电话号码添加员工
  changeMobile(e){
    let val=e.target.value;
    this.setState({mobile:val});
  }

  //添加员工框点击确定
  addUser_handleOk= (e) => {
    if(this.state.mobile){
      this.addUserRoleAPI();
    }else{
      // this.setState({addUser_visible:false});
      message.error('请输入手机号！')
    }
  }

  //删除角色下的用户
  deleteRoleUser(_user_uuid){
    var _this=this;
    confirm({
      title: '确认员工吗?',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        _this.deleteUserRoleApi(_user_uuid)
      },
      onCancel() {
        
      },
    });
  }

  //关联员工框点击确定
  roleUser_handleOk=(e)=>{
    this.setState({roleUser_visible:false});
  }

  // 对话框点击取消按钮
  handleCancel= (e) => {
    this.setState({add_visible:false,update_visible:false,roleUser_visible:false,rolePrivilege_visible:false,add_rolename:''},()=>{ this.getRoleList();});
  }
  // 添加员工对话框点击取消按钮
  handleCancel_user=(e)=>{
    this.setState({addUser_visible:false,mobile:''});
  }

  //角色列表页码改变
  handleTableChange = pagination => {
    var _this = this;
    const current = pagination.current || 1;
    this.setState({ currentPage: current },()=>{
      _this.getRoleList();
    });
  }

   //角色用户列表页码改变
  handleTableChange = pagination => {
    var _this = this;
    const current = pagination.current || 1;
    this.setState({ currentPage: current },()=>{
      _this.getUserRoleList();
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

    const columns = [{
      title: '角色id',
      dataIndex: 'id',
      key: 'id',
      width:'15%',
      align:'center',
      render:text => (<span>{text}</span>)
    }, {
      title: '角色uuid',
      dataIndex: 'uuid',
      key: 'uuid',
      width:'15%',
      align:'center',
      render:text => (<span>{text}</span>)
    }, {
      title: '角色名称',
      dataIndex: 'name',
      key: 'name',
      width:'10%',
      align:'center',
      render:text => (<span>{text}</span>)
    },{
      title: '创建时间',
      key: 'create_time',
      dataIndex: 'create_time',
      width:'10%',
      align:'center',
      render:text => (<span>{this.formatDate(new Date(parseInt(text,10)*1000))}</span>)
    },{
        title: '更新时间',
        key: 'update_time',
        dataIndex: 'update_time',
        width:'10%',
        align:'center',
        render:text => (<span>{this.formatDate(new Date(parseInt(text,10)*1000))}</span>)
      },{
      title: '操作',
      key: 'operation',
      dataIndex: 'operation',
      width:'20%',
      align:'center',
      render:(text, record,index) => (<div>
         <a style={{marginRight:10}} onClick={this.rolePrivilege.bind(this,record.uuid)}>角色权限</a>
         <a style={{marginRight:10}} onClick={this.roleUser.bind(this,record.uuid)}>关联员工</a>
         <a style={{marginRight:10}} onClick={this.updateRole.bind(this,record)}>更新角色</a>
         <a style={{marginRight:10}} onClick={this.deleteRole.bind(this,record.uuid)}>删除角色</a>
      </div>)
    }];

    const roleUserColumns=[{
        title: '角色uuid',
        dataIndex: 'role_uuid',
        key: 'role_uuid',
        width:'25%',
        align:'center',
        render:text => (<span>{text}</span>)
      }, {
        title: '角色名称',
        dataIndex: 'role_name',
        key: 'role_name',
        width:'15%',
        align:'center',
        render:text => (<span>{text}</span>)
      },{
        title: '用户uuid',
        dataIndex: 'user_uuid',
        key: 'user_uuid',
        width:'25%',
        align:'center',
        render:text => (<span>{text}</span>)
      }, {
        title: '用户名称',
        dataIndex: 'user_name',
        key: 'user_name',
        width:'15%',
        align:'center',
        render:text => (<span>{text}</span>)
        },{
        title: '操作',
        key: 'operation',
        dataIndex: 'operation',
        width:'20%',
        align:'center',
        render:(text, record,index) => (<div>
           <a style={{marginRight:10}} onClick={this.deleteRoleUser.bind(this,record.user_uuid)}>删除员工</a>
        </div>)
    }];

    return (
      <div className='_menuWrapper'>

       <div style={{display:'flex'}}>
              <p style={{paddingTop:5}}>角色名称：</p>
              <div style={{width:'15%',marginRight:20}}> <Input placeholder="请输入角色名称" onChange={this.changeRolename.bind(this)} onPressEnter={this.search.bind(this)}/></div>
              <Button type="primary" onClick={this.search.bind(this)}>搜索</Button>
      </div>

      <div className="_addMenu"><Button type="primary" onClick={this.addRole.bind(this)}>添加角色</Button></div>

      <div className="_table">
                <Table columns={columns} dataSource={this.state.roleList} loading={this.state.flag} bordered 
                       pagination={{
                            current: this.state.currentPage,
                            pageSize: this.state.curPageSize,
                            total: this.state.tableDataTotal
                       }}
                        onChange={this.handleTableChange}/>
      </div>

      {/* 添加角色 */}
      <Modal
          title="添加角色"
          visible={this.state.add_visible}
          onOk={this.add_handleOk}
          onCancel={this.handleCancel}
          okText="确定"
          cancelText="取消"
        >
        <div style={{display:'flex',marginBottom:20,marginLeft:30}}>
              <p style={{paddingTop:5,width:100}}>角色名称：</p>
              <div style={{width:300,marginRight:20}}> <Input value={this.state.add_rolename} onChange={this.addRolename.bind(this)}/></div>
        </div>
    
      </Modal>

      {/* 更新角色 */}
      <Modal
          title="更新角色"
          visible={this.state.update_visible}
          onOk={this.update_handleOk}
          onCancel={this.handleCancel}
          okText="确定"
          cancelText="取消"
        >
        <div style={{marginLeft:30}}>
        <div style={{display:'flex',marginBottom:20}}>
              <p style={{paddingTop:5,width:100}}>角色id：</p>
              <div style={{width:300,marginRight:20}}> <Input value={this.state.updatelist.id} disabled/></div>
        </div>
        <div style={{display:'flex',marginBottom:20}}>
              <p style={{paddingTop:5,width:100}}>角色uuid：</p>
              <div style={{width:300,marginRight:20}}> <Input value={this.state.updatelist.uuid} disabled/></div>
        </div>
        <div style={{display:'flex',marginBottom:20}}>
              <p style={{paddingTop:5,width:100}}>角色名称：</p>
              <div style={{width:300,marginRight:20}}> <Input value={this.state.updatelist.name} onChange={this.updateRoleName.bind(this)}/></div>
        </div>
        </div>
    
      </Modal>

      {/* 角色权限 */}
      <Modal
          title="角色权限"
          visible={this.state.rolePrivilege_visible}
          onOk={this.rolePrivilege_handleOk}
          onCancel={this.handleCancel}
          okText="确定"
          cancelText="取消"
        >
      <Spin spinning={this.state.loadingTree}>
           <Tree
        checkable
        onExpand={this.onExpand}
        expandedKeys={this.state.expandedKeys}
        autoExpandParent={this.state.autoExpandParent}
        onCheck={this.onCheck}
        checkedKeys={this.state.checkedKeys}
        onSelect={this.onSelect}
        checkStrictly
      >
        {this.renderTreeNodes(this.state.treeData)}
           </Tree>
      </Spin>
    
      </Modal>

      {/* 关联员工 */}
      <Modal
          title="关联员工"
          visible={this.state.roleUser_visible}
          onOk={this.roleUser_handleOk}
          onCancel={this.handleCancel}
          okText="确定"
          cancelText="取消"
          width={'60%'}
        >

            <div className="_addMenu" style={{marginBottom:20}}><Button type="primary" onClick={this.addUser.bind(this)}>添加员工</Button></div>

            <Table columns={roleUserColumns} dataSource={this.state.roleUserList} loading={this.state.flag2} bordered 
                       pagination={{
                            current: this.state.currentPage2,
                            pageSize: this.state.curPageSize,
                            total: this.state.tableDataTotal2
                       }}
                        onChange={this.handleTableChange2}/>
    
      </Modal>

       {/* 添加员工 */}
       <Modal
          title="添加员工"
          visible={this.state.addUser_visible}
          onOk={this.addUser_handleOk}
          onCancel={this.handleCancel_user}
          okText="确定"
          cancelText="取消"
        >
        <div style={{marginLeft:30}}>
        <div style={{display:'flex',marginBottom:20}}>
              <p style={{paddingTop:5,width:100}}>角色uuid：</p>
              <div style={{width:300,marginRight:20}}> <Input value={this.state.role_uuid} disabled/></div>
        </div>
        <div style={{display:'flex',marginBottom:20}}>
              <p style={{paddingTop:5,width:100}}>手机号：</p>
              <div style={{width:300,marginRight:20}}> <Input value={this.state.mobile} onChange={this.changeMobile.bind(this)}/></div>
        </div>
        </div>
    
      </Modal>
      </div>
    );
  }
}

export default Menu;
