import React, { Component } from 'react'
import {Breadcrumb} from 'antd'

class Now extends Component {
  render() {
    return (
      <div className='setidea'>
         <div className="bread-title">
          <div className="bread-title-wrapper">
            <Breadcrumb separator="-">
              <Breadcrumb.Item className="bread-pingjia" style={{marginLeft:10}}>
                意见反馈
              </Breadcrumb.Item>

              <Breadcrumb.Item>设置类型</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
        <div className='setidea-content'>
          设置类型
        </div>
      </div>
    )
  }
}

export default Now
