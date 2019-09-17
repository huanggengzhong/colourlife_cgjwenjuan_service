import React from 'react'
import { Layout, Menu, Icon ,Button} from 'antd'
import './index.css'
const { Header, Sider, Content } = Layout

class SiderDemo extends React.Component {
  state = {
    collapsed: false
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  render() {
    return (
     
        <Layout className="appraise-wrapper">
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu theme="" mode="inline" defaultSelectedKeys={['1']}>
            <div key="1" className="appraise-title">
             
              <span>评价问卷</span>
            </div>
            <Menu.Item key="2">
            <Icon type="file-text" />
              <span>当前问卷</span>
            </Menu.Item>
            <Menu.Item key="3">
            <Icon type="hdd" />
              <span>问卷库</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
            <div className="title">评价问卷-当前问卷-小区评价问卷数据</div>
            <Button size={'large'}>数据概况</Button>
            <Button size={'large'}>答卷详情</Button>
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: 280
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
   
    )
  }
}

export default SiderDemo
