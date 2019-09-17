import axios from "axios"
import qs from "qs"
var url = document.domain,
    targetUrl;//wenjuan-cgj.colourlife.com
    if (url === 'wenjuan-cgj.colourlife.com' || url === "yun.colourlife.com") {
        targetUrl = 'https://service-czy.colourlife.com'
    } else if (url === 'wenjuan-cgjtest.colourlife.com') {
        targetUrl = 'https://service-czytest.colourlife.com'
    } else {
        targetUrl = 'https://service-czytest.colourlife.com'
    }
// let AUTH_TOKEN = (function () {
//     return sessionStorage.getItem("access_token");
// })();
let instance = axios.create({});
//  instance.defaults.headers.common["access-token"] = AUTH_TOKEN;
// instance.interceptors.request.use(function (config) {
//     console.log(config.headers)
//     config.headers['access-token'] = sessionStorage.getItem("access_token")||'111';
//     console.log(config.headers)
//     return config;
// }, function (err) {
//     return Promise.reject(err);
// });
// instance.interceptors.response.use(function (res) {
//     if (res.headers.access_token) {
//         sessionStorage.setItem('access_token', res.headers.token);
//     }
//     return res;
// }, function (err) {
//     return err;
// });
export default {
    //小区通知接口
    targetUrl:targetUrl,
    //问卷名称模糊搜索
    wenjuan_search:params => {return instance.get(`${targetUrl}/backend/questionlist/search`, {params: params}).then(res => res.data)},
    //问卷数据列表
    wenjuan_list:params => {return instance.get(`${targetUrl}/backend/questionlist/data`, {params: params}).then(res => res.data)},
    //问卷列表导出
    wenjuan_out:params => {return instance.get(`${targetUrl}/backend/questionlist/export`, {params: params}).then(res => res.data)},
    //问卷详情
    wenjuan_detail:params => {return instance.get(`${targetUrl}/backend/questionlist/detail`, {params: params}).then(res => res.data)},
    //问卷数据分析
    wenjuan_analyze:params => {return instance.get(`${targetUrl}/backend/question/analysis`, {params: params}).then(res => res.data)},
    //查看详细信息
    wenjuan_this_detail:params => {return instance.get(`${targetUrl}/backend/fill/detail`, {params: params}).then(res => res.data)},
    //满意度后台报表列表数据
    answer_data:params => {return instance.get(`${targetUrl}/backend/answerlist/data`, {params: params}).then(res => res.data)},
    //新增问题
    question_add:params => {return instance.post(`${targetUrl}/backend/question/add`, qs.stringify(params)).then(res => res.data)},
    //新增问卷调查
    question_list_add:params => {return instance.post(`${targetUrl}/backend/questionlist/add`, qs.stringify(params)).then(res => res.data)},
    //问卷详情
    getQuestionList:params => {return instance.get(`${targetUrl}/backend/question/detail`, {params:params}).then(res => res.data)},
    //问卷上下架
    setQuestionStatus:params => {return instance.post(`${targetUrl}/backend/question/state`, qs.stringify(params)).then(res => res.data)},
    //填空题查看列表信息
    getFillList:params => {return instance.get(`${targetUrl}/backend/fill/list`, {params:params}).then(res => res.data)},
    //获取时间
    getTime: params => {
        var date = params
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        var second = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
    }
}