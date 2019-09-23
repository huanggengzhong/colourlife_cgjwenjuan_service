import React from 'react';
import {Table,notification,Modal,Button} from 'antd';
import api from './../subapi'
export default class detail_list extends React.Component {
    constructor(props){
        super(props);
        this.state={
            data:[],
            currentPage:1,
            tableDataTotal:0,
            visible:false,
            access_token:'',
            id:this.GetQueryString1('id'),
            question_id:this.GetQueryString1('question_id'),
            title:decodeURI(this.GetQueryString1('title')),
            question_title:decodeURI(this.GetQueryString1('question')),
            words:['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
        }
    }
    componentDidMount(){
        window.document.title='问卷详情';
        this.setState({access_token:sessionStorage.getItem('access_token')},()=>{
                this.search_func();
        })
    }
    search_func=()=>{
        api.getFillList({access_token:this.state.access_token,question_id:this.state.question_id,id:this.state.id,page:this.state.currentPage,page_size:10}).then(res=>{
            if(res.code===0){
                this.setState({tableDataTotal:res.content.page.total_record,data:res.content.list||[]})
            }else{
                notification.error({
                    message: '错误',
                    description: res.message,
                })
            }
        })
    }
    GetQueryString1=(name)=> { 
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i"); 
        var r = this.props.location.search.substr(1).match(reg); 
        if (r!=null) return (r[2]); return null; 
        }
    // handleOk = (e) => {
    //     console.log(e);
    //     this.setState({
    //       visible: false,
    //     });
    //   }
    
    //   handleCancel = (e) => {
    //     console.log(e);
    //     this.setState({
    //       visible: false,
    //     });
    //   }
      //查看详情
    getDetail=(id)=>{
        api.getQuestionList({access_token:this.state.access_token,id:id}).then(res=>{
            if(res.code===0){
                console.log(res)
                Modal.info({
                    title: res.content.question_name,
                    content: (
                      <div className='detail_alert'>
                            <p><span>id：</span>{res.content.id}</p>
                            <p><span>ip：</span>{res.content.ip}</p>
                            <p><span>问卷来源：</span>{res.content.source}</p>
                            <p><span>手机号：</span>{res.content.mobile}</p>
                            <p><span>问卷人：</span>{res.content.name}</p>
                            <p><span>提交时间：</span>{res.content.submit_time}</p>
                            <h3>问卷详细：</h3>
                            {res.content.question.length?(<ul>
                                {res.content.question.map((v,i)=>{
                                    console.log(v)
                                    if(v.answer_type===1){
                                        return (<li key={i}><h3>{i+1}、单选题：</h3><p>{v.question}?</p>{v.answer_list.length?(<div>
                                            {v.answer_list.map((vv,ii)=>{
                                                return (<span key={ii} className={vv.select===1?'select':''}>{`${this.state.words[ii]}.${vv.answer}`}</span>)
                                            })}
                                        </div>):''}</li>)
                                    }else {
                                        return (<li key={i}><h3>{i+1}、多选题：</h3><p>{v.question}?</p>
                                        {v.answer_list.length?(<div>
                                            {v.answer_list.map((vv,ii)=>{
                                                return (<span key={ii} className={vv.select===1?'select':''}>{`${this.state.words[ii]}.${vv.answer}`}</span>)
                                            })}
                                        </div>):''}</li>)
                                    }
                                })}
                            </ul>):<div></div>}
                            {res.content.fill.length?(<ul>
                                {res.content.fill.map((v,i)=>{
                                    if(v.answer_type===3){
                                        return (<li key={i}><h3>{i+1+res.content.question.length}、填空题：</h3><p>{v.question}?</p><div><span>{v.answer}</span></div></li>)
                                    }else{
                                        return (<li key={i}><h3>{i+1+res.content.question.length}、文本题：</h3><p>{v.question}?</p><div><span>{v.answer}</span></div></li>)
                                    }
                                })}
                            </ul>):<div></div>}
                            <p style={{color:'red'}}>*红色表示已选择</p>
                      </div>
                    ),
                    okText:'确认'
                });
            }else{
                notification.error({
                    message: '错误',
                    description: res.message,
                }) 
            }
        })
        
    }
    render(){
        const {Column} =Table;
        return (<div style={{marginTop:20}}>
            <div><Button onClick={()=>{window.history.go(-1)}}>返回</Button></div>
            <p style={{marginTop:10}}>标题：{this.state.title}</p>
            <p style={{marginTop:10}}>问题：{this.state.question_title}</p>
            <Table bordered dataSource={this.state.data} rowKey={record=>record.id} pagination={{
                        current: this.state.currentPage,
                        pageSize: 10,
                        total: this.state.tableDataTotal,
                        showTotal:total=>`总共${total}条数据`
                    }} onChange={v=>{
                        this.setState({currentPage:v.current},()=>{
                            this.search_func()
                        })
                    }}>
                    <Column
                        title="序号"
                        dataIndex="id"
                        width={80}
                        align='center'/>
                    <Column
                        title="填写时间"
                        align='center'
                        width={150}
                        dataIndex="submit_time"/>
                    <Column
                        title='填空内容'
                        align='center'
                        dataIndex="content"/>
                        <Column
                        title="操作"
                        align='center'
                        width={100}
                        render={(text, record) => (
                           <div>
                               {/* <Button type='primary' onClick={()=>{
                               
                           }}  size='small'>编辑</Button> */}
                           <Button type='primary' onClick={this.getDetail.bind(this,text.id)} size='small'>详情</Button>
                           {/* <Button style={{marginLeft:10}} onClick={this.delete.bind(this,record)}  type='danger' size='small'>删除</Button> */}
                           </div>
                        )}/>
                </Table>

                {/* 弹窗 */}
                {/* <Modal
                    title="问卷详情"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal> */}
        </div>)
    }

}