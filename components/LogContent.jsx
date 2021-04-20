import React from 'react';
import ReactDOM from 'react-dom';
import { Input } from 'antd';
import $ from 'jquery';


var LogContent = React.createClass({

    getDefaultProps:function(){
        return {
            logInfo:'log info',
        }
    },
    render:function(){
      return (
          <div className="log_content">
              <Input type="textarea" value={this.props.logInfo}></Input>
          </div>
      );
  }
})
export default LogContent;