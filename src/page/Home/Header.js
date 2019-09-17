import React, { Component } from 'react';
import './header.css';
import { Menu,  Dropdown, Icon,Input,Avatar,Badge,Modal,message} from 'antd';
import axios from "axios"

const confirm = Modal.confirm;
const Search = Input.Search;
class Header extends Component {
  constructor(props) {
    super(props);
    this.state={
      user:'',
      user_image:'',//用户头像
      openUrl:'',//帮助与文档地址
      access_token:'',
    }
  }

  componentDidMount(){
    var _this=this;
    const access_token=_this.getQueryString('access_token');
    var _openUrl;
    if(this.props.url==='https://yun.colourlife.com'){//正式
       _openUrl="https://open.colourlife.com";
    }else{//测试
       _openUrl="http://open.test.colourlife.com";
    }
    console.log(_openUrl)
    if(access_token){
      sessionStorage.setItem("access_token",access_token);
      //获取用户信息
      _this.setState({openUrl:_openUrl,access_token},()=>{
         _this.getUserInfo();
      })
    }else{
      if(sessionStorage.getItem('access_token')){
        //获取用户信息
        _this.setState({openUrl:_openUrl,access_token:sessionStorage.getItem('access_token')},()=>{
           _this.getUserInfo();
        })
      }
    }
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

   // 根据ACCESS_TOKEN获取用户基本信息
  getUserInfo(){
    var _this=this;
    var params = {
        access_token:_this.state.access_token,
    };

        //调用根据ACCESS_TOKEN获取用户基本信息接口
        axios.get(`${_this.props.url}/api/user/info`,{params:params}).then(res => {
          // console.log(res);
          if(res.data.code === 0){
            sessionStorage.setItem("user",JSON.stringify(res.data.content));  //JOSN字符串
            this.setState({user:sessionStorage.getItem("user")})
          }else{
            message.error(`${res.data.message},请重新登录！`);
          }
    
        })
  }

  //退出登录
  loginOut(){
    var _this = this;
    confirm({
      title: '确认退出吗?',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        sessionStorage.removeItem("access_token");
        sessionStorage.removeItem("user");
        _this.props.onLoginOut&&_this.props.onLoginOut();
        window.location.href=`${_this.props.url}?flag=true`;
      },
      onCancel() {
        
      },
    });
  }

  //点击搜索或者回车的回调
  search(value, event){

  }

  render() {
    var _user=sessionStorage.getItem("user");
    var user_image;
    if( _user){
      _user = JSON.parse( _user);
      user_image=_user.user_info.head_img_url
    }
    const user_menu = (
     <Menu style={{marginRight:-12}}>
      {/* <Menu.Item>
       <a target="_blank" href="#">个人信息</a>
      </Menu.Item> */}
      <Menu.Item onClick={this.loginOut.bind(this)}>
       <span>退出管理控制台</span>
      </Menu.Item>
     </Menu>
    );
    
    return (
      <div style={{width:'100%'}}>

       <div className="_header">
         <div className="_headerL">
          <div className="_headerLF">
            <div className="_cyz_logo"><img src={require("./logo.png")} alt=''/></div>

            <a className="_title" href={`${this.props.url}/#/Home`}>管理控制台</a>
          </div>
         </div>

         <div className="_headerR">
          <div className="_headerRF">
          <div className="search">
            <Search
                placeholder="搜索"
                onSearch={this.search.bind(this)}
            />

          </div>

          <div className="message">
          {/* <Popover content={hoverContent} title="站内消息通知" trigger="hover"> */}
            <Icon type="bell" style={{color:'#fff',width: 14,height: 16,fontSize:16,marginLeft:10}}/>
            <Badge count={0} style={{color: '#fefefe',backgroundColor: 'rgba(242, 156, 51, 1)',width:24,borderRadius: 5,marginTop:-5,marginLeft:5}}/>
          {/* </Popover> */}
          </div>

          <div className="order">
            {/* <Dropdown overlay={order_menu} placement="topRight"> */}
              <span>工单</span>
            {/* </Dropdown> */}
          </div>

          <div className="help">
            {/* <span>帮助与文档</span> */}
            <a href={`${this.state.openUrl}/document?access_token=${this.state.access_token}`}>帮助与文档</a>
          </div>

          <div className="user">
            <Dropdown overlay={user_menu} placement="topRight">
                <Avatar src={user_image} style={{width:32,height:32,backgroundColor: 'rgba(158, 189, 240, 1)'}} />
            </Dropdown>
          </div>
          </div>
         </div>

       </div>

    </div>
    );
  }
}

export default Header;
