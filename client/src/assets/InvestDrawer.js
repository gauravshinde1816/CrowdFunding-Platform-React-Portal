import React, { useEffect, useState } from "react";
import {
  Alert,
  Avatar,
  Button,
  Card,
  Divider,
  Drawer,
  Form,
  Input,
  List,
  Result,
  Select,
} from "antd";
import { getSpendingRequestForStartups, invest } from "../config/Requests";

export default function InvestDrawer({
  currentStatupDetails,
  setInvestDrawerOpen,
  investDrawerOpen,
}) {
  const [spendingRequests, setSpendingRequests] = useState([]);
  const [investmentSuccessful, setInvestmentSuccessful] = useState(false);
  const closeInvest = () => {
    setInvestDrawerOpen(false);
  };
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const formRef = React.useRef(null);
  const { Option } = Select;

  useEffect(() => {
    async function getSpendingRequests() {
      const res = await getSpendingRequestForStartups(currentStatupDetails._id);
      setLoading(false);
      setSpendingRequests(res.data);
    }

    setLoading(true);
    getSpendingRequests();
  }, [investDrawerOpen]);

  const onFinish = async (values) => {
    values = { ...values, startupId: currentStatupDetails._id };
    setLoading(true);
    try {
      const res = await invest(values);
      console.log(res);
      setInvestmentSuccessful(true);
      setLoading(false);
    } catch (e) {}
  };

  const onCampaignChange = (value) => {
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

  return (
    <Drawer
      title="Invest"
      placement="right"
      onClose={closeInvest}
      open={investDrawerOpen}
    >
      {investmentSuccessful ? (
        <Result
          status="success"
          title={
            "Successfully invested $" +
            form.getFieldValue("amount") +
            " in " +
            currentStatupDetails.name
          }
          subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
          extra={[
            <Button
              key="buy"
              className="text-white bg-blue-400"
              onClick={() => {
                setInvestmentSuccessful(false);
              }}
            >
              Buy Again
            </Button>,
            <Button
              key="console"
              className="text-white bg-red-400"
              onClick={closeInvest}
            >
              Close
            </Button>,
          ]}
        />
      ) : (
        <Card
          loading={loading}
          title={
            <div className="space-y-4">
              <img
                src={currentStatupDetails.image}
                className="h-[200px] mx-auto rounded-full"
              ></img>
              <h1 className="text-cyan-400 text-2xl">
                {currentStatupDetails.name}
              </h1>
            </div>
          }
        >
          <div className="text-sm font-bold text-cyan-600 pb-2">
            Description
          </div>
          <p className="text-gray-400">{currentStatupDetails.description}</p>
          <Divider></Divider>
          <div className="text-sm font-bold text-cyan-600 pb-2">Statastics</div>
          <div className="space-y-1 text-sm">
            <div className="flex space-x-2">
              <div className="text-gray-500">Valuation: </div>
              <div className="text-black">{currentStatupDetails.valuation}</div>
            </div>
            <div className="flex space-x-2">
              <div className="text-gray-500">Sector: </div>
              <div className="text-black">{currentStatupDetails.category}</div>
            </div>
            <div className="flex space-x-2">
              <div className="text-gray-500">CEO: </div>
              <div className="text-black">{currentStatupDetails.ceo}</div>
            </div>
            <div className="flex space-x-2">
              <div className="text-gray-500">Country: </div>
              <div className="text-black">{currentStatupDetails.country}</div>
            </div>
            <div className="flex space-x-2">
              <div className="text-gray-500">Head Quarters: </div>
              <div className="text-black">
                {currentStatupDetails.headQuarters}
              </div>
            </div>
          </div>
          <Divider></Divider>
          <div className="text-sm font-bold text-cyan-600 mb-2">
            Enter details
          </div>
          {spendingRequests.length > 0 ? (
            <Form
              // layout="vertical"
              initialValues={{
                amount: "password123",
                spendingRequestId: spendingRequests[0]._id,
              }}
              onFinish={onFinish}
              onFinishFailed={() => {}}
              autoComplete="off"
              ref={formRef}
              // size={"small"}
            >
              <Form.Item
                // label="Spending Request"
                name={"spendingRequestId"}
                rules={[{ required: true, message: "This field is required" }]}
                onChange={onCampaignChange}
              >
                <Select placeholder="Select campaign">
                  {spendingRequests.map((request) => {
                    return <Option value={request._id}>{request.title}</Option>;
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                name={"amount"}
                rules={[
                  {
                    required: true,
                    message: "This field is required",
                  },
                ]}
              >
                <Input placeholder="Amount" type="number"></Input>
              </Form.Item>
              <Form.Item>
                <Button
                  className="bg-blue-500 text-white mr-2"
                  loading={loading}
                  htmlType="submit"
                >
                  Invest
                </Button>
                <Button className="bg-red-500 text-white" onClick={closeInvest}>
                  Cancel
                </Button>
              </Form.Item>
            </Form>
          ) : (
            <div className=" text-red-400">
              No spending requests for this startup
            </div>
          )}
        </Card>
      )}
    </Drawer>
  );
}
