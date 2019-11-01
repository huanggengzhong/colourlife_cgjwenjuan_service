import React, { Component } from 'react'
import './DataSurvey.css'
import { Tabs ,Breadcrumb,Icon} from 'antd'
import Analyze from './../datagaikuang/analyze'
import Datawenjuan from './../data-wenjuan/datawenjuan'
import './DataSurvey.css'
const { TabPane } = Tabs

class DataSurvey extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div className='data-survey'>
        <div className="bread-title">
          <div className="bread-title-wrapper">
            <Breadcrumb separator="-">
              <Breadcrumb.Item
                className="bread-pingjia"
                style={{ marginLeft: 10 }}
              >
                <i className="iconfont icon-fanhui1" style={{ marginLeft: '0px', marginRight: '10px',fontSize:'18px' }} onClick={()=>{
                  console.log(11);
                  this.props.history.goBack(-1);
                }}></i>
                {/* <Icon type="left" style={{ marginLeft: 10, marginRight: 10 }} onClick={()=>{
                  console.log(11);
                  this.props.history.goBack(-1);
                }}/> */}
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
            {/* 问卷数据 */}
            <Datawenjuan/>
          </TabPane>
        </Tabs>
      </div>
    )
  }
}
export default DataSurvey
