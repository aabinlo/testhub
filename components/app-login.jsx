import React from 'react';
import ReactDOM from 'react-dom';
import Navi from './navi.jsx';
import LoginForm from './login.jsx';


var AppLogin = React.createClass({
    render: function() {
        return (
            <div>
                <Navi/>
                <LoginForm></LoginForm>
            </div>
        );
    }
});

ReactDOM.render(
    <AppLogin />,
    document.getElementById('appLogin')
);