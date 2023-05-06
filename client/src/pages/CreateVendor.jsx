import React, { useState } from "react";
import "../App.css";
import { createUser } from "../config/Requests";
import { Button, Form, Input, Select } from "antd";


const tailLayout = {
    wrapperCol: {
      offset: 4,
      span: 16,
    },
  };

const Vendor = () => {

    const [form] = Form.useForm();
  const { Option } = Select;
  const formRef = React.useRef(null);
  
  const [loading, setLoading] = useState(false);

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
}

  const handleSubmit = (values) => {
    values = { ...values, role: "VENDOR" };
    console.log(values);
    async function getData() {
      try {
        const res = await createUser(values);
        console.log(res.data);
        setLoading(false);
      } catch (e) {}
    }

    setLoading(true);
    getData();
  };

  return (
    <div className="container text-left">

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
        onFinish={handleSubmit}
        onFinishFailed={() => {}}
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
        </Form.Item>
      </Form>
    
    </div>
  );
};

export default Vendor;
