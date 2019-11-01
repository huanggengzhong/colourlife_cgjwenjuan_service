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
      zuijiaArr: [],
      value:'',
      imageList:[]
    }
    this.handleChange = this.handleChange.bind(this);
  }
  componentWillMount() {
    this.setState({
      id: this.props.match.params.id
    })
  }
  componentDidMount() {
    // 这里可以正常获取传递过来的值
    // console.log(this.state.id);//
    console.log(this.state.content);
    
this.getData();
  
  }
  getData(){
    const access_token = window.sessionStorage.getItem('access_token')
    apis
      .get({ access_token, id: this.state.id }, 'backend/feedback/detail')
      .then(res => {
        console.log(res.content.replay_arr)
        if (res.code === 0) {
          this.setState({
            content: res.content,
            zuijiaArr: res.content.replay_arr,
            imageList:res.content.image
          })
        } else {
          message.error(res.message)
        }
      })
  }
  handleChange(event) {
    // console.log(event.target.value);
    
    this.setState({value: event.target.value});
  }
  handleAdd=()=>{
    console.log(this.state.id);
    console.log(this.state.value);
    const access_token = window.sessionStorage.getItem('access_token')
    apis
      .get({ access_token, id: this.state.id,content:this.state.value }, 'backend/feedback/add')
      .then(res => {
        console.log(res)
        if (res.code === 0) {
          this.setState({
           value:''
          },()=>{
            message.success(res.content) 
            this.getData();
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
                  <i className="iconfont icon-fanhui1" style={{ marginLeft: '0px', marginRight: '10px',fontSize:'18px' }} onClick={()=>{
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
                (<Tag color="#f50">未回复</Tag>)
                  
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
            {
              this.state.imageList.map((item,index)=>{
                return (
                  <img src={item} key={index}/>
                )
              })
            }
            {/* <img src={this.state.content.image} />
            <img src={this.state.content.image} />
            <img src={this.state.content.image} /> */}
          </div>
          <form >
          <div className="huifu-fankui">
            <div className="child1">回复反馈:</div>
            <div className="child2">
              <textarea cols="190" rows="10" onChange={this.handleChange} value={this.state.value} />
            </div>
            <div className="zuijia">
              <Button
                style={{
                  borderRadius: '15px'
                }}
                onClick={this.handleAdd}
                type="primary"
              >
                追加回复
              </Button>
            </div>
          </div>
          </form>
          <div className="huifu-recored">
            <div className="huifu-title">回复记录</div>
            {this.state.zuijiaArr.map((item, index) => {
              return (
                <Row className="child1" style={{ marginTop: '10px' }} key={index}>
                  <Col span={1}>
                  <div
                    style={{
                      // width: '70px',
                      border:"1px solid #ccc",
                      borderRadius: '15px',
                      // paddingLeft:'5px',
                      // paddingRight:'5px',
                      // marginRight: '20px',
                      height: '28px',
                      lineHeight: '28px'
                    }}
                  >
                    追加回复
                  </div>
                  </Col>
                  <Col span={2}>
                  <div
                    style={{ textAlign: "center"}}
                    className="man"
                  >
                    处理人:{item.reply_name}
                  </div>
                  </Col>
                  <Col span={18}>
                  {/* <div className='man' style={{width:'100px'}}></div> */}
                  <div className="content" style={{ marginRight: '20px' }}>
                    回复内容:{item.content}
                  </div>
                  </Col>
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
