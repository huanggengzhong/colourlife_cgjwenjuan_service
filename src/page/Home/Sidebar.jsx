import React, { Component } from 'react';
import './sidebar.css';
import api from './../../api/api'

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headersHTML: ''
    }
  }
  componentDidMount() {
    //添加侧边栏
    //console.log(JSON.stringify(html_info))
    

    // var GetQueryString = param => {
    //   const reg = new RegExp("(^|&)" + param + "=([^&]*)(&|$)");
    //   const r =
    //     window.location.search.substr(1).match(reg) ||
    //     window.location.hash
    //       .substring(window.location.hash.search(/\?/) + 1)
    //       .match(reg);
    //   if (r != null) {
    //     return decodeURIComponent(r[2]);
    //   }
    // };
    ///////////////////////////////////////////////////////////////////////////////////
    api.getnavsider().then(res => {
      //console.log(res);
      if (res) {
        this.setState({
          headersHTML: res
        }, () => {
          const newScript = document.createElement('script');
          newScript.src=`${api._baseUrl}/common_module/slider/slider.js`
          const newcss = document.createElement('link');
          newcss.setAttribute('type','text/css');
         newcss.setAttribute('rel','stylesheet');
          newcss.setAttribute('href',`${api._baseUrl}/common_module/slider/slider.css`);
          //console.log(newScript,newcss);
          document.head.appendChild(newScript);
          var head = document.getElementsByTagName('head')[0];
          head.appendChild(newcss);
        })
      }
    })
  }
  render() { 
    return (
      <div style={{ height: 'calc( 100vh - 48px )' }} dangerouslySetInnerHTML={
        {
          __html: this.state.headersHTML
        }
      } >
      </div>
    );
  }
}

export default Sidebar;
