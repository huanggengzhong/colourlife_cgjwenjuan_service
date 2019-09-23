import React from 'react'
import {DatePicker,Button,Table,Select,notification,Tag,Modal} from 'antd'
import moment from 'moment';
import 'moment/locale/zh-cn';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import './questionnaire.css'
import history from './../../router/history'
import api from './../subapi'
moment.locale('zh-cn');
const {RangePicker }=DatePicker;
export default class questionnaire extends React.Component {
    constructor(props){
        super(props);
        this.state={
            wenjuan_name:'',
            wenjuan_time:[],
            data:[],
            currentPage:1,//当前页
            tableDataTotal:0,//总数据量
            wenjuan_list:[],
            access_token:'',
            form_type:'',//设备渠道
            state:'',
            words:['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
        }
    }
    componentDidMount(){
        window.document.title='问卷管理'
        this.setState({access_token:sessionStorage.getItem('access_token')},()=>{
            this.search_func()
        });
    }
    search_func=()=>{
        api.wenjuan_list({
            page:this.state.currentPage||1,
            page_size:10,
            form_type:this.state.form_type||'',
            state:this.state.state||'',
            access_token:this.state.access_token,
            question_id:this.state.wenjuan_name,
            time_start:Date.parse(this.state.wenjuan_time[0])/1000||0,
            time_end:Date.parse(this.state.wenjuan_time[1])/1000||0}).then(res=>{
                console.log(res);
                if(res.code ===0){
                    this.setState({tableDataTotal:res.content.total_record,data:res.content.list||[]})
                }else{
                    notification.error({
                        message: '错误',
                        description: res.message,
                    })
                }
            })
    }
    //问卷名称
    handleSearch=v=>{
        console.log(v);
        api.wenjuan_search({access_token:this.state.access_token,keyword:v}).then(res=>{
            console.log(res);
            if(res.code===0){
                console.log(res.content)
                this.setState({wenjuan_list:res.content||[]})
            }else{
                notification.error({
                    message: '错误',
                    description: res.message,
                })
            }
        })
    }
    //查看详情
    getDetail=(id)=>{
        api.wenjuan_detail({access_token:this.state.access_token,id:id}).then(res=>{
            if(res.code===0){
                console.log(res)
                Modal.info({
                    title: '问卷详细',
                    content: (
                      <div className='detail_alert'>
                            {res.content.question_list.length?(<ul>
                                {res.content.question_list.map((v,i)=>{
                                    if(v.type===1){
                                        return (<li key={i}><h3>{i+1}、单选题：</h3><p>{v.question}?</p>{v.answer_list.length?(<div>
                                            {v.answer_list.map((vv,ii)=>{
                                                return (<span key={ii}>{`${this.state.words[ii]}.${vv.answer}`}</span>)
                                            })}
                                        </div>):''}</li>)
                                    }else if(v.type===2){
                                        return (<li key={i}><h3>{i+1}、多选题：</h3><p>{v.question}?</p>
                                        {v.answer_list.length?(<div>
                                            {v.answer_list.map((vv,ii)=>{
                                                return (<span key={ii}>{`${this.state.words[ii]}.${vv.answer}`}</span>)
                                            })}
                                        </div>):''}</li>)
                                    }
                                })}
                            </ul>):<div></div>}
                            {res.content.fill_list.length?(<ul>
                                {res.content.fill_list.map((v,i)=>{
                                    if(v.type===3){
                                        return (<li key={i}><h3>{i+1+res.content.question_list.length}、填空题{v.must_fill==2?'(必填)':''}：</h3><p>{v.question}?</p><div><span>{v.answer}</span></div></li>)
                                    }else if(v.type==4){
                                        return (<li key={i}><h3>{i+1+res.content.question_list.length}、文本题{v.must_fill==2?'(必填)':''}：</h3><p>{v.question}?</p><div><span>{v.answer}</span></div></li>)
                                    }
                                })}
                            </ul>):<div></div>}
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
    render (){
        const { Column } = Table;
        const confirm = Modal.confirm;
        const {Option} =Select;
        return (<div className='questionnaire'>
            <div className='top'>
                <ul>
                <li><span>问卷名称: </span>
                <Select  showSearch style={{ width: 200 }} placeholder="请输入问卷名称" defaultActiveFirstOption={false} filterOption={false} value={this.state.wenjuan_name}
                    onChange={v=>{
                        this.setState({wenjuan_name:v})
                    }}
                    onSearch={this.handleSearch}>
                {this.state.wenjuan_list.map((v,i)=>{
                    console.log(v)
                    return (<Option key={i} value={v.id}>{v.name}</Option>)
                })}
            </Select>
            </li>
                <li><span>问卷时间: </span>
                    <RangePicker
                    style={{width:320}}
                    value={this.state.wenjuan_time?this.state.wenjuan_time:[]}
                    allowClear locale={locale} showTime={{ hideDisabledOptions: true,}}
                    onChange={value=>{
                        this.setState({
                            wenjuan_time:value
                        })
                    }}
                    format="YYYY-MM-DD HH:mm:ss"/>
                </li>
                {/* <li><span>设备渠道: </span>
                <Select placeholder='请选择设备渠道' value={this.state.form_type} style={{ width: 200 }} onChange={v=>{
                    this.setState({form_type:v})
                }}>
                    <Option value={1}>安卓</Option>
                    <Option value={2}>IOS</Option>
                </Select>
                </li> */}
                <li><span>是否上下架: </span>
                <Select placeholder='请选择是否上下架' value={this.state.state} style={{ width: 200 }} onChange={v=>{
                    this.setState({state:v})
                }}>
                    <Option value={1}>上架</Option>
                    <Option value={2}>下架</Option>
                </Select>
                </li>
                <li><Button type="primary" onClick={()=>{this.search_func()}}>搜索</Button>
                    <Button  style={{marginLeft:10}} onClick={()=>{
                        this.setState({wenjuan_name:'',wenjuan_time:[],form_type:'',state:''},()=>{this.search_func()})
                    }}>清空</Button>
                    {/* <Button style={{marginLeft:10}} type='danger' onClick={()=>{
                        console.log(`${api.targetUrl}/backend/questionlist/export?form_type=${this.state.form_type||''}&state=${this.state.state||''}&access_token=${this.state.access_token}&question_id=${this.state.wenjuan_name}&time_start=${Date.parse(this.state.wenjuan_time[0])||0}&time_end=${Date.parse(this.state.wenjuan_time[1])||0}`)
                        window.open(`${api.targetUrl}/backend/questionlist/export?form_type=${this.state.form_type||''}&state=${this.state.state||''}&access_token=${this.state.access_token}&question_id=${this.state.wenjuan_name}&time_start=${Date.parse(this.state.wenjuan_time[0])||0}&time_end=${Date.parse(this.state.wenjuan_time[1])||0}`)
                    }}>导出</Button> */}
                    </li>
                <p style={{textAlign:'right'}}><Button type='primary' onClick={()=>{history.push({pathname:'/new_module'})}}>新建问卷</Button></p>
                </ul>
                
                </div>
                <div className='con'>
                <Table bordered dataSource={this.state.data} rowKey={record=>record.name} pagination={{
                        current: this.state.currentPage, 
                        pageSize: 10,
                        total: this.state.tableDataTotal,
                        showTotal:total=>`总共${total}条数据`
                    }}  onChange={v=>{
                        this.setState({currentPage:v.current},()=>{
                            this.search_func()
                        })
                    }}>
                    <Column
                        title="编号"
                        dataIndex="id"
                        align='center'/>
                    {/* <Column
                        title="问卷类型"
                        align='center' 
                        dataIndex="value"/> */}
                    <Column
                        title='问卷名称'
                        align='center'
                        dataIndex="name"/>
                        {/* <Column
                        title='饭票选择'
                        align='center'
                        dataIndex="rate"/> */}
                        <Column
                        title='创建时间'
                        align='center'
                        dataIndex="create_at"/>
                        <Column
                        title='上下架'
                        align='center'
                        render={(text,record)=>{
                            return (<div>{text.state===1?<Tag color='blue'>上架</Tag>:<Tag color='orange'>下架</Tag>}</div>)
                        }}/>
                        {/* <Column
                        title='饭票余额'
                        align='center'
                        dataIndex="rate"/> */}
                        {/* <Column
                        title='外链地址'
                        align='center'
                        dataIndex="rate"/> */}
                        <Column
                        title='创建人'
                        align='center'
                        dataIndex="crearter"/>
                        <Column
                        title="操作"
                        key="action"
                        width={160}
                        render={(text, record) => (
                           <div><Button type='primary' onClick={this.getDetail.bind(this,text.id)}  size='small'>详情</Button>
                           <Button style={{marginLeft:10}} type='danger' onClick={()=>{
                               var that=this;
                               confirm({
                                title: `是否${text.state===1?'下架':'上架'}?`,
                                cancelText:'取消',
                                okText:`${text.state===1?'下架':'上架'}`,
                                onOk() {
                                    api.setQuestionStatus({access_token:that.state.access_token,id:text.id,state:text.state===1?2:1}).then(res=>{
                                        if(res.code===0){
                                            notification.success({
                                                message: '成功',
                                                description: '操作成功',
                                            })
                                            that.search_func();
                                        }else{
                                            notification.error({
                                                message: '错误',
                                                description: res.message,
                                            })
                                        }
                                    })
                                },
                                onCancel() {
                                  console.log('Cancel');
                                },
                              });
                            }}  size='small'>{text.state===1?'下架':'上架'}</Button>
                           {/* <Button style={{marginLeft:10}} onClick={this.delete.bind(this,record)}  type='danger' size='small'>删除</Button> */}
                           </div>
                        )}/>
                </Table>
                </div>

        </div>)
    }
}