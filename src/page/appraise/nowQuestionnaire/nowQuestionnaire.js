// 当前问卷页面
import React, { Component } from 'react'
import { Breadcrumb, Checkbox, Modal, Row, Button } from 'antd'
import './nowQuestionnaire.css'

class Now extends Component {
  state = {
    showModal2: false,
    showModal3: false
  }

  onChange = () => {
    console.log('我被选了')
  }
  onChangeData = (e) => {
    console.log(`checked = ${e.target.checked}`);
    this.props.history.push('appraise/DataSurvey')
  }
  onChangeTihuan = () => {
    this.setState({
      showModal2: true
    })
  }
  handleSetwenjuqn = () => {
    this.setState({
      showModal2: false
    })
  }
  onChangeCopy = () => {
    this.setState({
      showModal3: true
    })
  }
  handleGobianji=()=>{
    this.setState({
      showModal3: false
    })
  }
  handleBack = () => {
    console.log(11)

    // this.props.history.push(-1)
  }
  render() {
    return (
      <div className="nowquestionnaire">
        <div className="bread-title">
          <div className="bread-title-wrapper">
            <Breadcrumb separator="-">
              <Breadcrumb.Item className="bread-pingjia" style={{marginLeft:10}}>
                评价问卷
              </Breadcrumb.Item>

              <Breadcrumb.Item>当前问卷</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
        <div className="bread-content">
          <div className="bread-content-title">
            <h1>APP评价当前问卷</h1>
          </div>
          <div className="bread-content-content">
            <div className="child1">
              <div className="left">小区评价问卷1</div>
              <div className="right">
                <span style={{marginRight:10}}>答卷数:374</span>
                <span>最近发布时间:2019.9.19</span>
              </div>
            </div>
            <div className="child2">
              <div className="left">
                <Checkbox onChange={this.onChange} checked={false}>编辑问卷</Checkbox>
                <Checkbox onChange={this.onChangeData} checked={false}>查看数据</Checkbox>
              </div>
              <div className="right">
                <Checkbox onChange={this.onChangeTihuan} checked={false}>替换问卷</Checkbox>
                <Checkbox onChange={this.onChangeCopy} checked={false}>复制</Checkbox>
              </div>
            </div>
          </div>
        </div>
        <Modal
          title="替换问卷"
          visible={this.state.showModal2}
          footer={null}
          onCancel={() => {
            this.setState({
              showModal2: false
            })
          }}
        >
          <Checkbox.Group style={{ width: '100%' }}>
            <Row>
              <Checkbox value="A">小区评价当前问卷</Checkbox>
            </Row>
            <Row>
              <Checkbox value="B">小区评价当前问卷</Checkbox>
            </Row>
            <Row>
              <Checkbox value="C">小区评价当前问卷</Checkbox>
            </Row>
            <Row>
              <Checkbox value="D">小区评价当前问卷</Checkbox>
            </Row>
            <Row>
              <Checkbox value="E">小区评价当前问卷</Checkbox>
            </Row>
            <p className="nowquestionnaire-set">
              <Button type="primary" onClick={this.handleSetwenjuqn}>
                设为小区评价当前问卷
              </Button>
            </p>
          </Checkbox.Group>
        </Modal>
        <Modal
          visible={this.state.showModal3}
          footer={null}
          width={300}
          onCancel={() => {
            this.setState({
              showModal3: false
            })
          }}
        >
          <p 
          style={{textAlign:'center',marginTop:30}}
          >问卷复制成功</p>
          <p className="nowquestionnaire-set">
          
              <Button type="primary" onClick={this.handleGobianji}>
                前往编辑
              </Button>
            </p>
        </Modal>
      </div>
    )
  }
}

export default Now
