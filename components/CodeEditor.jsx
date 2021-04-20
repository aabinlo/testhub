import  React from 'react';
import ReactDOM from 'react-dom';
import Codemirror from 'react-codemirror';
import 'codemirror/mode/javascript/javascript';

var CodeEditor = React.createClass({
    getInitialState: function() {
        return {
            code: "// Write your code here"
        };
    },
    updateCode: function(newCode) {
        this.setState({
            code: newCode
        });
    },
    render: function() {
        var options = {
            autoMatchParens: true,
            lineWrapping: true,
            lineNumbers: true,//设置行号
            tabMode: 'spaces',
            mode:'javascript',
            smartIndent: true,
            theme: "lesser-dark",
            indentUnit : 2,  // 缩进单位，默认2
            smartIndent : true,  // 是否智能缩进
            tabSize : 4,  // Tab缩进，默认4
            readOnly : false,  // 是否只读，默认false
            showCursorWhenSelecting : true,
        };
        return (
            <div className="code_editor">
                <Codemirror value={this.state.code} onChange={this.updateCode} options={options} />
                <div className="btn_bar_run">
                    <div className="btn_barB">
                        <button className="btn_code_editor">运行</button>
                        <button className="btn_code_editor">保存</button>
                        <button className="btn_code_editor">加载</button>
                    </div>
                </div>

            </div>);
    }
});

export default CodeEditor;