import React, { Component } from 'react'
import { Breadcrumb,Checkbox,Icon } from 'antd'
import './kuQuestionnaire.css'

class KuQuestionnaire extends Component {
  onChange=()=>{
    console.log('我被选了');
    
    
  }
  onChangeData=()=>{
    this.props.history.push('appraise/DataSurvey')
  }
  render() {
    return (
      <div className='kuQuestionnaire'>
        <div className='bread-title'>
          <div className='bread-title-wrapper'>
          <Breadcrumb separator="-">
         
                <Icon type="left" style={{marginLeft:10,marginRight:10}}/>
             
          <Breadcrumb.Item className="bread-pingjia">评价问卷</Breadcrumb.Item>
          <Breadcrumb.Item>问卷库</Breadcrumb.Item>
        </Breadcrumb>
          </div>
       
        </div>
        <div className='bread-content'>
          <div className="bread-content-title"> 
            <h1>小区评价问卷列表</h1>
            <div>
              
            </div>
          </div>
          <div className='bread-content-content'> 
            <div className='child1'>
              <div className="left">小区评价问卷1</div>
              <div className="right">
                <span>答卷数:374</span>
                <span>最近发布时间:2019.9.19</span>
              </div>
            </div>
            <div className='child2'>
            <div className="left">
            <Checkbox onChange={this.onChange}>编辑问卷</Checkbox>
            <Checkbox onChange={this.onChangeData}>查看数据</Checkbox>
            </div>
              <div className="right">
            <Checkbox onChange={this.onChange}>替换问卷</Checkbox>
            <Checkbox onChange={this.onChange}>复制</Checkbox>           
              </div>
            </div>
          </div>
        </div>
       
      </div>
    )
  }
}

export default KuQuestionnaire

