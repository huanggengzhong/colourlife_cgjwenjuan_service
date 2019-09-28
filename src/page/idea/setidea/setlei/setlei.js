import React, { Component } from 'react'
import { Table, Divider, Button, Row, Col, Modal, Input ,message} from 'antd'
import './setlet.css'
import apis from './../../../../subpage/subapi'
const { confirm } = Modal;



class Setlei extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal1: false,
      showModal2: false,
      inputValue:'',
      inputValue2:'',
      editData:'',
      tableList:[],
      columns :[
        {
          title: '类型名称',
          dataIndex: 'name',
          key: 'name',
          render: text => <span>{text}</span>
        },
        {
          title: '操作',
          key: 'action',
          render: (text, record) => (
            <span>
              <a onClick={this.handleShow2.bind(this,text)}>编辑</a>
              <Divider type="vertical" />
              <span onClick={this.handleDelete.bind(this,text)}>删除</span>
            </span>
          )
        }
      ]

    }
  }
  handleEdit=()=>{
    const  access_token =apis.getToken()
    let _this=this
    apis.get({access_token,name:this.state.inputValue2,id:this.state.editData.id},'/backend/feedbackType/edit').then(res=>{
      console.log(res);
      if(res.code===0){
        message.success(res.content);
        _this.setState({
          showModal2: false,
          inputValue2:''
        })
        _this.getData();
      }else{
        message.error(res.message);
      }
    })
    
  }
  handleDelete=(text)=>{
    console.log(text);
    const  access_token =apis.getToken()
    let _this=this
    confirm({
      title: '你真的要删除吗?',
      // content: 'Some descriptions',
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        apis.get({access_token,id:text.id},'/backend/feedbackType/del').then(res=>{
          console.log(res);
          if(res.code===0){
            message.success(res.content);
           
            _this.getData();
          }else{
            message.error(res.message);
          }
        })
      },
      onCancel() {
        console.log('Cancel');
      },
    });
    
 
  }
  handleShow = () => {
    this.setState({
      showModal1: true
    })
  }
  handleShow2 = (text) => {
    this.setState({
      showModal2: true,
      editData:text
    })
  }
  handleInput=(e)=>{
    // console.log(e.target.value);
    
    this.setState({
      inputValue:e.target.value
    })
  }
  handleInput2=(e)=>{
    // console.log(e.target.value);
    
    this.setState({
      inputValue2:e.target.value
    })
  }
  handleAdd(){
    const  access_token =apis.getToken()
    let _this=this
    apis.get({access_token,name:this.state.inputValue},'/backend/feedbackType/add').then(res=>{
      console.log(res);
      if(res.code===0){
        message.success(res.content);
        _this.setState({
          showModal1: false,
          inputValue:''
        })
        _this.getData();
      }else{
        message.error(res.message);
      }
    })
  }
  getData(){
    const  access_token =apis.getToken()
  
    apis.get({access_token,name:this.state.inputValue},'/backend/feedbackType/list').then(res=>{
      console.log(res);
      if(res.code===0){
        this.setState({
          tableList:res.content
        })
      }else{
        message.error(res.message);
      }
    })
  }
  componentDidMount(){
   this.getData();
  }
  render() {
    return (
      <div className="setlei">
        <div className="setlei-title" style={{ marginTop: 20 }}>
          <h1 style={{ fontSize: 29, fontWeight: 600, marginLeft: 29 }}>
            意见反馈类型
          </h1>
        </div>
        <div className="setlei-content">
          <Row>
            <Col span={24}>
              <Button
                type="primary"
                style={{ float: 'right' }}
                onClick={this.handleShow}
              >
                新增类型
              </Button>
            </Col>
          </Row>
          <Table
            columns={this.state.columns}
            dataSource={this.state.tableList}
            // dataSource={data}
            pagination={false}
            align="right"
          />
        </div>
        {/* 弹框 */}
        {/* 弹框 */}
        <Modal
          title="新增类型"
          visible={this.state.showModal1}
          footer={null}
          onCancel={() => {
            this.setState({
              showModal1: false
            })
          }}
          width={400}
          className="setidea-modal"
        >
          <Row>
            <Col span={5} className="leixingname">
              类型名称:
            </Col>
            <Col span={19}>
              <Input placeholder="请输入要增加的类型" onChange={this.handleInput} style={{borderRadius:'17px'}}/>
            </Col>
          </Row>
          <Row style={{ marginTop: 35 }}>
            <Col align="center">
              <Button type="primary" onClick={this.handleAdd.bind(this)}>确定</Button>
            </Col>
          </Row>
        </Modal>
        <Modal
          title="编辑类型"
          visible={this.state.showModal2}
          footer={null}
          onCancel={() => {
            this.setState({
              showModal2: false
            })
          }}
          width={400}
          className="setidea-modal"
        >
          <Row>
            <Col span={5} className="leixingname">
              类型名称:
            </Col>
            <Col span={19}>
              <Input placeholder="请输入新的类型名" onChange={this.handleInput2} style={{borderRadius:'17px'}}/>
            </Col>
          </Row>
          <Row style={{ marginTop: 35 }}>
            <Col align="center">
              <Button type="primary" onClick={this.handleEdit.bind(this)}>确定</Button>
            </Col>
          </Row>
        </Modal>
      </div>
    )
  }
}

export default Setlei
