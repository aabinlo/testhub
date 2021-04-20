import React from 'react';
import ReactDOM from 'react-dom';
import { Input } from 'antd';


var TreeModel = React.createClass({
    getDefaultProps:function(){
        return {
            tree:'',
        };
    },

    render:function(){
        return (
            <div className="tree_container">
                <h2>Node Viewer</h2>
                <textarea className="log_textarea" value={this.props.tree}></textarea>
            </div>
        );
    }

})
export default TreeModel;