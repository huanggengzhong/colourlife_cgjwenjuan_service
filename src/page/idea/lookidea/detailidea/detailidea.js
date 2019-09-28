import React, { Component } from 'react'
import { Breadcrumb, Icon, Col, Row, Tag, Button, message } from 'antd'
import './detailidea.css'
import apis from './../../../../subpage/subapi'
class Detailidea extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: '',
      content: '',
      zuijiaArr: []
    }
  }
  componentWillMount() {
    this.setState({
      id: this.props.match.params.id
    })
  }
  componentDidMount() {
    // 这里可以正常获取传递过来的值
    // console.log(this.state.id);//

    const access_token = window.sessionStorage.getItem('access_token')
    apis
      .get({ access_token, id: this.state.id }, '/backend/feedback/detail')
      .then(res => {
        console.log(res)
        if (res.code === 0) {
          this.setState({
            content: res.content,
            zuijiaArr: res.content.replay_arr
          })
        } else {
          message.error(res.message)
        }
      })
  }
  render() {
    return (
      <div className="yijianxiangqing">
        <div className="yijianxiangqing-title">
          <div className="yijianxiangqing-title-wrapper">
            <Breadcrumb separator="-">
              <Breadcrumb.Item className="yijianxiangqing-pingjia">
                {/* <Icon
                  type="left"
                  style={{ marginLeft: 10, marginRight: 10 }}
                  onClick={() => {
                    console.log(11)
                    this.props.history.goBack(-1)
                  }}
                /> */}
                  <i class="iconfont icon-fanhui1" style={{ marginLeft: '0px', marginRight: '10px',fontSize:'18px' }} onClick={()=>{
                  console.log(11);
                  this.props.history.goBack(-1);
                }}></i>
                意见反馈
              </Breadcrumb.Item>
              <Breadcrumb.Item>查看意见</Breadcrumb.Item>
              <Breadcrumb.Item>意见详情</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
        <div className="yijianxiangqing-content" style={{ padding: '20px' }}>
          {/* 内容  */}
          <div className="title">
            <h1 style={{ fontWeight: 600, fontSize: '30px' }}>
              功能使用反馈详情
            </h1>
          </div>
          <div className="content1">
            <Row>
              <Col span={2}>
                状态:{' '}
                {this.state.content.is_reply === 1 ? 
                  <Tag color="#87d068">已回复</Tag>
                : 
                <Tag color="#f50">未回复</Tag>
                  
                }
              </Col>
              <Col span={2}>ID:{this.state.content.community_uuid}</Col>
              <Col span={2}>昵称:{this.state.content.nick_name}</Col>
              <Col span={2}>手机:{this.state.content.mobile}</Col>
              <Col span={2}>小区:{this.state.content.community_name}</Col>
              <Col span={2}>渠道:{this.state.content.from_type}</Col>
              <Col span={2}>版本:{this.state.content.version}</Col>
              {/* <Col span={3}></Col> */}
            </Row>
          </div>
          <div className="content1" style={{ marginTop: '20px' }}>
            <Row>
              <Col span={24}>
                {/* 用户反馈:功能使用的意见功能使用的意见功能使用的意见功能使用的意见 */}
                用户反馈: {this.state.content.content}
              </Col>
            </Row>
          </div>
          <div className="image-wrapper">
            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1569424674249&di=e728f7a625f1d4008f461de25c87771d&imgtype=0&src=http%3A%2F%2Fdpic.tiankong.com%2Fu7%2Fn2%2FQJ7103954309.jpg%3Fx-oss-process%3Dstyle%2Fshow" />
            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1569424674249&di=e728f7a625f1d4008f461de25c87771d&imgtype=0&src=http%3A%2F%2Fdpic.tiankong.com%2Fu7%2Fn2%2FQJ7103954309.jpg%3Fx-oss-process%3Dstyle%2Fshow" />
            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1569424674249&di=e728f7a625f1d4008f461de25c87771d&imgtype=0&src=http%3A%2F%2Fdpic.tiankong.com%2Fu7%2Fn2%2FQJ7103954309.jpg%3Fx-oss-process%3Dstyle%2Fshow" />
          </div>
          <div className="huifu-fankui">
            <div className="child1">回复反馈:</div>
            <div className="child2">
              <textarea cols="220" rows="10" />
            </div>
            <div className="zuijia">
              <Button
                style={{
                  borderRadius: '15px'
                }}
              >
                追加回复
              </Button>
            </div>
          </div>

          <div className="huifu-recored">
            <div className="huifu-title">回复记录</div>
            {this.state.zuijiaArr.map((item, index) => {
              return (
                <Row className="child1" style={{ marginTop: '10px' }} key={index}>
                  <Button
                    style={{
                      borderRadius: '15px',
                      padding: '1px',
                      marginRight: '20px',
                      height: '28px',
                      lineHeight: '17px'
                    }}
                  >
                    追加回复
                  </Button>
                  <div
                    className="man"
                    style={{ marginRight: '20px', width: '100px' }}
                  >
                    处理人:{item.reply_name}
                  </div>
                  {/* <div className='man' style={{width:'100px'}}></div> */}
                  <div className="content" style={{ marginRight: '20px' }}>
                    回复内容:{item.content}
                  </div>
                </Row>
              )
            })}
            {/* <Row className="child1" style={{ marginTop: '10px' }}>
              <Button
                style={{
                  borderRadius: '15px',
                  padding: '1px',
                  marginRight: '20px',
                  height: '28px',
                  lineHeight: '17px'
                }}
              >
                追加回复
              </Button>
              <div
                className="man"
                style={{ marginRight: '20px', width: '100px' }}
              >
                处理人:李四
              </div>
              
              <div className="content" style={{ marginRight: '20px' }}>
                回复内容:哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈
              </div>
            </Row>
            <Row className="child1" style={{ marginTop: '10px' }}>
              <Button
                style={{
                  borderRadius: '15px',
                  padding: '1px',
                  marginRight: '20px',
                  height: '28px',
                  lineHeight: '17px'
                }}
              >
                追加回复
              </Button>
              <div
                className="man"
                style={{ marginRight: '20px', width: '100px' }}
              >
                处理人:李四
              </div>
            
              <div className="content" style={{ marginRight: '20px' }}>
                回复内容:哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈
              </div>
            </Row> */}
          </div>
        </div>
      </div>
    )
  }
}

export default Detailidea
