import React, { Component } from 'react';
import './subside.css';
import { Menu,Icon} from 'antd';

const SubMenu = Menu.SubMenu;
class Subside extends Component {
  constructor(props) {
    super(props);
    this.state={
      collapsed:false,//展开/关闭导航菜单标志
      selectedKeys:[],//当前选中的菜单项 key 数组
      openKeys:[],  //当前展开的 SubMenu 菜单项 key 数组
    }
  }

  UNSAFE_componentWillMount(){
       var _this=this;
       this.setState({selectedKeys:_this.props.current,openKeys:_this.props.openCurrent});
  }

  //展开/关闭导航菜单
  toggleCollapsed (){
    this.setState({
      collapsed: !this.state.collapsed,  
    });
  }

  //展开关闭SubMenu
  openChange(openKeys){
    this.setState({openKeys})
  }

  //点击 MenuItem 调用此函数
  handleClick(item){
    this.setState({
      selectedKeys: [item.key]
    },()=>{
      this.props.onClickItem&&this.props.onClickItem(item.key);
    })
  }

  render() {
    var submenu=[];
    var userchildmenu=[];
    this.props.menuData.map((ite,i) =>{ 
        if(this.props.menuData[i].children.length){
          userchildmenu.push(this.props.menuData[i].children.map((item,index) =>
            <Menu.Item key={item.key}>
               <Icon type={item.icon_src} />
               <span>{item.name}</span>
            </Menu.Item>
          ));
        }else{
          userchildmenu.push([]);
        }
       });

       this.props.menuData.map((item,index) =>
       {!(item.children.length)?
        submenu.push((<Menu.Item key={item.key}>
            <Icon type={item.icon_src} />
            <span>{item.name}</span>
            </Menu.Item>)):
        submenu.push((<SubMenu key={item.key} title={<span>{item.name}</span>}>
            {userchildmenu[index]}
           </SubMenu>))
      }
    );
    
    return (
      <div style={{height:'calc( 100vh - 48px )'}}>
        <div className={this.state.collapsed ?'_submenu small':'_submenu'}>
           <p className={this.state.collapsed ?'_ptitle _small':'_ptitle'}>{this.props.title}</p>
            <Menu
              mode="inline"
              inlineCollapsed={this.state.collapsed}
              onClick={this.handleClick.bind(this)}
              selectedKeys={this.state.selectedKeys}
              onOpenChange={this.openChange.bind(this)}
              openKeys={this.state.openKeys}
            >
            {submenu}
            </Menu>
            <div className="_foldWrapper" onClick={this.toggleCollapsed.bind(this)}></div>
            <div className="_fold" onClick={this.toggleCollapsed.bind(this)}><Icon type='menu-unfold'/></div>
        </div>
      </div>
    );
  }
}

export default Subside;
