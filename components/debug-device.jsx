import React from 'react';
import ReactDOM from 'react-dom';
import { Row, Col } from 'antd';
import ScreenMirror from './screen-mirror.jsx';

var DebugDevice = React.createClass({
    render: function() {
        return (
            <div>
                <Row>
                    <Col span={16}>
                        <ScreenMirror host="127.0.0.1" hostPort="7550"
                                      ctrlPort="10711" dataPort="10710"/>
                    </Col>
                    <Col span={8}>
                        <h2 style={{margin: '10px'}}>HUAWEI</h2>
                        <h4>开发者手机连接:<span class="text-info">adb connect 127.0.0.1:7550</span></h4>
                    </Col>
                </Row>
            </div>

        );
    }
});

export default DebugDevice;