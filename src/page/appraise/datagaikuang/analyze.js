import React from 'react'
import {Select,Button,Table,Progress,notification} from 'antd'
// import history from './../../router/history'
import history from './../../../router/history'
import './satisfaction_analyze.css'
// import api from './../subapi'
import api from './../../../subpage/subapi'

const {Column} =Table;
export default class analyze extends React.Component {
    constructor(props){
        super(props);
        this.state={
            data:{
          
            },
            wenjuan_name:'',
            wenjuan_list:[],
            access_token:'',
            title:''
        }
    }
    componentDidMount(){
        
        if(sessionStorage.getItem('wenjuan_name')){
            this.setState({access_token:sessionStorage.getItem('access_token'),wenjuan_name:sessionStorage.getItem('wenjuan_name').split(',')[0],title:sessionStorage.getItem('wenjuan_name').split(',')[1]},()=>{
                this.handleSearch(sessionStorage.getItem('wenjuan_name').split(',')[1]);
            });
        }else{
            this.setState({access_token:sessionStorage.getItem('access_token')});
        }
    }
    //问卷名称
    handleSearch=v=>{
        if(v.length<=2){
            return;
        }
        api.wenjuan_search({access_token:this.state.access_token,keyword:v}).then(res=>{
            console.log(res)
            if(res.code===0){
                this.setState({wenjuan_list:res.content||[]},()=>{
                    if(sessionStorage.getItem('wenjuan_name')){
                        if(sessionStorage.getItem('wenjuan_name').split(',')[1]===v && this.state.wenjuan_list.length){
                            //console.log(121)
                            this.search_func(sessionStorage.getItem('wenjuan_name').split(',')[0])
                        }
                    }
                })
            }else{
                notification.error({
                    message: '错误',
                    description: res.message,
                })
            }
        })
    }
    //查看分析
    search_func=(id)=>{
        console.log(id)
        if(typeof id=='object'){
            return
        }
        if(!this.state.wenjuan_name){
            notification.warning({
                message:'提示',
                description:'请输入问卷名称'
            })
            return;
        }
        api.wenjuan_analyze({access_token:this.state.access_token,question_id:id||this.state.wenjuan_name}).then(res=>{
            console.log(res)
            if(res.code===0){
                var data={};
                data.attend_num=res.content.attend_num;
                data.list=[];
                data.list=(res.content.fill||[]).concat((res.content.question||[]));
                this.setState({data:data})
            }else{
                notification.error({
                    message: '错误',
                    description: res.message,
                })
            }
        })
    }
    render(){
        const {Option} =Select;
        const mapData=(v,i)=>{
            if(v.answer_type===1){
                return (<li>
                    <p>{i+1+'. '+v.question}<span>(单选)</span></p>
                    <Table bordered dataSource={v.answer_list} rowKey={record=>record.id} >
                    <Column title="选项" dataIndex="answer" align='center' />
                    <Column title="小计" align='center' dataIndex="count"/>
                    <Column title='比例' align='center' dataIndex="count" key={i}
                        render={(text,record)=>{
                            return (<div><Progress percent={Math.round(text*100/this.state.data.attend_num)} size="small" status="active" /></div>)
                        }}/>
                </Table>
                </li>)
            }else if(v.answer_type===2){
                return (<li>
                    <p>{i+1+'. '+v.question}<span>(多选)</span></p>
                    <Table bordered dataSource={v.answer_list} rowKey={record=>record.id} >
                    <Column title="选项" dataIndex="answer" align='center' />
                    <Column title="小计" align='center' dataIndex="count"/>
                    <Column title='比例' align='center' dataIndex="count" key={i}
                        render={(text,record)=>{
                            return (<div><Progress percent={Math.round(text*100/this.state.data.attend_num)} size="small" status="active" /></div>)
                        }}/>
                </Table>
                </li>)
            }else if(v.answer_type===3){
                return (<li>
                    <p>{i+1+'. '+v.question}<span>(填空)</span></p>
                   
                    <Button type='primary' onClick={()=>{history.push({pathname:'/detail_list',search:`id=${v.id}&question_id=${this.state.wenjuan_name}&title=${this.state.title}&question=${v.question}`})}}>查看详细信息</Button>
                </li>)
            }else if(v.answer_type===4){
                return (<li>
                    <p>{i+1+'. '+v.question}<span>(文本)</span></p>
                   
                    <Button type='primary' onClick={()=>{history.push({pathname:'/detail_list',search:`id=${v.id}&question_id=${this.state.wenjuan_name}&title=${this.state.title}&question=${v.question}`})}}>查看详细信息</Button>
                </li>)
            }
        }
        return (<div className='analyze'>
           
            
            {/* analyze */}
            <div className='top'>
                <ul>
                    <li><span>问卷名称</span>
                    <Select  showSearch style={{ width: 200 }} placeholder="请输入问卷名称" defaultActiveFirstOption={false} filterOption={false} value={this.state.title}
                    onChange={(v,i)=>{
                        sessionStorage.setItem('wenjuan_name',v)
                        this.setState({wenjuan_name:v.split(',')[0],title:v.split(',')[1]})
                    }}
                    onSearch={this.handleSearch}>
                {this.state.wenjuan_list.length?this.state.wenjuan_list.map((v,i)=>{
                    return (<Option key={i} value={v.id+','+v.name}>{v.name}</Option>)
                }):''}
                    </Select>
                    </li>
                    <li><Button type='primary' onClick={()=>{
                        console.log(this.state.wenjuan_name);
                        //sessionStorage.setItem('wenjuan_name',this.state.title);
                    this.search_func(this.state.wenjuan_name)
                    }}>查看分析</Button></li> 
                    <li><Button onClick={()=>{
                        sessionStorage.removeItem('wenjuan_name')
                        this.setState({ wenjuan_name:'', wenjuan_list:[],title:'',data:{}})
                    }}>清空</Button></li>
                </ul>
                <p>参与人数: {this.state.data.attend_num}</p>
            </div>
            <div className='con'>
            <ul>
            {(this.state.data.list||[]).map((v,i)=>{
                return (<div key={i}>{mapData(v,i)}</div>)
            })}
            </ul>
            </div>
        </div>)
    }
}