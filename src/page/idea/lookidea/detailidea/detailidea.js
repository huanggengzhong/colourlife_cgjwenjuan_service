import React, { Component } from 'react';
import  {Breadcrumb,Icon} from 'antd';
import './detailidea.css';
class Detailidea extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div className='yijianxiangqing'>
        <div className="yijianxiangqing-title">
          <div className="yijianxiangqing-title-wrapper">
            <Breadcrumb separator="-">
              <Breadcrumb.Item className="yijianxiangqing-pingjia">
                <Icon
                  type="left"
                  style={{ marginLeft: 10, marginRight: 10 }}
                  onClick={() => {
                    console.log(11)
                    this.props.history.goBack(-1)
                  }}
                />
                意见反馈
              </Breadcrumb.Item>
              <Breadcrumb.Item>查看意见</Breadcrumb.Item>
              <Breadcrumb.Item>意见详情</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
        <div className="yijianxiangqing-content">
        {/* 内容  */}
                <div className='title'></div>
                <div className='content1'></div>
                <div className='content1'></div>
                <div className='content1'></div>
                <div className='content1'></div>
        </div>
      </div>
    )
  }
}

export default Detailidea
