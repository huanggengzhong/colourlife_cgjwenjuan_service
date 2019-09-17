import React from 'react'
import {Button, Input,DatePicker,Select,Table,notification,Modal,Tag} from 'antd'
import moment from 'moment';
import 'moment/locale/zh-cn';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import './satisfaction_analyze.css'
import api from './../subapi'
moment.locale('zh-cn');
export default class satisfaction_list extends React.Component {
    constructor(props){
        super(props);
        this.state={
            evaluate_name:'',
            currentPage:1,
            tableDataTotal:0,
            data:[],
            access_token:'',
            form_type:'',
            wenjuan_time:[],
            wenjuan_list:[],
            wenjuan_name:'',
            words:['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
        }
    }
    componentDidMount(){
        window.document.title='满意度后台报表';
        this.setState({access_token:sessionStorage.getItem('access_token')},()=>{
            this.search_func()
        });
    }
      //搜索
      search_func=()=>{
          api.answer_data({
                access_token:this.state.access_token,
                oa_username:this.state.evaluate_name,
                question_id:this.state.wenjuan_name||'',
                time_start:Date.parse(this.state.wenjuan_time[0])/1000||0,
                time_end:Date.parse(this.state.wenjuan_time[1])/1000||0,
                form_type:this.state.form_type,
                page:this.state.currentPage||1,
                page_size:10
            }).then(res=>{
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
        const {RangePicker }=DatePicker;
        const { Column } = Table;
        const Option=Select.Option;
        return (<div className='satisfaction_list'>
            <div className='top'>
                <ul>
                    <li><span>评价人OA:</span>
                    <Input placeholder="请输入评价人OA" value={this.state.evaluate_name} onChange={e=>{this.setState({evaluate_name:e.target.value})}} style={{width:200}}/>
                    </li>
                    <li><span>评价时间:</span>
                    <RangePicker
                    style={{width:320}}
                    allowClear locale={locale} showTime={{ hideDisabledOptions: true,}}
                    value={this.state.wenjuan_time?this.state.wenjuan_time:[]}
                    onChange={value=>{
                        this.setState({
                            wenjuan_time:value
                        })
                    }}
                    format="YYYY-MM-DD HH:mm:ss"/>
                    </li>
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
                    <li><span>设备渠道: </span>
                <Select placeholder='请选择设备渠道' value={this.state.form_type} style={{ width: 200 }} onChange={v=>{
                    this.setState({form_type:v})
                }}>
                    <Option value={2}>安卓</Option>
                    <Option value={1}>IOS</Option>
                </Select>
                </li>
                    <li>
                        <Button type="primary" style={{marginRight:10}} onClick={()=>{this.search_func()}}>搜索</Button>
                        <Button onClick={()=>{this.setState({evaluate_name:'',wenjuan_time:[],wenjuan_name:'',form_type:''})}}>清空</Button>
                        <Button style={{marginLeft:10}} type='danger' onClick={()=>{
                        console.log(`${api.targetUrl}/backend/questionlist/export?oa_username=${this.state.evaluate_name||''}&form_type=${this.state.form_type||''}&access_token=${this.state.access_token}&question_id=${this.state.wenjuan_name}&time_start=${Date.parse(this.state.wenjuan_time[0])||0}&time_end=${Date.parse(this.state.wenjuan_time[1])||0}`)
                        window.open(`${api.targetUrl}/backend/questionlist/export?oa_username=${this.state.evaluate_name||''}&form_type=${this.state.form_type||''}&access_token=${this.state.access_token}&question_id=${this.state.wenjuan_name}&time_start=${Date.parse(this.state.wenjuan_time[0])||0}&time_end=${Date.parse(this.state.wenjuan_time[1])||0}`)
                    }}>导出</Button></li>
                </ul>
            </div>
            <div className='con'>
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
                        title="id"
                        align='center'
                        dataIndex="id"/>
                    
                    <Column
                        title="来源"
                        align='center'
                        dataIndex="source"/>
                        <Column
                        title="问卷名称"
                        align='center'
                        dataIndex="question_name"/>
                        <Column
                        title="评价人OA"
                        align='center'
                        dataIndex="oa_username"/>
                        <Column
                        title="设备渠道"
                        align='center'
                        render={(text)=>{
                            console.log(text.from_type);
                            return (<div>{text.from_type===1?<Tag>IOS</Tag>:text.from_type===2?<Tag>安卓</Tag>:''}</div>)
                        }}/>
                        <Column
                        title="评价人姓名"
                        dataIndex="name"
                        align='center'/>
                        <Column
                        title="评价人手机号"
                        align='center'
                        dataIndex="mobile"/>
                        {/* <Column
                        title="评价人评分"
                        align='center'
                        dataIndex="value"/> */}
                        {/* <Column
                        title="问卷开始时间"
                        align='center'
                        dataIndex="value"/> */}
                        <Column
                        title="问卷完成时间"
                        align='center'
                        dataIndex="submit_time"/>
                        {/* <Column
                        title="参与问卷总次数"
                        align='center'
                        dataIndex="value"/> */}
                        <Column
                        title='彩管家版本号'
                        align='center'
                        dataIndex="app_version"/>
                        {/* <Column
                        title='手机类型'
                        align='center'
                        dataIndex="rate"
                        key="rate"/> */}
                        <Column
                        title='IP'
                        align='center'
                        dataIndex="ip"/>
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
                </div>
        </div>)
    }
}