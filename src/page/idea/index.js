import React from 'react'
import Lookidea from './lookidea/index'


import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Layout, Menu, Icon ,Button} from 'antd'
import './index.css'
const {  Sider, Content,Header } = Layout

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
      <Router>
        <Layout className="appraise-wrapper">
          <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <div className="logo" />
            <Menu theme="" mode="inline" defaultSelectedKeys={['1']}>
              <div key="1" className="appraise-title">
                <span>意见反馈</span>
              </div>
              <Menu.Item key="2">
                <Link to="/" className="my-slider">
                  <Icon type="file-text" />
                  <span className="my-slider" >查看意见</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/appraise/library" className="my-slider">
                  <Icon type="hdd" />
                  <span className="my-slider">设置类型</span>
                </Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }}>
         
              <div className="title">意见反馈-查看意见-意见详情</div>
           
              
            </Header>
            <Content
              style={{
                margin: '24px 16px',
                background: '#fff',
                minHeight: 280
              }}
            >
              <Route exact path="/" component={Lookidea} />
              <Route exact path="/appraise/library" component={About} />
            </Content>
          </Layout>
        </Layout>
      </Router>
    )
  }
}



function About() {
  return (
    <div>
      <h2>设置类型</h2>
    </div>
  )
}
export default SiderDemo
