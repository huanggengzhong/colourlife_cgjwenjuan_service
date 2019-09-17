import React, { Component } from 'react';
import './sidebar.css';
import {Menu,Icon,Divider,Modal,message,Spin} from 'antd';
import axios from "axios"

const SubMenu = Menu.SubMenu;
class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state={
      collapsed:false,//展开/关闭导航菜单标志
      selectedKeys:'',//当前选中的菜单项 key 数组
      openKeys:[],  //当前展开的 SubMenu 菜单项 key 数组
      usermenuList:[],
      openflag:'',//判断是否展开图标
      loading:false
    }
  }

  componentWillMount(){
    let _key=this.getQueryString('key');
    let _openKeys=this.getQueryString('openKeys');
    if(_key&&_openKeys){
      sessionStorage.setItem("key",_key);
      sessionStorage.setItem("openKeys",_openKeys);
    }else{
      if(sessionStorage.getItem("key")&&sessionStorage.getItem("openKeys")){
        _key=sessionStorage.getItem("key");
        _openKeys=sessionStorage.getItem("openKeys");
      }
    }
    let _parentCurrent=[_openKeys];
    this.setState({selectedKeys:_key,openKeys:_parentCurrent,openflag:_openKeys});
  }
  componentDidMount(){
    var _this=this;
    const access_token=sessionStorage.getItem("access_token")
    _this.setState({access_token},()=>{
      _this.getUserMenuList();
    })
  }

  componentWillUnmount = () => {
    this.setState = (state,callback)=>{
      return;
    };
  }

  getQueryString=function(name) {
    if(window.location.search===''){
      var url = document.location.toString();
      var arrObj = url.split('?');
      if (arrObj.length > 1) {
         var arrPara = arrObj[1].split('&');
         var arr;
         for (var i = 0; i < arrPara.length; i++) {
            arr = arrPara[i].split('=');
            if (arr != null && arr[0] === name) {
              return arr[1];
            }
         }
         return '';
       } else {
         return '';
       }
    }else{
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
   }
  }

  // 获取用户菜单列表
  getUserMenuList(){
    var _this=this;
    var params={
      access_token:_this.state.access_token 
    }
    _this.setState({loading:true})
    axios.get(`${this.props.url}/api/user/menu/list`,{params:params}).then(res => {
      if(res.data.code === 0){
        let list=res.data.content;
        var _usermenuList=[];
        for(let i=0;i<list.length;i++){
          let _userchildMenuList=list[i].children;
          let _name=list[i].name;
          let _redirect_url=list[i].redirect_url;
          let _icon_url=list[i].icon_url;
          let _uuid=list[i].uuid;
          let _changeIcon;
          if(this.state.openflag===_uuid){
             _changeIcon={id:_uuid,value:'true'};
          }else{
             _changeIcon={id:_uuid,value:'false'};
          }
          let _parent_uuid=list[i].parent_uuid;
          let _is_system_menu=list[i].is_system_menu;
          let _type=list[i].type;
          _usermenuList.push({'changeIcon':_changeIcon,'userchildMenuList':_userchildMenuList,'name':_name,'redirect_url':_redirect_url,'icon_url':_icon_url,'uuid':_uuid,'parent_uuid':_parent_uuid,'is_system_menu':_is_system_menu,'type':_type});
        }
        this.setState({usermenuList:_usermenuList,loading:false})
      }else if(res.data.code===400){
        _this.setState({loading:false})
        Modal.info({
          title: '登录失效，请重新登录！',
          okText:"确认",
          onOk() {
             sessionStorage.removeItem("user");
             window.location.href=`${_this.props.url}?flag=true`;
          }
        });
      }else{
        _this.setState({loading:false})
        message.error(res.data.message);
      }

    })
  }

  //展开/关闭导航菜单
  toggleCollapsed (){
    this.setState({
      collapsed: !this.state.collapsed,  
    });
  }

  //展开关闭SubMenu
  openChange(openKeys){
    var _this=this;
    var usermenuList=this.state.usermenuList;
    const rootSubmenuKeys=usermenuList.map((item) =>{return item.uuid});
    //点击菜单，收起其他展开的所有菜单
    var latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    //不展开
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys },()=>{
        var data=usermenuList.map(item=>{
          if(item.changeIcon.value==='true'){
              item.changeIcon.value='false';
          }
          return item;
        })
        _this.setState({usermenuList:data});
      });

    } else {  //展开
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      },()=>{
        var data=usermenuList.map(item=>{
          if(item.changeIcon.id===_this.state.openKeys[0]){
            if(item.changeIcon.value==='false'){
              item.changeIcon.value='true';
            }
          }else{
            if(item.changeIcon.value==='true'){
              item.changeIcon.value='false';
            }
          }
          return item;
        })
        _this.setState({usermenuList:data});
      });
    }
  }

  //点击 MenuItem 调用此函数
  handleClick(item){
    this.setState({
      selectedKeys: item.key
    })
  }

  render() {
   
    var submenu=[];
    var userchildmenu=[];
    this.state.usermenuList.map((ite,i) =>{ 
        if(this.state.usermenuList[i].userchildMenuList!==false){
           return userchildmenu.push(this.state.usermenuList[i].userchildMenuList.map((item,index) =>
          <Menu.Item key={item.uuid}>
          {(item.is_system_menu===1)?(<a href={`${item.redirect_url}?key=${item.uuid}&openKeys=${item.parent_uuid}`}>{(item.icon_url!=="")?(<div><img src={item.icon_url} style={{width:14,height:14,marginRight:10}} alt=""/>{item.name}</div>):(<div style={{marginLeft:24}}>{item.name}</div>)}</a>):
         <a href={`${item.redirect_url}?access_token=${this.state.access_token}&key=${item.uuid}&openKeys=${item.parent_uuid}`}>{(item.icon_url!=="")?(<div><img src={item.icon_url} style={{width:14,height:14,marginRight:10}} alt=""/>{item.name}</div>):(<div style={{marginLeft:24}}>{item.name}</div>)}</a>}
         </Menu.Item>
          ));
        }else{
         return userchildmenu.push([]);
        }
       });
      
       this.state.usermenuList.map((item,index) =>
       {
         return (!item.userchildMenuList.length)?
         submenu.push((<Menu.Item key={item.uuid}>
          <a href={`${item.redirect_url}?access_token=${this.state.access_token}&key=${item.uuid}&openKeys=${item.parent_uuid}`}>{(this.state.collapsed)?(<img src={item.icon_url} style={{width:14,height:14,marginRight:10}} alt=""/>):(<div>{(item.icon_url!=="")?(<div><img src={item.icon_url} style={{width:14,height:14,marginRight:10}} alt=""/>{item.name}</div>):(<div style={{marginLeft:24}}>{item.name}</div>)}</div>)}</a>
          </Menu.Item>)):
          submenu.push(( <SubMenu key={item.uuid} title={<span>{(this.state.usermenuList[index].changeIcon.value==='false') ?(<Icon type="caret-right" theme="outlined" style={      {color:'#fff',fontSize:9}}/>):(<Icon type="caret-down" theme="outlined" style={{color:'#fff',fontSize:9}}/>)}<span>{(item.type===2)?(<a href={`${item.redirect_url}?access_token=${this.state.access_token}&key=${item.uuid}&openKeys=${item.uuid}`}>{item.name}</a>):(`${item.name}`)}</span></span>}>
          {userchildmenu[index]}
          </SubMenu>))
      }
    );

    return (
      <div style={{height:'calc( 100vh - 48px )'}}>
        <div className={this.state.collapsed ? '_menu small' : '_menu'}>
            <div className={this.state.collapsed ?'_menu_title small':'_menu_title'} onClick={this.toggleCollapsed.bind(this)}>
               <Divider type="vertical" /> 
               <Divider type="vertical" />
               <Divider type="vertical" />
            </div>
            <Spin spinning={this.state.loading} >
            <Menu
              mode="inline"
              theme="dark"
              inlineCollapsed={this.state.collapsed}
              onClick={this.handleClick.bind(this)}
              selectedKeys={[this.state.selectedKeys]}
              onOpenChange={this.openChange.bind(this)}
              openKeys={this.state.openKeys}
            >
            {submenu}
            </Menu>
            </Spin>
        </div>
      </div>
    );
  }
}

export default Sidebar;
