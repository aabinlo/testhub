import React from 'react';
import ReactDOM from 'react-dom';
import {Button, Table, Icon } from 'antd';
import $ from 'jquery';





const columns = [ {title:'' ,  dataIndex:'logo', key:'logo',width:'10%',},
    {title: '品牌',dataIndex: 'brand',key: 'name',width:'5%',},
    {title: '型号',dataIndex: 'model',key: 'model',width:'10%',},
    {title: '系统',dataIndex: 'version',key: 'version',width:'10%',},
    {title: '分辨率',dataIndex:"resolution",key: 'resolution',width:'10%',},
    {title: '设备ID',dataIndex:"device_id",key: 'device_id', width:'35%',},
    {title: '状态', dataIndex:'device_status',key: 'device_status',width:'20%',
     render:()=>(

         <span>
        <a href="#">调试</a>
        <span className="ant-divider"></span>
        <a href="#">测试</a>

         </span>)},
     ]





var DeviceList = React.createClass({
    loadDeviceListFromServer:function() {
        console.log('loadDeviceListFromServer');
        $.ajax({
            url: '/device/list',
            dataType: 'json',
            method: 'GET',
            cache: false,
            success: function(data) {

                this.setState({
                    data:data
                });
                console.log(data);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    getInitialState:function() {
        console.log('getInitialState');
        var addr = "//static.testhub.lo/img/mobile/xiaomi/logo.png";
        return {

            data:
                [{logo:<img className="brand_logo" src={addr}></img>,
                    brand:'小米',
                    model:'小米note',
                    version:'5.0',
                    resolution:'1080x1920',
                    device_id:'1235586666KAMANAKAKAKAKNA',
                   // device_status:<Button type="primary" size="large" >{status}</Button>
                }],
        };
    },

    componentDidMount: function() {
        console.log('componentDidMount');
        this.loadDeviceListFromServer();
        //setInterval(this.loadDeviceListFromServer, this.props.pollInterval);
    },


    render:function() {
        return (
            <div className="dev_list">
                <Table columns={columns}
                   dataSource={this.state.data}
                   pagination={false}
                />
            </div>

        );
    },
});

export default DeviceList;