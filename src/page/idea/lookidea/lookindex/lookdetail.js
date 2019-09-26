import React, { Component } from 'react'
import {Tabs,Row,Col,Button} from 'antd'
import Allidea from '../allidea/allidea'
import Yihuiidea from '../yihuiidea/yihuiidea'
import Weihuiidea from './../weihuiidea/weihuiidea'

import './lookdetail.css'
const {TabPane} = Tabs
class Lookdetail extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render() {
    return (
      <div className='lookdetail'>
            <Row>
                  <Col span={24}>
                  <Button type="primary" className='lookdetail-daochu'>导出</Button>
                  </Col>
              </Row>
        <Tabs defaultActiveKey="3" type="line">
      
          <TabPane tab="未回复意见" key="1" >
          {/* 未回复意见 */}
          <Weihuiidea/>
          </TabPane>
          <TabPane tab="已回复意见" key="2">
          {/* 已回复意见 */}
          <Yihuiidea></Yihuiidea>
          </TabPane>
          <TabPane tab="全部意见" key="3">
          {/* 全部意见 */}
          <div className='allidea'>

          <Allidea/>
          </div>
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

export default Lookdetail
