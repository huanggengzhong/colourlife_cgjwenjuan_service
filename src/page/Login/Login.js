import React, { Component } from 'react';
import { message,Icon} from 'antd';
import './login.css'
import apis from './../../api/api';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state={qrcode_uuid:'',qrcode_img:'',access_token:'',username:'',user_image:'',time:'',showReload:false}
  }

  componentDidMount(){

    var _this=this;
    _this.getQrcodeInfo();
  }

   //获取用户扫码登录的二维码基础信息
  getQrcodeInfo(){

    var time=setInterval(function(){
      _this.getTokenInfo();
    },1000)

    var _this=this;

    _this.setState({time:time})

        var params = {};   
        var timer=setInterval(()=>{
           //调用用户扫码登录的二维码基础信息接口
          apis.getQrcodeInfo(params).then(res => {
            // console.log(res);
            if(res.code === 0){
              let _qrcode_uuid=res.content.qrcode_uuid;
              let _qrcode_img=res.content.qrcode_img;
              _this.setState({qrcode_uuid:_qrcode_uuid,qrcode_img:_qrcode_img})
              clearInterval(timer)
            }else{
              message.error(res.message);             
            }
          })   
        },1000)       
  }

  //根据二维码唯一UUID获取ACCESS_TOKEN
  getTokenInfo(){
    var _this=this;

        var params = {
          uuid:_this.state.qrcode_uuid,
        };
    
        //调用根据二维码唯一UUID获取ACCESS_TOKEN接口
        apis.getTokenInfo(params).then(res => {
          // console.log(res);
          if(res.code === 0){
            let _access_token =res.content.access_token ;
            _this.setState({access_token:_access_token})
            sessionStorage.setItem("access_token",_this.state.access_token);
            if(_this.state.access_token){
              _this.setState({qrcode_uuid:''});
              clearInterval(_this.state.time);
              //_this.getUserInfo();
              this.props.history.push({pathname:'/Home'})
            }
          }else if(res.code===2003){
            message.error('二维码已过期，请点击图片重新获取二维码！');
            _this.setState({showReload:true})
            clearInterval(_this.state.time);
          }
    
        })
  }

  // 根据ACCESS_TOKEN获取用户基本信息
  getUserInfo(){
    var _this=this;

        var params = {
          access_token:_this.state.access_token,
        };
    
        //调用根据ACCESS_TOKEN获取用户基本信息接口
        apis.getUserInfo(params).then(res => {
          // console.log(res);
          if(res.code === 0){
            sessionStorage.setItem("user",JSON.stringify(res.content));  //JOSN字符串
            this.props.history.push({pathname:'/Home'})
          }else{
            message.error(res.message);
          }
    
        })
  }

   reload(){
     this.setState({showReload:false});
     this.getQrcodeInfo();
   }

   componentWillUnmount(){
    // 在卸载的时候对所有的操作进行清除
    this.setState = (state,callback)=>{
        return;
      };
   }

  render() {
    return (
      <div className="wrapper">
          {/* 头部logo */}
          <div className="header">
             <img alt='彩之云' src={require("./../../static/images/logo.png")} className="cyz_logo"/>
          </div>

          {/* 登录框 */}
          <div className="contentWrapper">
          <div className="loginWrapper">
             <div className="leftWrapper">
                <p className="left_title">彩之云管理控制台即将上线</p>
                {/* <div className="left_content">
                  <p>在网上从事信息咨询、金融财经咨询业务;</p>
                  <p>电子产品的技术开发;投资管理; 投资咨询;</p>
                  <p>受托资产管理;经济信息咨询;企业管理咨询;</p>
                  <p>商务信息咨询</p>
                </div> */}
             </div>

             <div className="rightWrapper">
                 <p className="right_title">扫码登录</p>
                 <div className="data_wrapper">
                    <img alt='彩之云' src={this.state.qrcode_img} className="data"/>
                    {!this.state.showReload?(
                      ''
                    ):(
                      <div>
                        <div className="mask"></div>
                        <Icon type="reload" style={{color:'#fff',position:'absolute',fontSize:'32px',top:57,left:57,zIndex:1000}} onClick={this.reload.bind(this)}/>
                      </div>
                    )}
                    
                 </div>
                 <p className="msg">打开 <a className="app_msg">彩之云APP</a> 扫一扫登录</p>
                 <div className="cyz_msg">
                    <p>下载彩之云APP</p>
                    <p>注册彩之云</p>
                 </div>
             </div>
             {/* <div className="rightWrapper">
               <form>
                 <p className="right_title">密码登录</p>
                 <div className="_input">
                     <input type="text" placeholder="请输入账号" value={this.state.username} onChange={this.changeUsername.bind(this)}/>
                     <input type="password" placeholder="请输入登录密码"  value={this.state.pwd} onChange={this.changePassword.bind(this)}/>
                     <input type="button" className="login_btn" value="登录" onClick={this.handleSubmit.bind(this)}/>
                 </div>
              </form>
             </div> */}
          </div>
          </div>

          {/* 页脚 */}
          <div className="footer">
            <div className="about">
              <p>关于我们</p>
              <p>法律声明及隐私权政策</p>
              <p>联系我们</p>
            </div>
            <p className="address">© 2016-2018 http://www.colourlife.com Inc. ICP备案号：粤ICP备13038151号 </p>
          </div>
      </div>
    );
  }
}

export default Login;
