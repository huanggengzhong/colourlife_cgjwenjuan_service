import React, { Component } from 'react'
import {Tabs,Row,Col,Button} from 'antd'

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
      
          <TabPane tab="未回复意见" key="1">
          未回复意见
          </TabPane>
          <TabPane tab="已回复意见" key="2">
          已回复意见
          </TabPane>
          <TabPane tab="全部意见" key="3">
          全部意见
          </TabPane>
        </Tabs>
      </div>
    )
  }
}

export default Lookdetail
