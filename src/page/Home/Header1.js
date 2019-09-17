import React, { Component } from 'react';
import './header.css';
import { Menu,  Dropdown, Icon,Input,Avatar,Badge,Modal} from 'antd';

const confirm = Modal.confirm;
const Search = Input.Search;
class Header extends Component {
  constructor(props) {
    super(props);
    this.state={
      user_image:'',//用户头像
    }
  }

  componentDidMount(){
    
  }

  //退出登录
  loginOut(){
    var _this = this;
    confirm({
      title: '确认退出吗?',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        _this.props.onLoginOut&&_this.props.onLoginOut()
      },
      onCancel() {
        
      },
    });
  }

  //点击搜索或者回车的回调
  search(value, event){

  }

  render() {
    var _user = sessionStorage.getItem("user");
    var user_image;
    if( _user){
      _user = JSON.parse( _user);
      user_image=_user.user_info.head_img_url
    }
    const hoverContent=(
    <div>
      {/* <ul>
       <li><p>彩生活年终总结大会流程1</p><p><span>2018-07-06  12:23</span></p></li>
       <li><p>彩生活年终总结大会流程2</p><p><span>2018-07-06  12:23</span></p></li>
       <li><p>彩生活年终总结大会流程3</p><p><span>2018-07-06  12:23</span></p></li>
       <li><p>彩生活年终总结大会流程</p><p><span>2018-07-06  12:23</span></p></li>
       <li><p>彩生活年终总结大会流程</p><p><span>2018-07-06  12:23</span></p></li>
       <li><p>彩生活年终总结大会流程</p><p><span>2018-07-06  12:23</span></p></li>
       <li><p>彩生活年终总结大会流程</p><p><span>2018-07-06  12:23</span></p></li>
       <li><p>彩生活年终总结大会流程</p><p><span>2018-07-06  12:23</span></p></li>
       <li><p>彩生活年终总结大会流程</p><p><span>2018-07-06  12:23</span></p></li>
       <li><p>彩生活年终总结大会流程</p><p><span>2018-07-06  12:23</span></p></li>
       <li><p>彩生活年终总结大会流程</p><p><span>2018-07-06  12:23</span></p></li>
      </ul>
      <div className="message_footer">查看更多</div> */}
    </div>
    );
    const order_menu = (
      <Menu style={{marginRight:-12,marginTop:10}}>
       {/* <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="#">我的工单</a>
       </Menu.Item>
       <Menu.Item>
       <a target="_blank" rel="noopener noreferrer" href="#">提交工单</a>
       </Menu.Item> */}
      </Menu>
    );
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
            <div className="_cyz_logo"><img src={require("./logo.png")}/></div>

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
            <Badge count={0} style={{color: '#fefefe',backgroundColor: 'rgba(242, 156, 51, 1)',width:24,borderRadius: 5,marginTop:-5,marginLeft:5,marginRight:13}}/>
          {/* </Popover> */}
          </div>

          <div className="order">
            {/* <Dropdown overlay={order_menu} placement="topRight"> */}
              <span>工单</span>
            {/* </Dropdown> */}
          </div>

          <div className="help">
            {/* <span>帮助与文档</span> */}
            <a href={`${this.props.openUrl}/document?access_token=${sessionStorage.getItem("access_token")}`}>帮助与文档</a>
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
