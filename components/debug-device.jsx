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
            <div>
                <h2 style={{margin: '10px'}}>HUAWEI</h2>
                <h4>开发者手机连接:<span>adb connect 127.0.0.1:{this.state.connPort}</span></h4>
            </div>

        );
    }
});

export default ConnectDevice;