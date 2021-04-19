import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Player from '../public/lib/decoder/Player';
import io from 'socket.io-client';
import {Icon, Button } from 'antd';

var ScreenMirror = React.createClass({
    propTypes: {
        deviceId: React.PropTypes.string.isRequired
    },

    getDefaultProps: function() {
        return {
            deviceId: 'unknown'
        };
    },

    initScreenMirror: function() {
        console.log('initScreenMirror', this.props.deviceId);
        $.ajax({
            url: '/device/screen_port?device_id=' + this.props.deviceId,
            dataType: 'json',
            type: 'GET',
            cache: false,
            success: function(data) {
                this.initPlayer(data[0].conn_ip, data[0].ctrl_port, data[0].data_port);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    initPlayer: function(connIp, ctrlPort, dataPort) {
        var player = new Player({
            useWorker : true,
            webgl     : true,
            workerFile: '/lib/decoder/Decoder.js',
            size: {
                width : 800,
                height: 480
            },
            transferMemory : true,
            reuseMemory    : true
        });

        player.onPictureDecoded = function(buffer, width, height, infos){
        };

        var div = document.querySelector('#screen');
        div.appendChild(player.canvas);

        var server = location.protocol + "//" + connIp + ':7550';
        var socket = io.connect(server);
        socket.on('error', function (data) {
            console.log('socket error', data);
        });

        var cfg = {
            token    : 0,
            ip       : '127.0.0.1',
            ctrlPort : parseInt(ctrlPort),
            dataPort : parseInt(dataPort),
            width    : 800,
            height   : 480,
            fps      : 40,
            bitRate  : (4*1024*1024)
        };
        console.log(cfg);
        socket.emit('config', cfg);
        socket.on('configRly', function (data) {
            var result = data.reply;
            if (result == 259) {
                console.log('ERROR: config failed');
            } else if (result == 256) {
                console.log('config ok');
            }
        });
        socket.on('frame', function (data) {
            player.decode(data.image);
        });

        document.ondragstart=function() {return false;}
        var CLICK_UP   = 0x0200;
        var CLICK_MOVE = 0x0201;
        var CLICK_DOWN = 0x0202;
        var KEY_HOME   = 0x0203;
        var KEY_RETURN = 0x0204;
        var KEY_MENU   = 0x0205;

        var clickStatus = CLICK_UP;
        var offset=$('#screen').offset();
        function computePos(event,state){
            return {
                x: event.clientX-offset.left,
                y: event.clientY-offset.top,
                slot:0,
                action: state
            };
        };
        $('#screen').mousedown(function(e) {
            if (clickStatus === CLICK_UP) {
                clickStatus = CLICK_DOWN;
                var backCtrl = computePos(e, clickStatus);
                socket.emit('backCtrl', backCtrl);
            }
        });
        $('#screen').mousemove(function(e) {
            if (clickStatus === CLICK_DOWN || clickStatus === CLICK_MOVE) {
                clickStatus = CLICK_MOVE;
                var backCtrl = computePos(e, CLICK_MOVE);
                socket.emit('backCtrl', backCtrl);
            }
        });
        $('#screen').mouseup(function(e) {
            if (clickStatus === CLICK_DOWN || clickStatus === CLICK_MOVE) {

                clickStatus = CLICK_UP;
                var backCtrl = computePos(e, clickStatus);
                socket.emit('backCtrl', backCtrl);

            }
        });
        $('#screen').mouseleave(function(e) {
            if (clickStatus === CLICK_DOWN || clickStatus === CLICK_MOVE) {
                clickStatus = CLICK_UP;
                var backCtrl = computePos(e, clickStatus);
                socket.emit('backCtrl', backCtrl);
            }
        });
    },

    render: function() {
        return (
            <div className="screen_container">
                <div id="screen" className="phone_screen"></div>
                <div className="btn_bar">
                    <button className="btn_rotate"><Icon type="reload" /></button>
                    <div className="btn_barright">
                        <button className="btn_phone"><Icon type="caret-left" /></button>
                        <button className="btn_phone"><Icon type="home" /></button>
                        <button className="btn_phone"><Icon type="menu-fold" /></button>
                    </div>
                </div>
            </div>
        );
    },
    componentDidMount: function() {
        this.initScreenMirror();
    }
});

export default ScreenMirror;