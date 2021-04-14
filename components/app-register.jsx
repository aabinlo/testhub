import React from 'react';
import ReactDOM from 'react-dom';
import Navi from './navi.jsx';
import RegisterForm from './register.jsx';


var AppRegister = React.createClass({
    render: function() {
        return (
            <div>
                <Navi/>
                <RegisterForm/>
            </div>
        );
    }
});

ReactDOM.render(
    <AppRegister />,
    document.getElementById('appRegister')
);