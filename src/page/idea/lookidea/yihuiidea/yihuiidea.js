// import React, { Component } from 'react';
// class Datawenjuan extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {  }
//     }
//     render() {
//         return (
//             <div>
//                 问卷数据
//             </div>
//          );
//     }
// }

// export default Datawenjuan;

import React, { Component } from 'react'
import history from './../../../../router/history'
import {
    Menu,
     Dropdown,
  Input,
  Button,
  Table,
  message,
  Modal,
  Select,
  Icon,
  Tag,
  InputNumber,

  DatePicker,
  Radio,
  Row,
  Col
} from 'antd'
import apis from './../../../../subpage/subapi'
import './yihuiidea.css'

const menu = (
    <Menu >
      <Menu.Item key="1">
        <Icon type="border" />
        按选项序号下载
      </Menu.Item>
      <Menu.Item key="2">
        <Icon type="border" />
        按选项文本下载
      </Menu.Item>
    
    </Menu>
  );
export default class Show extends Component {
  constructor(props) {
    super(props)
    this.state = {
      yijiancontent:'',
      userName: null,
      modalVisible: false,
      access_token: null,
      id: null,
      test: ['test1', 'test2', 'test3'],
      currentPage: 1,
      total: 0,
      pageSize: 10,
      // pageSize: 20,
      data: null,
      flag: false,
      visible: false,
      userId: null,
      previewVisible: null,
      previewImage: null,
      startTime: null,
      endTime: null,
      way: null,
      isStaff: null,
      version: '请选择',
      sex: null,
      community: '请选择小区',
      phone: null,
      nickname: null,
      questionList: [
        // { question: "界面风格满意度？", id: 1, "answer": 2 },
        // { question: "操作简便满意度？", id: 2, "answer": 2 },
        // { question: "稳定性满意度？", id: 3, "answer": 3 },
        // { question: "帮助与反馈满意度（提供的帮助与反馈的及时性）？", id: 4, "answer": 2 },
        // { question: "界面风格满意度？", id: 1, "answer": 2 },
        // { question: "操作简便满意度？", id: 2, "answer": 2 },
        // { question: "稳定性满意度？", id: 3, "answer": 3 },
        // { question: "帮助与反馈满意度（提供的帮助与反馈的及时性）？", id: 4, "answer": 2 },
      ],
      answerList: [
        { name: '非常满意', id: 1 },
        { name: '满意', id: 2 },
        { name: '一般', id: 3 },
        { name: '不满意', id: 4 },
        { name: '非常不满意', id: 5 }
      ],
      version1: null,
      create_at: null,
      totalhpDegree: null,
      totalmyDegree: null,
      versionList: [],
      communityList: [],
      community_uuid: null,
      data: []
    }
  }
  componentWillMount() {}
  componentDidMount() {
    this.getVersionList()
    this.fetchData()
  }
  getVersionList() {
    let access_token = this.getQueryString('access_token')
    let params = {
      access_token: access_token
    }
    apis.get(params, `backend/versionList`).then(res => {
      if (res.code == 0) {
        this.setState({
          versionList: res.content
        })
      } else {
        message.error(`${res.code}!,请重试`)
      }
    })
  }
  fetchData() {
    let access_token = this.getQueryString('access_token')
    this.setState({ data: [], flag: true })
    let params = {
      access_token: access_token,
      time_start: this.state.startTime
        ? this.formdata(this.state.startTime)
        : null,
      time_end: this.state.endTime ? this.formdata1(this.state.endTime) : null,
      form_type: Number(this.state.way),
      is_employee: this.state.isStaff,
      version: this.state.version == '请选择' ? null : this.state.version,
      gender: this.state.sex,
      community_uuid:
        this.state.community == '请输入小区' ? null : this.state.community_uuid,
      mobile: this.state.phone,
      nick_name: this.state.nickname,
      content:this.state.yijiancontent,
      page: 1,
      page_size: this.state.pageSize
    }
    // apis.get(params, `backend/search`).then(res => {
    apis.get(params, `backend/feedback/list/two`).then(res => {
      if (res.code == 0) {
        this.setState({
          data: res.content.list,
          currentPage: Number(res.content.current_page),
          pageSize: Number(res.content.page_size),
          total: res.content.total_record,
          totalhpDegree: res.content.praise,
          totalmyDegree: res.content.satisfied,
          flag: false
        })
      } else {
        message.error(`${res.code}!,请重试`)
      }
    })
  }
  fetchData1() {
    let access_token = this.getQueryString('access_token')
    this.setState({ data: [], flag: true })
    let params = {
      access_token: access_token,
      time_start: this.state.startTime
        ? this.formdata(this.state.startTime)
        : null,
      time_end: this.state.endTime ? this.formdata1(this.state.endTime) : null,
      form_type: Number(this.state.way),
      is_employee: this.state.isStaff,
      version: this.state.version == '请选择' ? null : this.state.version,
      gender: this.state.sex,
      community_uuid:
        this.state.community == '请输入小区' ? null : this.state.community_uuid,
      mobile: this.state.phone,
      nick_name: this.state.nickname,
      page: this.state.currentPage,
      page_size: this.state.pageSize
    }
    // apis.get(params, `backend/search`).then(res => {
    apis.get(params, `backend/feedback/list/two`).then(res => {
      if (res.code == 0) {
        this.setState({
          data: res.content.list,
          currentPage: Number(res.content.current_page),
          pageSize: Number(res.content.page_size),
          total: res.content.total_record,
          totalhpDegree: res.content.praise,
          totalmyDegree: res.content.satisfied,
          flag: false
        })
      } else {
        message.error(`${res.code}!,请重试`)
      }
    })
  }
  componentWillUnmount() {
    this.setState = (state, callback) => {
      return
    }
  }
  formdata(a) {
    var date = new Date(a)
    date.setHours(0)
    date.setMinutes(0)
    date.setSeconds(0)
    var time = Date.parse(date)
    let time1 = time / 1000
    return time1
  }
  formdata1(a) {
    var date = new Date(a)
    date.setHours(23)
    date.setMinutes(59)
    date.setSeconds(59)
    var time = Date.parse(date)
    let time1 = time / 1000
    return time1
  }
  getQueryString(name) {
    if (window.location.search == '') {
      var url = document.location.toString()
      var arrObj = url.split('?')
      if (arrObj.length > 1) {
        var arrPara = arrObj[1].split('&')
        var arr
        for (var i = 0; i < arrPara.length; i++) {
          arr = arrPara[i].split('=')
          if (arr != null && arr[0] == name) {
            return arr[1]
          }
        }
        return ''
      } else {
        return ''
      }
    } else {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
      var r = window.location.search.substr(1).match(reg)
      if (r != null) return unescape(r[2])
      return null
    }
  }
  urljson(url) {
    var reg_url = /^[^\?]+\?([\w\W]+)$/, //匹配url连接后的参数部分
      //exec()方法匹配字符串中的元素，返回一个数组，0项表示全部匹配的内容，1项表示正则的（）内匹配的内容。
      reg_para = /([^&=]+)=([\w\W]*?)(&|$|#)/g, //匹配参数key=value表达式
      arr_url = reg_url.exec(url), //返回匹配结果
      ret = {} //get the result object
    if (arr_url && arr_url[1]) {
      //如果传入的是一个url,且url有参数
      var str_para = arr_url[1], //参数部分的赋值
        result
      while ((result = reg_para.exec(str_para)) != null) {
        ret[result[1]] = result[2]
      }
    }
    return ret
  }
  toDetail(item) {
    this.setModalVisible(true)
    let access_token = this.getQueryString('access_token')
    let params = {
      access_token: access_token,
      id: item.id
    }
    apis.get(params, `backend/detail`).then(res => {
      if (res.code == 0) {
        this.setState({
          questionList: res.content.list,
          version1: res.content.version,
          create_at: res.content.create_at
        })
      } else {
        message.error(`${res.code}!,请重试`)
      }
    })
  }
  handleTableChange(el) {
    var _this = this
    let current = el.current || 1
    this.setState({ currentPage: current }, () => {
      _this.fetchData1()
    })
  }
  selectTime = (date, dateString) => {
    this.setState({
      startTime: dateString[0],
      endTime: dateString[1]
    })
  }
  selectWay = e => {
    this.setState({
      way: e.target.value
    })
  }
  selectIsStaff = e => {
    this.setState({
      isStaff: e.target.value
    })
  }

  selectVersion = value => {
    this.setState({
      version: value
    })
  }
  selectSex = e => {
    this.setState({
      sex: e.target.value
    })
  }
  selectPhone = value => {
    this.setState({
      phone: value
    })
  }
  selectNickname = e => {
    this.setState({
      nickname: e.target.value
    })
  }
  yijiancontent = e => {
    this.setState({
      yijiancontent: e.target.value
    })
  }
  search = () => {
    this.fetchData()
    // var reg = 11 && /^((13|14|15|16|17|18)[0-9]{1}\d{8})$/;  //手机号正则
    // if (this.state.phone && !reg.test(this.state.phone)) {
    //     message.warning('请输入正确手机号');
    // }
  }
  clear = () => {
    // dateString = ['','']
    this.setState(
      {
        startTime: null,
        endTime: null,
        way: null,
        // isStaff: null,
        version: '请选择',
        sex: null,
        community: '请选择小区',
        phone: null,
        nickname: null,
        yijiancontent:''
      },
      () => {
        // this.searchCommunity()
        this.fetchData()
      }
    )
  }
  setModalVisible(val) {
    this.setState({ modalVisible: val })
  }
  searchCommunity = value => {
    let access_token = this.getQueryString('access_token')
    let params = {
      access_token: access_token,
      page: 1,
      page_size: 10,
      keyword: value == '' ? '七星' : value
    }
    apis.get(params, `backend/communitySearch`).then(res => {
      if (res.code == 0) {
        this.setState({
          communityList: res.content.data
        })
      } else {
        message.error(`${res.code}!,请重试`)
      }
    })
    // fetch(value, data => this.setState({ communityList: data }));
  }

  selectCommunity = item => {
    this.setState({ community: item.name, community_uuid: item.uuid }, () => {})
  }
  renderEmployee = val => {
    switch (val) {
      case 1:
        return '员工'
      case 2:
        return '非员工'
      default:
        break
    }
  }
  renderGender = val => {
    switch (val) {
      case 1:
        return '男'
      case 2:
        return '女'
      case 0:
        return '未知'
      default:
        break
    }
  }
  renderWay = val => {
    switch (val) {
      case 1:
        return 'IOS'
      case 2:
        return '安卓'
      default:
        break
    }
  }
  tofixed = val => {
    return Number(val).toFixed(1) + '%'
  }
  goIdeaDetail=(item)=>{
    console.log(item.id)
    let pathData = {
      pathname: `/lookidea/detail/${item.id}?access_token=${window.sessionStorage.getItem("access_token")}`,
      query: item.id
    }
    // history.push(`/lookidea/detail/${item.id}?access_token=${window.sessionStorage.getItem("access_token")}`)
    history.push(pathData)
  }
    // 2019年10月30日19:36:54
    Download = () => {
      var url = document.domain
      var baseUrl
      if (url == 'https://yjfk-backend-czy.colourlife.com') {
        baseUrl = 'https://yjfk-backend-czy.colourlife.com'
      } else {
        baseUrl = 'https://yjfk-backend-czytest.colourlife.com'
      }
  
      // 后续记得检查数据是否有错,目前发现少了内容
      // window.location.href = `${baseUrl}/backend/feedback/excel?access_token=${window.sessionStorage.getItem(
      //   'access_token'
      // )}&time_start=${this.state.startTime}&time_end=${
      //   this.state.endTime
      // }&from_type=${this.state.way}&version=${this.state.version}&gender=${
      //   this.state.sex
      // }&community_id=${this.state.community}&mobile=${
      //   this.state.phone
      // }&nick_name=${this.state.nickname}`
          // 重新查看下载
          let version =null;
          let community =null;
          if(this.state.version!="请选择"){
            version=this.state.version
          }
          if(this.state.community!="请选择小区"){
            community=this.state.community
          }
          window.location.href = baseUrl+'/backend/feedback/excel?access_token='+window.sessionStorage.getItem(
            'access_token'
          )+'&is_reply=1'+'&time_start='+this.state.startTime+'&time_end='+
            this.state.endTime
          +'&from_type='+this.state.way+'&version='+version+'&gender='+this.state.sex
          +'&community_id='+community+'&mobile='+
            this.state.phone
          +'&nick_name='+this.state.nickname
    }
    // 2019年10月30日19:36:54
  render() {
    const { RangePicker } = DatePicker
    const RadioGroup = Radio.Group
    const Option = Select.Option
    const data = this.state.data
    const columns = [
      {
        title: '状态',
        align: 'center',
        dataIndex: 'is_replay',
        key: 'is_replay',
        width: 100,
        // render: text => 
        // // <Tag color="#87d068">已回复</Tag>
        // <Tag color="#f50">未回复</Tag>
        render: text => {
          if(text===0){
          return  <Tag color="#f50" style={{padding:0}}>未回复</Tag>
          }else if(text===1){
            return <Tag color="#87d068" style={{padding:0}}>已回复</Tag>
          }
        
          
        }
    
      },
      {
        title: '用户ID',
        align: 'center',
        dataIndex: 'user_id',
        key: 'user_id',
        width: 160,
        render: text => <span>{text}</span>
      },
      {
        title: '昵称',
        align: 'center',
        dataIndex: 'nick_name',
        key: 'nick_name',
        width: 160,
        render: text => <span>{text}</span>
      },
      {
        title: '手机号',
        align: 'center',
        dataIndex: 'mobile',
        key: 'mobile',
        width: 120,
        render: text => <span>{text}</span>
      },
      {
        title: '小区',
        align: 'center',
        dataIndex: 'community_name',
        key: 'community_name',
        width: 150,
        render: text => <span>{text}</span>
      },
    //   {
    //     title: '员工',
    //     align: 'center',
    //     dataIndex: 'is_employee',
    //     key: 'is_employee',
    //     width: 100,
    //     render: text => <span>{this.renderEmployee(text)}</span>
    //   },
    //   {
    //     title: '性别',
    //     align: 'center',
    //     dataIndex: 'gender',
    //     key: 'gender',
    //     width: 100,
    //     render: text => <span>{this.renderGender(text)}</span>
    //   },
      {
        title: '渠道',
        align: 'center',
        dataIndex: 'from_type',
        key: 'from_type',
        width: 100,
        render: text => <span>{text}</span>
        // render: text => <span>{this.renderWay(text)}</span>
      },
      {
        title: '版本',
        align: 'center',
        dataIndex: 'version',
        key: 'version',
        width: 100,
        render: text => <span>{text}</span>
      },
      {
        title: '分类',
        align: 'center',
        dataIndex: 'feedback_type',
        key: 'feedback_type',
        width: 100,
        render: text => <span>{text}</span>
      },
          {
        title: '意见详情',
        align: 'center',
        dataIndex: 'content',
        key: 'content',
        width: 450,
        render: text => <span>{text}</span>
      },
  
      {
        title: '操作',
        align: 'center',
        key: 'operation',
        width: 150,
        // fixed: 'right',
        render: (item, record) => (
          
          <a onClick={()=>{this.goIdeaDetail(item)}}>查看</a>
        )
      }
    ]
    return (
      <div style={{ position: 'relative' }}>
      <Row>
        <Col span={24}>
          {/* <Button
            type="primary"
            className="lookdetail-daochu"
            style={{ position: 'absolute', top: '-57px', right: '7px' }}
            onClick={this.Download}
          >
            导出
          </Button> */}
        </Col>
      </Row>
        {/* 2019年10月16日11:22:30增加的 */}
      <div className="show">
    
        <div className="search_box" style={{ position: 'relative' }}>
          <div className="search_content">
            <div className="evaluation_time search_item">
              <span className="txt">评价时间：</span>
              <RangePicker
                placeholder={['开始日期', '结束日期']}
                size="small"
                onChange={this.selectTime}
              />
            </div>
            <div className="way search_item">
              <span className="txt">渠道：</span>
              <RadioGroup onChange={this.selectWay} value={this.state.way}>
                <Radio value="1">ios</Radio>
                <Radio value="2">android</Radio>
              </RadioGroup>
            </div>
            {/* <div className="staff search_item">
              <span className="txt">员工：</span>
              <RadioGroup
                onChange={this.selectIsStaff}
                value={this.state.isStaff}
              >
                <Radio value="1">是</Radio>
                <Radio value="2">否</Radio>
              </RadioGroup>
            </div> */}
            <div className="version search_item">
              <span className="txt">版本：</span>
              <Select
                size="small"
                defaultValue="请选择"
                style={{ width: 100 }}
                onChange={this.selectVersion}
                value={this.state.version}
              >
                {this.state.versionList.map((item, index) => (
                  <Option value={item.version} key={index}>{item.version}</Option>
                ))}
              </Select>
            </div>
            <div className="sex search_item">
              <span className="txt">性别：</span>
              <RadioGroup onChange={this.selectSex} value={this.state.sex}>
                <Radio value="1">男</Radio>
                <Radio value="2">女</Radio>
              </RadioGroup>
            </div>
            <div className="community search_item">
              <span className="txt">小区：</span>
              <Select
                showSearch
                size="small"
                value={this.state.community}
                placeholder="请输入小区"
                style={{ width: 100 }}
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                onSearch={this.searchCommunity}
                onChange={this.selectCommunity}
                notFoundContent={null}
              >
                {this.state.communityList.map((item, index) => (
                  <Option value={item} index={index}>{item.name}</Option>
                ))}
              </Select>
             
            </div>
            <div className="phone search_item">
              <span className="txt">手机号：</span>
              <InputNumber
                placeholder="请输入手机号"
                className="phone_input"
                size="small"
                maxLength={11}
                onChange={this.selectPhone}
                value={this.state.phone}
              />
            </div>
            <div className="nickname search_item">
              <span className="txt">昵称：</span>
              <Input
                placeholder="请输入昵称"
                className="phone_input"
                size="small"
                onChange={this.selectNickname}
                value={this.state.nickname}
              />
            </div>
            <div className="nickname search_item">
              <span className="txt">意见内容：</span>
              <Input
                placeholder="请输入意见内容"
                className="phone_input"
                size="small"
                onChange={this.yijiancontent}
                value={this.state.yijiancontent}
              />
            </div>
          </div>
          <div className="search_btn">
            <Button
              type="primary"
              style={{ marginRight: 15 }}
              onClick={this.search}
            >
              筛选
            </Button>
            <Button onClick={this.clear}>重置</Button>
          </div>
      
        </div>
     
        <div className="table_box">
          <Table
            columns={columns}
            // bordered={true}
            dataSource={data}
            scroll={{ x: 1400 }}
            loading={{
              tip: 'Loading...',
              spinning: this.state.flag
            }}
            pagination={{
              current: this.state.currentPage,
              pageSize: this.state.pageSize, //每页显示条数
              total: this.state.total, //数据总数,  total/pageSize 等于 pagenation页码数
              showTotal: () => {
                //设置显示一共几条数据
                return `共${this.state.total}条数据，当前第${
                  this.state.currentPage
                }页`
              }
            }}
            onChange={this.handleTableChange.bind(this)}
          />
        </div>
        <div className="modal">
          <Modal
            title="满意度调查"
            width={375}
            centered
            visible={this.state.modalVisible}
            onOk={() => this.setModalVisible(false)}
            onCancel={() => this.setModalVisible(false)}
          >
            <div className="item_box">
              {this.state.questionList.map((item, index) => (
                <div className="item" key={index}>
                  <p className="question">
                    {index + 1}、{item.question}
                  </p>
                  <div className="answer_box">
                    <RadioGroup
                      onChange={this.selectIsStaff}
                      value={item.answer}
                    >
                      {this.state.answerList.map((item1, index1) => (
                      
                        <Radio value={5 - index1} disabled key={index1}>
                          {item1.name}
                        </Radio>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
              ))}
            </div>
            <div className="footer">
              <p className="version">v {this.state.version1}</p>
              <p className="time">提交时间：{this.state.create_at}</p>
            </div>
          </Modal>
        </div>
      </div>
    </div>
    )
  }
}
