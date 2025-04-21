import React, { useEffect, useState } from "react";
import { Card, message, notification, Select, Space, Tabs, Upload } from 'antd';
import { Button, Checkbox, Form, Input, Radio, Col, Row } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCartOutlined, UploadOutlined } from "@ant-design/icons";
import httpService from "../configs/HttpService";
import { postLogin, postRegister } from "../configs/services";
import { loginStatus, logoutStatus, increment, setCount } from "../features/userSlice";
import { useSelector, useDispatch } from 'react-redux'
import { baseUrl } from "../configs/HttpService";

const { TabPane } = Tabs;
const { TextArea } = Input;
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const Login = () => {
  const navigate = useNavigate()
  const [identity, setIdentity] = useState('0');
  const [franchisorIdentity, setFranchisorIdentity] = useState(true)
  const [registerForm] = Form.useForm();
  const [activeTab, setActiveTab] = useState("1"); // State to control active tab

  const handleIdentityChange = (e) => {
    setIdentity(e.target.value);
  };

  const onFinish = (values) => {
    console.log('Success:', values);
    postLogin(values).then(res => {
      const response = JSON.parse(res.data)
      console.log(response)
      if (response.code === 200) {
        navigate("/")
      } else {
        message.error("Wrong username or password!")
      }

    }).catch((err) => {
      console.log(err)
    })
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const onRegisterFinish = (values) => {
    // if(imageList.length===0) return;
    const newObj = Object.assign({}, values);
    console.log("onRegisterFinish Object=>", newObj)
    
    postRegister(newObj).then(res => {
      const response = JSON.parse(res.data)
      if (response.code === 200) {
        message.success("Succeed");
        registerForm.resetFields();
        setActiveTab("1");
      } else if (response.code === 500) {
        if (response.object !== undefined && response.object !== null) {
          message.error(response.object)
        } else {
          message.error("Failed")
        }

      }
    })
  }
  const handleChange = (info) => {
    console.log("info=>", info)
    setImageList(info.fileList)
  }
  const onSelectChange = (value) => {
    // console.log("value=>", value)
    if (value === "Franchisor") {
      setFranchisorIdentity(true)
    } else {
      setFranchisorIdentity(false)
    }
  }
  const divStyle = {
    backgroundColor: '#F5F5F5',
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
  };
  const GeneralFormRules = [{ required: true, message: 'Required Field' }];

  return (
    <div className="p-4 flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-xl p-6 bg-white rounded-lg shadow-md">
        <Card>
          <Tabs defaultActiveKey="1" activeKey={activeTab} onChange={(key) => setActiveTab(key)}>
            <TabPane tab="Login" key="1">
              <Form
                name="basic"
                layout="vertical"
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Please input your username!",
                    },
                  ]}
                >
                  <Input className="rounded-md" />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input.Password className="rounded-md" />
                </Form.Item>

                <Form.Item
                  label="Identity"
                  name="identity"
                  rules={[
                    {
                      required: true,
                      message: "Please select your identity!",
                    },
                  ]}
                >
                  <Radio.Group value={identity} onChange={handleIdentityChange}>
                    <Radio value="0">Franchisee</Radio>
                    <Radio value="1">Franchisor</Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item>
                  <div className="flex justify-between">
                    <Button
                      onClick={() => {
                        navigate("/");
                      }}
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
                <Form.Item
                  name="username"
                  label="Username"
                  rules={GeneralFormRules}
                >
                  <Input className="rounded-md" />
                </Form.Item>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={GeneralFormRules}
                >
                  <Input.Password className="rounded-md" />
                </Form.Item>
                <Form.Item name="email" label="Email" rules={GeneralFormRules}>
                  <Input className="rounded-md" />
                </Form.Item>
                <Form.Item
                  name="phoneNumber"
                  label="Phone Number"
                  rules={GeneralFormRules}
                >
                  <Input className="rounded-md" />
                </Form.Item>
                <Form.Item
                  name="address"
                  label="Address"
                  rules={GeneralFormRules}
                >
                  <TextArea rows={4} className="rounded-md" />
                </Form.Item>
            
                <Form.Item
                  label="Identity"
                  name="identity"
                  rules={GeneralFormRules}
                >
                  <Select onChange={onSelectChange} className="rounded-md">
                    <Select.Option value="Franchisor" key="0">
                      Franchisor
                    </Select.Option>
                    <Select.Option value="Franchisee" key="1">
                    Franchisee
                    </Select.Option>
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