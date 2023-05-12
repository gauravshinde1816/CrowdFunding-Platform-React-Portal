import React, { useState, useEffect } from "react";
import { Button, Select, Form, Input, Spin } from "antd";
import { ethers } from "ethers"
import { useSpendingRequestContext } from "../context"
import "../App.css";
import {
  createSpendingRequest,
  getStartupsForManager,
} from "../config/Requests";
import { useNavigate } from "react-router-dom";

const tailLayout = {
  wrapperCol: {
    offset: 4,
    span: 16,
  },
};

const handleChange = (value) => {
  console.log(`selected ${value}`);
};

export default function CreateSpendingRequest() {
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  // context

  const { publishSpendingRequest  } = useSpendingRequestContext()

  useEffect(() => {
    async function getData() {
      const res = await getStartupsForManager();
      setStartups(res.data);
      setLoading(false);
    }
    setLoading();
    getData();
  }, []);


  // form.address, // owner
  // form.title, // title
  // form.description, // description
  // form.target,
  // form.minCount

  const handleSubmit = async (values) => {
    setLoading(true);
    console.log(values);
    const res = await createSpendingRequest(values);

    console.log("SP DB ," , res)

    const formObject = {
      address: values.vendorWalletAddress,
      title: values.title,
      description: values.productDetails,
      target: ethers.utils.parseUnits(values.amount.toString(), 18),
      // yet to be replaced with 50 % of existing investors
      minCount: 0,
      database_id: res.data,
    }
    await publishSpendingRequest(formObject)
    console.log(res.data);
    setLoading(false);
    navigate("/managerProfile");
  };

  const formRef = React.useRef(null);
  return (
    <Spin spinning={loading}>
      <div className="mb-4">
        <div className="investor-profile space-y-3">
          <div className="text-4xl mb-4 font-bold border-b pb-2 text-gray-400">
            Create new spending request
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
            remember: true,
            amount: 10,
            title: "Example spending request",
            productDetails: "sample description",
          }}
          onFinish={handleSubmit}
          onFinishFailed={() => { }}
          autoComplete="off"
          ref={formRef}
        >
          <Form.Item
            name="startupId"
            label="Select Startup"
            rules={[{ required: true }]}
          >
            <Select
              defaultValue="select"
              style={{
                width: 120,
              }}
              onChange={handleChange}
              options={startups.map((startup) => {
                return {
                  value: startup._id,
                  label: startup.name,
                };
              })}
            />
          </Form.Item>
          <Form.Item
            label="Title:  "
            name={"title"}
            rules={[{ required: true, message: "This field is required" }]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            label="Product details: "
            name={"productDetails"}
            rules={[{ required: true, message: "This field is required" }]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            label="Vendor wallet address"
            name={"vendorWalletAddress"}
            rules={[{ required: true, message: "This field is required" }]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            label="Amount to be raised (in ETH / MATIC / SEPOLIA): "
            name={"amount"}
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
    </Spin>
  );
}
