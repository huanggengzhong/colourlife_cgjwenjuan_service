/**
 *  路由组件
 */
import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Demo from './../page/Home/Demo'

import Lookidea from './../page/idea/lookidea'
import Setidea from './../page/idea/setidea'
import './router.css'
import analyze from './../subpage/satisfaction_list/analyze'
import detail_list from './../subpage/satisfaction_list/detail_list'
import new_module from './../subpage/questionnaire/new_module'
import edit_module from './../subpage/questionnaire/edit_module'
import NowQuestionnaire from '../page/appraise/nowQuestionnaire/nowQuestionnaire'
import KuQuestionnaire from '../page/appraise/kuQuestionnaire/kuQuestionnaire'
import DataSurvey from '../page/appraise/DataSurvey/DataSurvey'
import Lookdetail from './../page/idea/lookidea/detailidea/detailidea'

class Router extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const HASH=window.location.pathname
    return (
      <div
        style={{
          padding: '0px 20px 20px 20px',
          overflowY: 'auto',
          width: '100%',
          height: 'calc( 100vh - 48px )'
        }}
      >
        <Route exact path="/Home" component={Demo} />
        {/* 问卷路由 */}
        <Route exact path="/NowQuestionnaire" component={NowQuestionnaire} />
        <Route exact path="/kuQuestionnaire" component={KuQuestionnaire} />
        <Route exact path="/analyze" component={analyze} />
        <Route exact path="/detail_list" component={detail_list} />
        <Route exact path='/new_module' component={new_module}/>
        <Route exact path='/edit_module' component={edit_module}/>
        <Route exact path="/appraise/DataSurvey" component={DataSurvey} />
        {/* 意见路由 */}
        <Route exact path="/lookidea" component={Lookidea} />
        <Route exact path="/lookidea/detail/:id" component={Lookdetail} />
        <Route exact path="/setidea" component={Setidea} />
        {/* 设置默认打开页 */}
        {
          // HASH==='/questionnaire'?<Route exact path="/" component={NowQuestionnaire} />:<Route exact path="/" component={Lookidea} />
        }
        <Route exact path="/" component={Lookidea} />
        
      </div>
    )
  }
}

export default Router
