import React from 'react';
import ReactDOM from 'react-dom';
import { Menu,Icon} from 'antd';


var Navi = React.createClass({

    getInitialState:function() {
        return {
            current: 'home',
        };
    },

    handleClick:function(e) {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    },

    render:function() {
        return (
            <div  className="header">
                <div className="container">
                    <div className="index_logo">
                        <Menu onClick={this.handleClick}
                              selectedKeys={[this.state.current]}
                              mode="horizontal" theme="dark">
                            <Menu.Item key="home" >
                                <a href="./index.html">TestHub</a>
                            </Menu.Item>
                        </Menu>
                    </div>
                    <div className="index_nav">
                        <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal" theme="dark">
                            <Menu.Item key="devices" >
                                <Icon type="devices" />设备列表
                            </Menu.Item>

                            <Menu.Item key="tasks">
                                <a href="./index.html" target="_blank">测试任务</a>
                            </Menu.Item>
                        </Menu>
                    </div>
                    <div className="nav_right">
                        <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal" theme="dark">
                            <Menu.Item key="log">
                                <a href="../views/login.html" target="_blank">登录</a>
                            </Menu.Item>
                            <Menu.Item key="reg">
                                <a href="./index.html" target="_blank">注册</a>
                            </Menu.Item>
                        </Menu>
                    </div>
                </div>
            </div>
        );
    }
});

export default Navi;