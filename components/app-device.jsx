import React from 'react';
import ReactDOM from 'react-dom';
import { Row, Col } from 'antd';
import Navi from './navi.jsx';
import ScreenMirror from './screen-mirror.jsx';
import DebugDevice from './debug-device';

var App = React.createClass({
    render: function() {
        var div = document.getElementById('app');
        var id = div.attributes.deviceId.value;
        console.log('App render', id);
        return (
        <div>
            <Row>
                <Col span={16}>
                    <ScreenMirror deviceId={id}/>
                </Col>
                <Col span={8}>
                    <DebugDevice deviceId={id}/>
                </Col>
            </Row>
        </div>
        );
    }
});

ReactDOM.render(
    <App />,
    document.getElementById('app')
);