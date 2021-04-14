import React from 'react';
import ReactDOM from 'react-dom';
import { Row, Col } from 'antd';

var ConnectDevice = React.createClass({
    propTypes: {
        deviceId: React.PropTypes.string.isRequired
    },

    getDefaultProps: function() {
        return {
            deviceId: 'unknown'
        };
    },

    getInitialState: function() {
        return {
            connPort: 0
        };
    },

    getConnPort: function() {
        $.ajax({
            url: '/device/conn_port?device_id=' + this.props.deviceId,
            dataType: 'json',
            type: 'GET',
            cache: false,
            success: function(data) {
                this.setState({connPort: data[0].conn_port});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    render: function() {
        return (
            <div className="debug_title">
                <div className="device_info">
                <h2>HUAWEI</h2>
                <h4>开发者手机连接:<span>adb connect 127.0.0.1:{this.state.connPort}</span></h4>
                </div>
                <button className="btn_exit">结束调试</button>


            </div>

        );
    }
});

export default ConnectDevice;