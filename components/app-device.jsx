import React from 'react';
import ReactDOM from 'react-dom';
import { Row, Col } from 'antd';
import Navi from './navi.jsx';
import ScreenMirror from './screen-mirror.jsx';

var App = React.createClass({
    render: function() {
        var div = document.getElementById('app');
        console.log('div.attributes', div.attributes);
        var id = div.attributes.deviceId.value;
        console.log('App render', id);
        return (
            <ScreenMirror deviceId={id}/>
        );
    }
});

ReactDOM.render(
    <App />,
    document.getElementById('app')
);