import React from 'react';
import ReactDOM from 'react-dom';
import CodeEditor from './CodeEditor';
import LogContent from './LogContent.jsx';
import UpLoad from './UpLoad.jsx';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;


var DebugTab = React.createClass({
    render:function() {
        return (
            <div className="editor">
                <div className="card-container">
                    <Tabs type="card">
                        <TabPane tab="脚本编辑" key="1">
                            <CodeEditor />
                        </TabPane>
                        <TabPane tab="实时日志" key="2">
                            <LogContent />
                        </TabPane>
                        <TabPane tab="上传APK" key="3">
                            <UpLoad />
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        );
    }
});

export default DebugTab;
