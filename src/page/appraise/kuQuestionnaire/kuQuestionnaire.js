//这里是问卷库页面
import React, { Component } from 'react'
import { Breadcrumb,  Icon } from 'antd'
import Questionnaire from '../../../subpage/questionnaire/questionnaire'
import './kuQuestionnaire.css'

class KuQuestionnaire extends Component {
  onChange = () => {
    console.log('我被选了')
  }
  onChangeData = () => {
    this.props.history.push('appraise/DataSurvey')
  }
  render() {
    return (
      <div className="kuQuestionnaire">
        <div className="bread-title">
          <div className="bread-title-wrapper">
            <Breadcrumb separator="-">
              <Breadcrumb.Item className="bread-pingjia">
              <Icon type="left" style={{ marginLeft: 10, marginRight: 10 }} onClick={()=>{
                  console.log(11);
                  this.props.history.goBack(-1);
                }}/>
                评价问卷
              </Breadcrumb.Item>
              <Breadcrumb.Item>问卷库</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
        <div style={{marginTop:20}}>
          {/* 问卷库内容 */}
          <Questionnaire/>>
        </div>
      </div>
    )
  }
}

export default KuQuestionnaire
