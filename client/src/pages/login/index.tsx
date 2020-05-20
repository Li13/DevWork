import React from "react";
import { Form, Input, Button, message } from "antd";
import { login } from "@/store/fetch/auth";
import { FormItemProps } from "antd/lib/form";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./index.css";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
};

interface DFormItemProps extends FormItemProps {
  name?: string;
  rules?: any[];
}

type DFormItem = (props: DFormItemProps) => React.ReactElement;

const FormItem = Form.Item as DFormItem;

function Login(props: any) {
  const [form] = Form.useForm();
  const onFinish = ({ username, password }: any) => {
    login(username, password);
  };

  const onFinishFailed = (errorInfo: any) => {
    message.error("请校验输入参数格式");
  };
  return (
    <div className="login-box">
      <Form
        {...layout}
        form={form}
        initialValues={{ remember: true, username: "", password: "" }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <FormItem
          name="username"
          label="用户名"
          rules={[{ required: true, message: "请输入用户名" }]}
        >
          <Input placeholder="username" prefix={<UserOutlined />} />
        </FormItem>
        <FormItem name="password" label="密码" rules={[{ required: true, message: "请输入密码" }]}>
          <Input.Password placeholder="password" prefix={<LockOutlined />} />
        </FormItem>
        <Button type="primary" htmlType="submit" block>
          登录
        </Button>
      </Form>
    </div>
  );
}

export default Login;
