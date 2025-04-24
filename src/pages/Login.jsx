import React, { useState } from "react";
import { Card, message, Tabs } from 'antd';
import { Button, Form, Input, Radio, Select } from 'antd';
import { useNavigate } from "react-router-dom";
import { postAccessToken, postLogin, postRegister } from "../configs/services";
import { useDispatch } from "react-redux";
import { loginStatus, logoutStatus } from "../features/userSlice";

const { TabPane } = Tabs;
const { TextArea } = Input;

const Login = () => {
  const navigate = useNavigate();
  const [identity, setIdentity] = useState('0');
  const [franchisorIdentity, setFranchisorIdentity] = useState(true);
  const [registerForm] = Form.useForm();
  const [activeTab, setActiveTab] = useState("1");
  const dispatch = useDispatch();

  const handleIdentityChange = (e) => {
    setIdentity(e.target.value);
  };

  const onFinish = (values) => {
    console.log('Login Attempt:', values);

    postLogin(values)
      .then(res => {
        const response = JSON.parse(res.data);
        if (response) {
          postAccessToken()
            .then(res => {
              const accessTokenData = res;
              console.log("JWT response =>", accessTokenData);
              dispatch(loginStatus(accessTokenData));

              // Show message and navigate after a short delay
              if (accessTokenData.identity === "0") {
                message.success("Franchisor login successful!");
                setTimeout(() => navigate("/FranchisorDashboard"), 500);
              } else if (accessTokenData.identity === "1") {
                message.success("Franchisee login successful!");
                setTimeout(() => navigate("/Franchiseedashboard"), 500);
              }
            })
            .catch(err => {
              console.error("JWT Error:", err);
              dispatch(logoutStatus());
              message.error("Login failed. Please try again.");
            });
        } else {
          message.error("Wrong username or password!");
        }
      })
      .catch(err => {
        console.error("Login Error:", err);
        message.error("Server error. Please check your credentials.");
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onRegisterFinish = (values) => {
    const newObj = { ...values };
    console.log("Register Attempt:", newObj);
    postRegister(newObj).then(res => {
      const response = JSON.parse(res.data);
      if (response.code === 200) {
        message.success("Registration successful!");
        registerForm.resetFields();
        setActiveTab("1");
      } else if (response.code === 500) {
        if (response.object) {
          message.error(response.object);
        } else {
          message.error("Registration failed!");
        }
      }
    });
  };

  const onSelectChange = (value) => {
    setFranchisorIdentity(value === "Franchisor");
  };

  const GeneralFormRules = [{ required: true, message: 'Required Field' }];

  return (
    <div className="p-4 flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-xl p-6 bg-white rounded-lg shadow-md">
        <Card>
          <Tabs defaultActiveKey="1" activeKey={activeTab} onChange={(key) => setActiveTab(key)}>
            <TabPane tab="Login" key="1">
              <Form
                name="loginForm"
                layout="vertical"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[{ required: true, message: "Please input your username!" }]}
                >
                  <Input className="rounded-md" />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[{ required: true, message: "Please input your password!" }]}
                >
                  <Input.Password className="rounded-md" />
                </Form.Item>

                {/* <Form.Item
                  label="Identity"
                  name="identity"
                  rules={[{ required: true, message: "Please select your identity!" }]}
                >
                  <Radio.Group value={identity} onChange={handleIdentityChange}>
                    <Radio value="0">Franchisee</Radio>
                    <Radio value="1">Franchisor</Radio>
                  </Radio.Group>
                </Form.Item> */}

                <Form.Item>
                  <div className="flex justify-between">
                    <Button
                      onClick={() => navigate("/")}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                    >
                      Submit
                    </Button>
                  </div>
                </Form.Item>
              </Form>
            </TabPane>

            <TabPane tab="Register" key="2">
              <Form
                form={registerForm}
                layout="vertical"
                onFinish={onRegisterFinish}
              >
                <Form.Item name="username" label="Username" rules={GeneralFormRules}>
                  <Input className="rounded-md" />
                </Form.Item>
                <Form.Item name="password" label="Password" rules={GeneralFormRules}>
                  <Input.Password className="rounded-md" />
                </Form.Item>
                <Form.Item name="email" label="Email" rules={GeneralFormRules}>
                  <Input className="rounded-md" />
                </Form.Item>
                <Form.Item name="mobile" label="Phone Number" rules={GeneralFormRules}>
                  <Input className="rounded-md" />
                </Form.Item>
                <Form.Item name="address" label="Address" rules={GeneralFormRules}>
                  <TextArea rows={4} className="rounded-md" />
                </Form.Item>

                <Form.Item
                  label="Identity"
                  name="userRole"
                  rules={GeneralFormRules}
                >
                  <Select onChange={onSelectChange} className="rounded-md">
                    <Select.Option value="FRANCHISOR" key="0">Franchisor</Select.Option>
                    <Select.Option value="FRANCHISEE" key="1">Franchisee</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                  >
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </TabPane>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default Login;
