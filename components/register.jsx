import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import { Row,Col,Form, Input,Button, Checkbox} from 'antd';
const FormItem = Form.Item;


function noop() {
    return false;
}

let RegisterForm = React.createClass({
    getInitialState:function(){
        return {
            username:'',
            password:'',
            rePassword:'',
        };
    },
    checkPass( rule,value, callback) {
        const { validateFields } = this.props.form;
        if (value) {
            validateFields(['rePasswd'], { force: true });
        }
        callback();
    },
    checkPass2(rule, value, callback) {
        const { getFieldValue } = this.props.form;
        if (value && value !== getFieldValue('passwd')) {
            callback('两次输入密码不一致！');
        } else {
            callback();
        }
    },
    handleSubmit:function(e) {
        e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
                console.log('Errors in form!!!');
                return;
            }
            console.log('Submit!!!');
            var fieldData = this.props.form.getFieldsValue();
            var userData ={'username':fieldData.email,'passwd':fieldData.passwd};
            console.log(userData);
            $.ajax({
                url: '',
                dataType: 'json',
                method: 'POST',
                cache: false,
                success:function(){
                    console.log(data);},
                error: function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        });
    },

    render:function(){
        const { getFieldProps } = this.props.form;

        const emailProps = getFieldProps('email', {
            validate: [{
                rules: [
                    { required: true,message:'请输入邮箱' },
                ],
                trigger: 'onBlur',
            }, {
                rules: [
                    { type: 'email', message: '请输入正确的邮箱地址' },
                ],
                trigger: ['onBlur', 'onChange'],
            }],
        });
        const passwdProps = getFieldProps('passwd', {
            rules: [
                { required: true, whitespace: true, message: '请输入密码' },
                { validator: this.checkPass },
            ],
        });
        const rePasswdProps = getFieldProps('rePasswd', {
            rules: [{
                required: true,
                whitespace: true,
                message: '请再次输入密码',
            },
                { validator: this.checkPass2,
            }],
        });
        const formItemLayout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 12 },
        };
        return (
            <div className="register_box">
                <div className="login_title">
                    <p>填写注册信息</p>
                </div>
                <div className="register_form">
                    <Form horizontal  onSubmit={this.handleSubmit} >
                        <FormItem {...formItemLayout} label="邮箱" hasFeedback >
                            <Input {...emailProps} type="email"  />
                        </FormItem>
                        <FormItem {...formItemLayout} label="密码" hasFeedback>
                            <Input {...passwdProps} type="password" autoComplete="off"
                                                    onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                            />
                        </FormItem>
                        <FormItem {...formItemLayout} label="确认密码" hasFeedback>
                            <Input {...rePasswdProps} type="password" autoComplete="off" placeholder="两次输入密码保持一致"
                                                      onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                            />
                        </FormItem>
                        <Row >
                            <Col offset={7}  >
                                <Button type="primary" htmlType="submit">注册</Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
        );
    },
});

RegisterForm =Form.create()(RegisterForm);

export default RegisterForm;