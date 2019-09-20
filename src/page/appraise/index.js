// 评价问卷
import React from 'react'
import NowQuestionnaire from './nowQuestionnaire/nowQuestionnaire'
import KuQuestionnaire from './kuQuestionnaire/kuQuestionnaire'
import DataSurvey from './DataSurvey/DataSurvey'


import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import './index.css'
const {  Sider, Content } = Layout

class SiderDemo extends React.Component {
  state = {
    collapsed: false,
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
            <Menu theme="" mode="inline" defaultSelectedKeys={['2']} >
              <div key="1" className="appraise-title">
                <span>评价问卷</span>
              </div>
              <Menu.Item key="2" >
                <Link to="/" className="my-slider">
                
                  <span className="my-slider">当前问卷</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/appraise/library" className="my-slider">
                 
                  <span className="my-slider">问卷库</span>
                </Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Content
              style={{
                margin: '24px 16px',
                background: '#fff',
                minHeight: 280
              }}
            >
              <Route exact path="/" component={NowQuestionnaire} />
              <Route exact path="/appraise/library" component={KuQuestionnaire} />
              <Route exact path="/appraise/DataSurvey" component={DataSurvey}/>
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
      <h2>问卷库</h2>
    </div>
  )
}
export default SiderDemo
