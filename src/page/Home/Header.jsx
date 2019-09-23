import React, {
  Component
} from 'react';
import './header.css';
import api from './../../api/api'

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headersHTML: ''
    }
  }

  componentDidMount() {
   // console.log(JSON.stringify(header))
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

    api.getnavHeader().then(res => {
      if (res) {
        this.setState({
          headersHTML: res
        }, () => {
          const newScript = document.createElement('script');
          newScript.src=`${api._baseUrl}/common_module/header/header.js`
          const newcss = document.createElement('link');
          newcss.setAttribute('type','text/css');
         newcss.setAttribute('rel','stylesheet');
          newcss.setAttribute('href',`${api._baseUrl}/common_module/header/header.css`);
          //console.log(newScript,newcss);
          document.head.appendChild(newScript);
          var head = document.getElementsByTagName('head')[0];
          head.appendChild(newcss);
        })
      }
    })



  }

  render() {

    return (<div style={
      {
        width: '100%'
      }
    } >

      <div className="_header"
        dangerouslySetInnerHTML={
          {
            __html: this.state.headersHTML
          }
        } >

      </div>

    </div>
    );
  }
}

export default Header;