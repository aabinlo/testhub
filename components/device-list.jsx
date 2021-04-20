import React from 'react';
import ReactDOM from 'react-dom';
import {Button, Table, Icon } from 'antd';
import $ from 'jquery';

const columns = [{title: '品牌',dataIndex: 'brandName',key: 'brandName',width:'10%',},
    {title: '型号',dataIndex: 'modelName',key: 'modelName',width:'15%',},
    {title: '系统版本',dataIndex: 'os',key: 'os',width:'15%',},
    {title: '分辨率',dataIndex:"resolution",key: 'resolution',width:'10%',},
    {title: 'RAM',dataIndex:"ram",key: 'ram', width:'15%',},
    {title: '状态',dataIndex:"status",key: 'status', width:'15%',},
    {title: '操作', dataIndex:'operate',key: 'operate',width:'20%',
     render:function(text,record){
         var url_debug = "/device/debug/"+record.device_id;
         var url_test = "/device/test/"+record.device_id;
         return (
             <span>
                 <a href={url_debug}>调试</a>
                 <span className="ant-divider"></span>
                 <a href={url_test}>测试</a>
             </span>
         )
     }
    }
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
                [  {brandName:'小米',
                    modelName:'小米note',
                    os:'5.0',
                    resolution:'1080x1920',
                    ram:15642312,
                    status:'busy',
                    device_id:123,
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