import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import 'antd/dist/antd.css'
import './static/css/normalize.css'
// import Login from './page/Login/Login';
import Home from './page/Home/Home';
import serviceWorker from './serviceWorker';

ReactDOM.render(
<HashRouter>
    <Switch>
        {/* <Route path="/Login" component={Login} /> */}
        <Route path="/Home" component={Home} />
        <Route path="/" render={(props) =>
            <Home {...props}/>
        }>
        </Route>
    </Switch>
</HashRouter>, 
document.getElementById('root'));
serviceWorker();
