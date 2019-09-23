import React, { Component } from 'react'
import {Breadcrumb} from 'antd'

class Now extends Component {
  render() {
    return (
      <div className='lookidea'>
         <div className="bread-title">
          <div className="bread-title-wrapper">
            <Breadcrumb separator="-">
              <Breadcrumb.Item className="bread-pingjia" style={{marginLeft:10}}>
                意见反馈
              </Breadcrumb.Item>

              <Breadcrumb.Item>查看意见</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
        <div className='lookidea-content'>
          查看意见
        </div>
      </div>
    )
  }
}

export default Now
