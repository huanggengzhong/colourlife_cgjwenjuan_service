/**
 *  路由组件
 */
import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Demo from './../page/Home/Demo';
import Menu from './../page/Menu/Menu';
import Role from './../page/Privilege/Role';
import questionnaire from './../subpage/questionnaire/questionnaire'
import new_module from './../subpage/questionnaire/new_module'
import satisfaction_list from './../subpage/satisfaction_list/satisfaction_list'
import analyze from './../subpage/satisfaction_list/analyze'
import detail_list from './../subpage/satisfaction_list/detail_list'
import './router.css';
import appraise from "./../page/appraise"
import idea from "./../page/idea"

class Router extends Component {
    constructor(props) {
        super(props);
        this.state={
         
        }
      }
    
    componentDidMount(){
    }

    render() {
        return (
            // <div style={{padding:'40px 20px 20px 20px',overflowY: 'auto',width:'100%',height:'calc( 100vh - 48px )'}}>
            <div style={{padding:'0px 0px 20px 0px',overflowY: 'auto',width:'100%',height:'calc( 100vh - 48px )'}}>
                <Route exact path="/Home" component={Demo}/>
                <Route exact path="/Menulist" component={Menu}/>
                <Route exact path="/Rolelist" component={Role}/>
                <Route exact path='/questionnaire' component={questionnaire}/>
                {/* new_module题目上下移动,新增模板*/}
                <Route exact path='/new_module' component={new_module}/>
                {/* 导出和题目详情 */}
                <Route exact path='/satisfaction_list' component={satisfaction_list}/>
                <Route exact path='/analyze' component={analyze}/>
                <Route exact path='/detail_list' component={detail_list}/>
                <Route exact path='/appraise' component={appraise}/>
                <Route exact path='/idea' component={idea}/>
            </div>
            
        )
    }
}

export default Router;