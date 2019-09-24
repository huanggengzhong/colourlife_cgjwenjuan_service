import React, { Component } from 'react';
import {Table,Divider, Button,Row ,Col,Modal,Input} from 'antd';
import './setlet.css'
const columns = [
    {
      title: '类型名称',
      dataIndex: 'name',
      key: 'name',
      render: text => <span>{text}</span>,
    },
   
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a>编辑</a>
          <Divider type="vertical" />
          <span>删除</span>
        </span>
      ),
    },
  ];
  
const data = [
    {
      key: '1',
      name: '功能使用',
     
    },
    {
      key: '2',
      name: '功能建议',
     
    },
    {
      key: '3',
      name: '功能建议',
     
    },
   
  ];
class Setlei extends Component {
  constructor(props) {
    super(props)
    this.state = {
        
            showModal1:false
        
    }
  }
  handleShow=()=>{
      this.setState({
          showModal1:true
      })
  }
  render() {
    return (
      <div className='setlei'>
        <div className="setlei-title" style={{ marginTop: 20 }}>
          <h1 style={{ fontSize: 29, fontWeight: 600, marginLeft: 29 }}>
            意见反馈类型
          </h1>
        </div>
        <div className='setlei-content'>
        <Row>
      <Col span={24}>
          <Button type="primary" style={{float:"right"}} onClick={this.handleShow}>新增类型</Button>
      </Col>
      
    </Row>
        <Table columns={columns} dataSource={data} pagination={false} align='right'/>
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
          className='setidea-modal'
        >
             <Row>
                 <Col span={5} className="leixingname">类型名称:</Col>
                 <Col span={19}>
                 <Input placeholder="" />
                 </Col>
            
        </Row>
        <Row style={{marginTop:35}}>
            <Col align='center' >
            <Button type="primary">确定</Button>
            </Col>
        </Row>
            </Modal>
       
      </div>
    )
  }
}

export default Setlei
