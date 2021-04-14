import { Button, Form, Input } from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;

function noop() {
    return false;
}

let BasicDemo = React.createClass({


    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
                console.log('Errors in form!!!');
                return;
            }
            console.log('Submit!!!');
            console.log(values);
        });
    },


    checkPass(rule, value, callback) {
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

    render() {
        const { getFieldProps } = this.props.form;

        const emailProps = getFieldProps('email', {
            validate: [{
                rules: [
                    { required: true },
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
                { required: true, whitespace: true, message: '请填写密码' },
                { validator: this.checkPass },
            ],
        });
        const rePasswdProps = getFieldProps('rePasswd', {
            rules: [{
                required: true,
                whitespace: true,
                message: '请再次输入密码',
            }, {
                validator: this.checkPass2,
            }],
        });


        return (
            <Form horizontal form={this.props.form}>


                <FormItem

                    label="邮箱"
                    hasFeedback
                >
                    <Input {...emailProps} type="email" placeholder="onBlur 与 onChange 相结合" />
                </FormItem>

                <FormItem

                    label="密码"
                    hasFeedback
                >
                    <Input {...passwdProps} type="password" autoComplete="off"
                                            onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                    />
                </FormItem>

                <FormItem

                    label="确认密码"
                    hasFeedback
                >
                    <Input {...rePasswdProps} type="password" autoComplete="off" placeholder="两次输入密码保持一致"
                                              onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                    />
                </FormItem>


                <FormItem wrapperCol={{ span: 12, offset: 7 }}>
                    <Button type="primary" onClick={this.handleSubmit}>确定</Button>

                </FormItem>
            </Form>
        );
    },
});

BasicDemo = createForm()(BasicDemo);

ReactDOM.render(<BasicDemo />, mountNode);