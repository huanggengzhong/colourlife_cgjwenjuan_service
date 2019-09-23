import React, { Component } from 'react'
import './DataSurvey.css'
import { Tabs ,Breadcrumb} from 'antd'

import Analyze from './../datagaikuang/analyze'



const { TabPane } = Tabs

class DataSurvey extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div>
        <div className="bread-title">
          <div className="bread-title-wrapper">
            <Breadcrumb separator="-">
              <Breadcrumb.Item
                className="bread-pingjia"
                style={{ marginLeft: 10 }}
              >
                评价问卷
              </Breadcrumb.Item>
              <Breadcrumb.Item>当前问卷</Breadcrumb.Item>
              <Breadcrumb.Item>问卷数据</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
        <Tabs defaultActiveKey="1" type="line">
          <TabPane tab="数据概况" key="1">
            {/* 数据概况 */}
            <Analyze />
            
          </TabPane>
          <TabPane tab="问卷数据" key="2">
            问卷数据
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

export default DataSurvey
