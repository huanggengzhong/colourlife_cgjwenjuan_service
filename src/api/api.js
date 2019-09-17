import axios from "axios"
import qs from "qs"

var url = document.domain, _baseUrl, openUrl;
//wenjuan-cgj.colourlife.com
if (url === "yun.colourlife.com" ||url==='wenjuan-cgj.colourlife.com') { //正式环境
    _baseUrl = "https://yun.colourlife.com"
    openUrl = "https://open.colourlife.com"

} else if (url === "yun-beta.colourlife.com" ) { //预发环境
    _baseUrl = "https://yun-beta.colourlife.com"
    openUrl = "http://open.test.colourlife.com"
    

} else { //测试环境
    // baseUrl="https://openapi-test.colourlife.com"
    // _baseUrl = "http://localhost"
    // openUrl = "http://localhost"
    _baseUrl = "https://yun-test.colourlife.com"
    openUrl = "http://open.test.colourlife.com"
}

export default {
    _baseUrl: _baseUrl,
    openUrl: openUrl,
    //1.获取用户扫码登录的二维码基础信息
    getQrcodeInfo: params => {
        return axios.get(`${_baseUrl}/api/login/qrcode`, {
            params: params
        }).then(res => res.data)
    },
    //2.根据二维码唯一UUID获取ACCESS_TOKEN
    getTokenInfo: params => {
        return axios.get(`${_baseUrl}/api/login/qrcode/check`, {
            params: params
        }).then(res => res.data)
    },
    //3.根据ACCESS_TOKEN获取用户基本信息
    getUserInfo: params => {
        return axios.get(`${_baseUrl}/api/user/info`, {
            params: params
        }).then(res => res.data)
    },
    //4.用户菜单列表
    getUserMenuList: params => {
        return axios.get(`${_baseUrl}/api/user/menu/list`, {
            params: params
        }).then(res => res.data)
    },
    //5.创建菜单
    createMenu: params => {
        return axios.post(`${_baseUrl}/api/menu/create`, qs.stringify(params)).then(res => res.data)
    },
    //6.更新菜单
    updateMenu: params => {
        return axios.post(`${_baseUrl}/api/menu/update`, qs.stringify(params)).then(res => res.data)
    },
    //7.删除菜单
    deleteMenu: params => {
        return axios.post(`${_baseUrl}/api/menu/delete`, qs.stringify(params)).then(res => res.data)
    },
    //8.获取菜单列表
    getMenuList: params => {
        return axios.get(`${_baseUrl}/api/menu/list`, {
            params: params
        }).then(res => res.data)
    },
    //9.角色列表
    getRoleList: params => {
        return axios.get(`${_baseUrl}/api/role/list`, {
            params: params
        }).then(res => res.data)
    },
    //10.添加角色
    createRole: params => {
        return axios.post(`${_baseUrl}/api/role/create`, qs.stringify(params)).then(res => res.data)
    },
    //11.更新角色
    updateRole: params => {
        return axios.post(`${_baseUrl}/api/role/update`, qs.stringify(params)).then(res => res.data)
    },
    //12.删除角色
    deleteRole: params => {
        return axios.post(`${_baseUrl}/api/role/delete`, qs.stringify(params)).then(res => res.data)
    },
    //13.角色权限列表
    getPrivilegeList: params => {
        return axios.get(`${_baseUrl}/api/role/privilege/list`, {
            params: params
        }).then(res => res.data)
    },
    //14.角色用户列表
    getUserRoleList: params => {
        return axios.get(`${_baseUrl}/api/role/user/list`, {
            params: params
        }).then(res => res.data)
    },
    //15.添加角色用户关联
    createUserRole: params => {
        return axios.post(`${_baseUrl}/api/role/user/create`, qs.stringify(params)).then(res => res.data)
    },
    //16.删除角色用户关联
    deleteUserRole: params => {
        return axios.post(`${_baseUrl}/api/role/user/delete`, qs.stringify(params)).then(res => res.data)
    },
    //17.更新角色权限关联
    updateUserRole: params => {
        return axios.post(`${_baseUrl}/api/role/privilege/update`, qs.stringify(params)).then(res => res.data)
    },
    //18.上传图片
    upload: params => {
        return axios.post(`${_baseUrl}/api/upload/image`, qs.stringify(params)).then(res => res.data)
    },
    //18.退出登录
    logout: params => {
        return axios.post(`${_baseUrl}/api/user/logout`, qs.stringify(params)).then(res => res.data)
    },

}