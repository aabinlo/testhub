    /**
 * Created by tangbenda on 2016/8/16.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';


    import { Row,Col,Form, Input,Button, Checkbox } from 'antd';
    const FormItem = Form.Item;

let LoginForm = React.createClass({
    getInitialState:function(){
        return {
            username:'',
            password:'',
            checked:false,
        };
    },
    handleSubmit:function(e) {
        e.preventDefault();
        this.props.form.validateFields((errors) => {
            if (!!errors) {
                console.log('Errors in form!!!');
                return;
            }
            var loginData = this.props.form.getFieldsValue()
            $.ajax({
                url: '/users/login',
                dataType: 'json',
                type: 'POST',
                data: loginData,
                cache: false,
                success: function(data) {
                    if (data.success) {
                        window.top.location.href = '/';
                    } else {
                        console.error('login error');
                    }
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(xhr, status, err.toString());
                }.bind(this)
            });
        });
    },
    render:function(){
        const { getFieldProps} = this.props.form;
        const emailProps = getFieldProps('email', {
            validate: [{
                rules: [
                    { required: true,message:'请输入邮箱' },
                ],
                trigger: 'onBlur',
            }, {
                rules: [
                    { type: 'email', message: '请填写正确的邮箱地址' },
                ],
                trigger: ['onBlur','onChange'],
            }],
        });
        const passwdProps = getFieldProps('passwd', {
            rules: [
                { required: true, whitespace: true, message: '请输入密码' },
                { validator: this.checkPass },
            ],
        });

        const checkBoxProps = getFieldProps('remember', {
            initialValue: false,
            valuePropName: 'checked'
        });
        return (
            <div className="login_box">
                <div className="login_title">
                    <p>登录TestHub</p>
                </div>
                <div className="login_form">
                    <Form horizontal  onSubmit={this.handleSubmit}>
                         <FormItem  hasFeedback>
                             <Input {...emailProps} type="email" placeholder="请输入邮箱" />
                         </FormItem>
                         <FormItem>
                            <Input {...passwdProps} type="password" placeholder="请输入密码" />
                         </FormItem>
                         <FormItem>
                             <Checkbox {...checkBoxProps} >记住我</Checkbox>
                         </FormItem>
                         <Row>
                             <Col span={12}  style={{ textAlign: 'left' }}>
                                 <Button type="primary" htmlType="submit">登录</Button>
                                 <Button className="btn_reg">注册</Button>
                             </Col>
                         </Row>
                    </Form>
                </div>
            </div>
        );
    },
});

LoginForm = Form.create()(LoginForm);

export default LoginForm;