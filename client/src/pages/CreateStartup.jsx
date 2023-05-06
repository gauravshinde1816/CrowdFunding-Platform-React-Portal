import React, { useState, useEffect } from "react";
import { Button, Select, Form, Input } from "antd";
import "../App.css";
import { createStartup } from "../config/Requests";
import { useNavigate } from "react-router-dom";

const tailLayout = {
  wrapperCol: {
    offset: 4,
    span: 16,
  },
};

export default function CreateStartup() {
  const navigate = useNavigate();

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const handleSubmit = async (values) => {
    try {
      const res = await createStartup(values);
      navigate("/managerProfile");
    } catch (e) {
      alert("Unable to create startup");
    }
  };

  const formRef = React.useRef(null);
  return (
    <div className="mb-4">
      <div className="investor-profile space-y-3">
        <div className="text-4xl mb-4 font-bold border-b pb-2 text-gray-400">
          Create new Startup
        </div>
      </div>
      <Form
        className="w-[1500px] mx-auto border p-4 py-8 bg-gray-50 rounded-lg pb-2"
        title="Enter campaign manager details"
        name="basic"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 800 }}
        initialValues={{
          name: "ABC",
          segment: "EDTECH",
          description: "New Startup",
          image: "link",
          companySize: "60",
          foundedIn: "1999",
          valuation: "5000000",
          ceo: "Harry",
          country: "India",
          headQuarters: "Pune",
        }}
        onFinish={handleSubmit}
        onFinishFailed={() => {}}
        autoComplete="off"
        ref={formRef}
      >
        <Form.Item
          label="Start-up Name"
          name={"name"}
          rules={[{ required: true, message: "This field is required" }]}
        >
          <Input></Input>
        </Form.Item>

        <Form.Item
          name="category"
          label="Select Startup Segment"
          rules={[{ required: true }]}
        >
          <Select
            defaultValue="select"
            style={{
              width: 120,
            }}
            onChange={handleChange}
            options={[
              {
                key: "EDTECH",
                value: "EDTECH",
              },
              {
                key: "FINTECH",
                value: "FINTECH",
              },
              {
                key: "LIFESTYLE",
                value: "LIFESTYLE",
              },
              {
                key: "SOCIAL",
                value: "SOCIAL",
              },
              {
                key: "n/a",
                value: "n/a",
              },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="Start-up Description"
          name={"description"}
          rules={[{ required: true, message: "This field is required" }]}
        >
          <Input></Input>
        </Form.Item>

        <Form.Item
          label="Idea Person Wallet Address"
          name={"ideaPersonWalletAddress"}
          rules={[{ required: true, message: "This field is required" }]}
        >
          <Input></Input>
        </Form.Item>

        <Form.Item
          label="Start-up Logo Image"
          name={"image"}
          rules={[{ required: true, message: "This field is required" }]}
        >
          <Input></Input>
        </Form.Item>

        <Form.Item
          label="Start-up Size"
          name={"companySize"}
          rules={[{ required: true, message: "This field is required" }]}
        >
          <Input></Input>
        </Form.Item>

        <Form.Item
          label="Start-up Found In"
          name={"foundedIn"}
          rules={[{ required: true, message: "This field is required" }]}
        >
          <Input></Input>
        </Form.Item>

        <Form.Item
          label="Start-up Valuation"
          name={"valuation"}
          rules={[{ required: true, message: "This field is required" }]}
        >
          <Input></Input>
        </Form.Item>

        <Form.Item
          label="Start-up Ceo Name"
          name={"ceo"}
          rules={[{ required: true, message: "This field is required" }]}
        >
          <Input></Input>
        </Form.Item>

        <Form.Item
          label="Start-up Country"
          name={"country"}
          rules={[{ required: true, message: "This field is required" }]}
        >
          <Input></Input>
        </Form.Item>

        <Form.Item
          label="Start-up Headquarters"
          name={"headQuarters"}
          rules={[{ required: true, message: "This field is required" }]}
        >
          <Input></Input>
        </Form.Item>

        <Form.Item {...tailLayout} className="space-x-4">
          <Button className=" bg-blue-500 text-white mr-2" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <div></div>
    </div>
  );
}
