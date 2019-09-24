import React, { Component } from 'react'
import {Breadcrumb} from 'antd'
import Setlei from './setlei/setlei'

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
          <Setlei/>
        </div>
      </div>
    )
  }
}

export default Now
