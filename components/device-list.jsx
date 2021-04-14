import React from 'react';
import ReactDOM from 'react-dom';
import {Button, Table, Icon } from 'antd';
import $ from 'jquery';





const columns = [{title: '品牌',dataIndex: 'brand_name',key: 'name',width:'10%',},
    {title: '型号',dataIndex: 'model_name',key: 'model_name',width:'10%',},
    {title: '系统版本',dataIndex: 'os',key: 'os',width:'10%',},
    {title: '分辨率',dataIndex:"resolution",key: 'resolution',width:'10%',},
    {title: 'RAM',dataIndex:"ram",key: 'ram', width:'15%',},
    {title: 'ROM',dataIndex:"rom",key: 'rom', width:'15%',},
    {title: '状态',dataIndex:"device_status",key: 'device_status', width:'10%',},
    {title: '操作', dataIndex:'operate',key: 'operate',width:'20%',
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
            type: 'GET',
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
        return {
            data:
                [  {brand_name:'小米',
                    model_name:'小米note',
                    os:'5.0',
                    resolution:'1080x1920',
                    ram:15642312,
                    rom:12634457,
                    device_status:'busy',
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