import React from 'react';
import ReactDOM from 'react-dom';
import { Upload, Icon } from 'antd';
const Dragger = Upload.Dragger;

var UpLoad = React.createClass({
  render: function(){
      const props = {
          name: 'file',
          showUploadList: false,
          action: '/upload.do',
      };
      return (
          <div style={{ marginTop: 16, height: 180 }}>
              <Dragger {...props}>
                  <p className="ant-upload-drag-icon">
                      <Icon type="inbox" />
                  </p>
                  <p className="ant-upload-text">点击或将文件拖拽到此区域上传</p>
                  <p className="ant-upload-hint">支持单个或批量上传，严禁上传公司内部资料及其他违禁文件</p>
              </Dragger>
          </div>
      );
  }
})

export default UpLoad;


