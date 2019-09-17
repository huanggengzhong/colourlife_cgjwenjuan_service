import React, {
  Component
} from 'react';
import {
  message,
  Modal
} from 'antd';
import Header from './Header'
import Sidebar from './Sidebar'
import Routers from './../../router/router';
import apis from './../../api/api'
import history from './../../api/history'
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '', //用户信息
      usermenuList: [], //菜单列表数据
      loading: false,
      access_token:''
    }
  }

  // 根据ACCESS_TOKEN获取用户基本信息
  getUserInfo() {
    var token='';
    if(this.getQuery(history.location.search,'access_token')){
      token=this.getQuery(history.location.search,'access_token');
    }else if(this.urlArgs('access_token')){
      token=this.urlArgs('access_token');
    }else if(sessionStorage.getItem('access_token')){
      token=sessionStorage.getItem('access_token');
    }else{
      this.props.history.push({
        pathname: '/Login'
      });
    }
    console.log(token)
    var params = {
      access_token: token,
    };
    sessionStorage.setItem('access_token',token)
    //调用根据ACCESS_TOKEN获取用户基本信息接口
    apis.getUserInfo(params).then(res => {
      // console.log(res);
      if (res.code === 0) {
        sessionStorage.setItem("user", JSON.stringify(res.content)); //JOSN字符串
        //this.props.history.push({pathname:'/Home'})
        const flag = this.getQueryString('flag');
        if (flag) {
          this.loginOut();
        } else {
          var _user = sessionStorage.getItem("user");
          if (_user) {
            this.setState({
              user: _user
            })
          } else {
            this.props.history.push({
              pathname: '/Login'
            });
          }
        }
        const _key = this.getQueryString('key');
        const _openKeys = this.getQueryString('openKeys');
        sessionStorage.setItem("key", _key);
        sessionStorage.setItem("openKeys", _openKeys);
      } else {
        message.error(res.message);
      }
    })
  }
  urlArgs(name) { 
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i"); 
    var r = window.location.search.substr(1).match(reg); 
    if (r!=null) return (r[2]); return null; 
    }
    getQuery(search,name){
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i"); 
      var r =search.substr(1).match(reg); 
      if (r!=null) return (r[2]); return null; 
    }
  componentWillMount() {
    this.getUserInfo()
  }

  componentDidMount() {
    var timer=setInterval(()=>{
      var _user = sessionStorage.getItem("user");
      if (_user) {
        clearInterval(timer)
        this.getUserMenuList();
      }
    },10)
  }

  // 获取用户菜单列表
  getUserMenuList() {

    var _this = this;
    _this.setState({
      loading: true
    });
    var params = {
      access_token: sessionStorage.getItem("access_token")
    }
    apis.getUserMenuList(params).then(res => {
      // console.log(res);
      if (res.code === 0) {
        let list = res.content;
        _this.setState({
          usermenuList: list,
          loading: false
        });
      } else if (res.code === 400) {
        _this.setState({
          loading: false
        });
        Modal.info({
          title: '登录失效，请重新登录！',
          okText: "确认",
          onOk() {
            sessionStorage.removeItem("user");
            _this.props.history.push({
              pathname: '/Login'
            });
          }
        });
      } else {
        _this.setState({
          loading: false
        });
        message.error(res.message);
      }

    })
  }

  componentWillUnmount = () => {
    this.setState = (state, callback) => {
      return;
    };
  }

  getQueryString = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r;
    if (window.location.search) {
      r = window.location.search.substr(1).match(reg);
    } else {
      r = this.props.location.search.substr(1).match(reg);
    }
    if (r != null) return unescape(r[2]);
    return null;
  }

  loginOut() {
    var params = {
      access_token: sessionStorage.getItem("access_token")
    }
    apis.logout(params).then(res => {
      // console.log(res)
      if (res.code === 0) {
        sessionStorage.removeItem("user");
        window.location.href = apis._baseUrl+'/#/login';
      } else if (res.code === 400) {
        sessionStorage.removeItem("user");
        window.location.href = apis._baseUrl+'/#/login';
      }
    })
  }

  render() {

    return ( <div style = {
        {
          width: '100%',
          height: '100%'
        }
      }>
      { /* user  JSON字符串,onLoginOut   点击Header组件'退出管理控制台'*/ } { /* <Header user={this.state.user} onLoginOut={this.loginOut.bind(this)}/> */ } { /* url:云控制台域名（正式和测试）,onLoginOut   点击Header组件'退出管理控制台' */ } 
      <Header url = {
        apis._baseUrl
      }
      openUrl = {
        apis.openUrl
      }
      onLoginOut = {
        this.loginOut.bind(this)
      }/>

      <div style = {
        {
          width: '100%',
          display: 'flex'
        }
      }> { /* data 数组[{'icon_url':"",'name':"",'parent_uuid':"",'redirect_url':"",'children':[],'uuid':"",'is_system_menu':1}],access_token:url传参,current:默认选择的父菜单,openCurrent:默认打开的父菜单 */ } 
      <Sidebar data = {
        this.state.usermenuList
      }
      url = {
        apis._baseUrl
      }
      access_token = {
        sessionStorage.getItem("access_token")
      }
      current = {
        sessionStorage.getItem("key")
      }
      openCurrent = {
        sessionStorage.getItem("openKeys")
      }
      loading = {
        this.state.loading
      }/> 
      <Routers { ...this.props}/>      
      </div>
      </div>
    );
  }
}

export default Home;