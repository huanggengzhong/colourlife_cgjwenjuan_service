import React from 'react';
// import history from './../../router/history';
import './new_module.css'
import {Button,Input,Radio ,notification ,Spin} from 'antd';
import api from './../subapi'
const RadioGroup = Radio.Group;
export default class new_module extends React.Component{
    constructor(props){
        super(props);
        this.state={
            mmoudle:[],
            words:['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
            wenjuan_name:'',//标题
            loading:false,//加载状态
        }
    }
    componentDidMount(){
        this.setState({access_token:sessionStorage.getItem('access_token')});
    }
     handleChange=(value)=> {
        console.log(`selected ${value}`);
      }
      
       handleBlur=()=>{
        console.log('blur');
      }
      
    handleFocus=()=> {
        console.log('focus');
      }
      //新增单选
      addRadio=()=>{
          var list =this.state.mmoudle;
          list.push({answer_type:1,question:'',answer:[]});//,is_must:false
          this.setState({mmoudle:list});
      }
      //新增多选
      addCheckbox=()=>{
          var list =this.state.mmoudle;
          list.push({question:'',answer_type:2,answer:[]});//,is_must:false
          this.setState({mmoudle:list});
      }
      //新增填空
      addtext=()=>{
        var list =this.state.mmoudle;
        list.push({question:'',answer_type:3,must_fill:false});//,is_must:false
        this.setState({mmoudle:list});
    }
    //新增文本
    aaddTextarea=()=>{
        var list =this.state.mmoudle;
        list.push({question:'',answer_type:4,must_fill:false});//,is_must:false
        this.setState({mmoudle:list});
    }
    
      //渲染单条信息的删除和移动
    list_operation=(i)=>{
        return (<div>
            {/* 删除 */}
            <Button icon='delete'  shape='circle' title='删除' type='primary' size='large'onClick={()=>{
                var m=this.state.mmoudle;
                m.splice(i,1)
                this.setState({mmoudle:m})
            }}></Button>
            {/* 上移 */}
            <Button icon='arrow-up' disabled={i===0?true:false} shape='circle' type='primary' title='上移' size='large' onClick={()=>{
                var m=this.state.mmoudle;
                var spp=m.splice(i,1)[0];
                m.splice(i-1,0,spp);
                console.log(m)
                this.setState({mmoudle:m})
            }}></Button>
            {/* 下移 */}
            <Button icon='arrow-down' disabled={i===this.state.mmoudle.length-1?true:false} shape='circle'  title='下移' type='primary' size='large'onClick={()=>{
                var m=this.state.mmoudle;
                var spp=m.splice(i,1)[0];
                m.splice(i+1,0,spp);
                console.log(m)
                this.setState({mmoudle:m})
            }}></Button>
        </div>)
    }
    //渲染选择题新增选项
    sub_options=(v,i)=>{
        return (<div>
            <p className='sub_p'>选项列表:</p>
            {v.answer.map((vv,ii)=>{
                return (<li key={ii} className='sub_li'>
                    <span>{this.state.words[ii]}:</span>
                    <Input placeholder="请输入选项值" onChange={ee=>{  ee.persist();
                    var m=this.state.mmoudle;
                    m[i].answer[ii]=ee.target.value;
                    this.setState({mmoudle:m})
                    }} style={{width:200}} value={v.answer[ii]}/>
                    {/* 删除 */}
                    <Button icon='delete'  shape='circle' title='删除' type='primary' size='small'onClick={()=>{
                        var m=this.state.mmoudle;
                        var arr=m[i].answer;
                        arr.splice(ii,1);
                        m[i].answer=arr;
                        this.setState({mmoudle:m})
                    }}></Button>
                    {/* 上移 */}
                    <Button icon='arrow-up' disabled={ii===0?true:false} shape='circle' type='primary' title='上移' size='small' onClick={()=>{
                        var m=this.state.mmoudle;
                        var arr=m[i].answer;
                        var spp=arr.splice(ii,1)[0];
                        arr.splice(ii-1,0,spp);
                        m[i].answer=arr;
                        this.setState({mmoudle:m})
                    }}></Button>
                    {/* 下移 */}
                    <Button icon='arrow-down' disabled={ii===v.answer.length-1?true:false} shape='circle'  title='下移' type='primary' size='small'onClick={()=>{
                        var m=this.state.mmoudle;
                        var arr=m[i].answer;
                        var spp=arr.splice(ii,1)[0];
                        arr.splice(ii+1,0,spp);
                        m[i].answer=arr;
                        this.setState({mmoudle:m})
                    }}></Button>
                    </li>)
                })}
                <Button className='sub_li_button' icon="plus" size='small' type='primary' onClick={()=>{
                    var mm=this.state.mmoudle;
                    mm[i].answer.push('');
                    this.setState({mmoudle:mm})
                }}>新增选项</Button>
        </div>)
    }
    //渲染标题
    set_title=(v,i)=>{
        return(<div>
            {v.must_fill!==undefined?(<div className='is_must'>是否必填？ 
                <RadioGroup onChange={(e)=>{
                    var m=this.state.mmoudle;
                    console.log( m[i].must_fill)
                    m[i].must_fill=e.target.value;
                    this.setState({mmoudle:m})
                }} value={v.must_fill}>
                    <Radio value={false}>非必填</Radio>
                    <Radio value={true}>必填</Radio>
                </RadioGroup>
            </div>):''}
            
            <span>标题名称：</span><Input placeholder="请输入标题" onChange={e=>{
                        var m=this.state.mmoudle;
                        m[i].question=e.target.value;
                        this.setState({mmoudle:m})
                        }} style={{width:200}} value={v.question}/>
        </div>)
    }
    //提交按钮
    submit=()=>{
        
        if(!this.state.wenjuan_name){
            notification.warning({
                message: '警告',
                description: '请填写问卷标题',
            })
            return ;
        }
        
        console.log(this.state.mmoudle);
        var question_ids=[],fill_ids=[];
        this.state.mmoudle.map((v,i)=>{
                
                
            return ((v,i)=>{
                if(!v.question){
                    notification.warning({
                        message: '警告',
                        description: `第${i+1}题请填写标题名称`,
                    })
                    return;
                }
                this.setState({loading:true},()=>{
                    setTimeout(()=>{this.setState({loading:false})},3000)
                })
            
                        if(v.answer){
                        var list=[]
                        v.answer.map((vv,ii)=>{
                            return list.push({'id':ii,'answer':vv});
                        })
                        api.question_add({access_token:this.state.access_token,answer:JSON.stringify(list),question:v.question,answer_type:v.answer_type}).then(res=>{
                            if(res.code===0){
                                //question_ids.push(res.content.id);
                                question_ids[i]=res.content.id
                            }else{
                                notification.error({
                                    message: '错误',
                                    description: res.message,
                                })
                            }
                        })
                    }else{
                        console.log('before',i)
                        api.question_add({access_token:this.state.access_token,question:v.question,answer_type:v.answer_type,must_fill:v.must_fill?2:1}).then(res=>{
                            if(res.code===0){
                                //fill_ids.push(res.content.id);
                                fill_ids[i]=res.content.id
                                console.log('finish',i)
                            }else{
                                notification.error({
                                    message: '错误',
                                    description: res.message,
                                })
                            }
                        })
                    }
                    
                
            })(v,i)  
        })
        
        var timer =setInterval(()=>{
            var list1=[],list2=[];
            fill_ids.map(v=>{
                if(v){
                    list1.push(v)
                }
            })
            question_ids.map(v=>{
                if(v){
                    list2.push(v)
                }
            });
            console.log(list1,list2)
            if(list1.length+list2.length===this.state.mmoudle.length){
                clearInterval(timer);
                api.question_list_add({access_token:this.state.access_token,name:this.state.wenjuan_name,question_ids:JSON.stringify(list2),fill_ids:JSON.stringify(list1)}).then(res=>{
                    this.setState({loading:false})
                    if(res.code===0){
                        notification.success({
                            message: '成功',
                            description: '您已创建成功新的问卷！',
                        });
                        this.setState({mmoudle:[],wenjuan_name:''})
                    }else{
                        notification.error({
                            message: '错误',
                            description: res.message,
                        })
                    }
                })
            }
        },100)
    }
    render(){
        const getList=(v,i)=>{
           // console.log(v,i);
            if(v.answer_type===1){
                //单选
                return (<div key={i} className='eachOne'>
                <div className='index'>{i+1}.</div>
                <div style={{overflow:'hidden'}}>
                    <h3>单选</h3>
                <div className='left'>
                    {this.list_operation(i)}
                </div>
                    <div className='right'>
                   {this.set_title(v,i)}
                        <ul>
                        {this.sub_options(v,i)}
                        </ul>
                    </div>
                </div>
                </div>)
            }else if(v.answer_type===2){
                return (<div key={i} className='eachOne'>
                <div className='index'>{i+1}.</div>
                <div style={{overflow:'hidden'}}>
                    <h3>多选</h3>
                    <div className='left'>
                        {this.list_operation(i)}
                    </div>
                        <div className='right'>
                        {this.set_title(v,i)}
                            <ul>
                                {this.sub_options(v,i)}
                            </ul>
                        </div>
                </div>
                    
                    </div>)
            }else if(v.answer_type===3){
                return (<div key={i} className='eachOne'>
                <div className='index'>{i+1}.</div>
                <div  style={{overflow:'hidden'}}>
                    <h3>填空</h3>
                    <div className='left'>
                        {this.list_operation(i)}
                    </div>
                    <div className='right'>
                    {this.set_title(v,i)}
                    </div>
                </div>
                    
                    </div>)
            }else if(v.answer_type===4){
                return (<div key={i} className='eachOne'>
                <div className='index'>{i+1}.</div>
                    <div style={{overflow:'hidden'}}>
                    <h3>文本</h3>
                    <div className='left'>
                        {this.list_operation(i)}
                    </div>
                       <div className='right'>
                       {this.set_title(v,i)}
                       </div>
                    </div>
                    </div>) 
            }
        }
        return (<div className='new_module'>
        <Spin size="large" spinning={this.state.loading} tip='提交中'>
        <Button onClick={()=>{window.history.go(-1)}}>返回</Button>
        <ul className='ul'>
            {/* <li>
                <span>模板选择: </span>
                <Select
                showSearch
                style={{ width: 200 }}
                placeholder="请选择饭票模板"
                optionFilterProp="children"
                onChange={this.handleChange}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}>
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="tom">Tom</Option>
            </Select>
            </li> */}
            {/* <li>
                <span>对象指定: </span>
                <Input placeholder="请输入对象" onChange={e=>{this.setState({wenjuan_name:e.target.value})}} style={{width:200}}/>
            </li> */}
            <li>
                <span>标题：</span>
                <Input placeholder="请输入对象" value={this.state.wenjuan_name} onChange={e=>{this.setState({wenjuan_name:e.target.value})}} style={{width:200}}/>
            </li>
        </ul>
        <hr/>
        <ol>
            <p>新增问题类型: </p>
            <li><Button type='primary' onClick={this.addRadio}>单选</Button></li>
            <li><Button type='primary' onClick={this.addCheckbox}>多选</Button></li>
            <li><Button type='primary' onClick={this.addtext}>填空</Button></li>
            <li><Button type='primary' onClick={this.aaddTextarea}>文本</Button></li>
        </ol>
        <ul className='con'>
            {this.state.mmoudle.map((v,i)=>{
                return (getList(v,i))
            })}
        </ul>
        <div>
            <div className='bot'>
            {this.state.mmoudle.length?<Button type='primary' onClick={this.submit}>提交</Button>:''}
        </div>
        </div>
        </Spin>
        </div>)
    }
}
