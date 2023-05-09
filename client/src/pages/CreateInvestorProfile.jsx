import { Button, Form, Input, Select } from "antd";
import React, { useState } from "react";
import { USER_TYPE_INVESTOR } from "../config/Constants";
import { createUser } from "../config/Requests";

const tailLayout = {
  wrapperCol: {
    offset: 4,
    span: 16,
  },
};

const CreateInvestor = ({ setUserByToken }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const formRef = React.useRef(null);
  const { Option } = Select;

  const onReset = () => {
    formRef.current?.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({
      note: "Hello world!",
      gender: "male",
    });
  };

  const onGenderChange = (value) => {
    switch (value) {
      case "male":
        form.setFieldsValue({ note: "Hi, man!" });
        break;
      case "female":
        form.setFieldsValue({ note: "Hi, lady!" });
        break;
      case "other":
        form.setFieldsValue({ note: "Hi there!" });
        break;
      default:
    }
  };

  const onFinish = (values) => {
    values = { ...values, role: USER_TYPE_INVESTOR };
    console.log(values);
    async function getData() {
      try {
        const res = await createUser(values);
        setUserByToken(res.data.token);
        setLoading(false);
      } catch (e) { }
    }

    setLoading(true);
    getData();
  };

  return (
    <div className="text-center space-y-2 mt-40">
      <h1 className=" text-4xl font-bold mb-10">Create Investor</h1>
      <Form
        className="w-[600px] mx-auto border p-4 py-8 bg-gray-50 rounded-lg"
        title="Enter campaign manager details"
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{
          name: "Albert Einstein",
          email: "iamalbert@gmai.com",
          mobile: "98112323432",
          gender: "Male",
          role: "INVESTOR",
          password: "password123",
          confirmPassword: "password123",
        }}
        onFinish={onFinish}
        onFinishFailed={() => { }}
        autoComplete="off"
        ref={formRef}
      >
        <Form.Item
          label="Name"
          name={"name"}
          rules={[{ required: true, message: "This field is required" }]}
        >
          <Input></Input>
        </Form.Item>
        <Form.Item
          label="Email"
          name={"email"}
          rules={[{ required: true, message: "This field is required" }]}
        >
          <Input></Input>
        </Form.Item>

        <Form.Item
          label="wallet Address"
          name={"walletAddress"}
          rules={[{ required: true, message: "This field is required" }]}
        >
          <Input></Input>
        </Form.Item>
        <Form.Item
          label="Mobile"
          name={"mobile"}
          rules={[
            {
              required: true,
              message: "This field is required",
            },
          ]}
        >
          <Input></Input>
        </Form.Item>
        <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
          <Select
            placeholder="Select your gender"
            onChange={onGenderChange}
            allowClear
          >
            <Option value="Male">Male</Option>
            <Option value="Female">Female</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Password"
          name={"password"}
          rules={[
            {
              required: true,
              message: "This field is required",
            },
          ]}
        >
          <Input></Input>
        </Form.Item>
        <Form.Item
          label="Confirm password"
          name={"confirmPassword"}
          rules={[
            {
              required: true,
              message: "This field is required",
            },
          ]}
        >
          <Input></Input>
        </Form.Item>
        <Form.Item {...tailLayout} className="space-x-4">
          <Button className=" bg-blue-500 text-white mr-2" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" className="mr-2" onClick={onReset}>
            Reset
          </Button>
          <Button type="dashed" onClick={onFill}>
            Fill form
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateInvestor;
