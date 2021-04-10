import React from 'react';
import ReactDOM from 'react-dom';

import { Table, Icon } from 'antd';

const columns = [ {title:'' ,    dataIndex:'logo', key:'logo',width:'10%',},
    {title: '品牌',dataIndex: 'brand',key: 'name',width:'5%',},
    {title: '型号',dataIndex: 'model',key: 'model',width:'10%',},
    {title: '系统',dataIndex: 'version',key: 'version',width:'10%',},
    {title: '分辨率',dataIndex:"resolution",key: 'resolution',width:'10%',},
    {title: '设备ID',dataIndex:"deviceid",key: 'deviceid', width:'35%',},
    {title: '状态', dataIndex:'state',key: 'state',width:'20%',}];


var DeviceList = React.createClass({
    getInitialState:function() {
        return {
            data: [{logo:'',
                brand:'小米',
                model:'小米note',
                version:'5.0',
                resolution:'1080x1920',
                deviceid:'1235586666KAMANAKAKAKAKNA',
                state:''
            }],
        };
    },

    render:function() {
        return (
            <Table columns={columns}
                   dataSource={this.state.data}
                   pagination={false}
            />

        );
    },
});

export default DeviceList;