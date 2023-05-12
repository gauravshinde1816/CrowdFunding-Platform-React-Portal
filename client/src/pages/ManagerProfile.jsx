import React, { useState, useEffect } from "react";
import {
  Radio,
  Space,
  Table,
  Tag,
  Avatar,
  Button,
  Select,
  Form,
  Input,
} from "antd";
import { Descriptions } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "../App.css";
import {
  getAllSpendingRequests,
  getAllSpendingRequestsForManager,
} from "../config/Requests";

const columns = [
  {
    title: "Start up Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Campaign Manager Name",
    dataIndex: "cmname",
    key: "cmname",
  },
  {
    title: "Vendor Name",
    dataIndex: "vendorname",
    key: "vendorname",
  },
  {
    title: "Spending Request Name",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Product Details",
    dataIndex: "productDetails",
    key: "productDetails",
  },
  {
    title: "Amount to be raised",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Total Amount Raised",
    dataIndex: "totalAmountRaised",
    key: "tamount",
  },
  {
    title: "Approvals",
    dataIndex: "approvals",
    key: "approvals",
  },
  {
    title: "Creation Date",
    dataIndex: "createdAt",
    key: "createdAt",
  }
];
const dummyData = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];

export default function ManagerProfile({ user }) {
  const [top, setTop] = useState("topLeft");
  const [bottom, setBottom] = useState("bottomRight");
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(dummyData);

  useEffect(() => {
    async function getData() {
      try {
        const res = await getAllSpendingRequestsForManager();
        setData(res.data);
        setLoading(false);
      } catch (e) {}
    }

    setLoading(true);
    getData();
  }, []);

  return (
    <div className="manager-profile space-y-2">
      <div className="text-4xl mb-4 font-bold border-b pb-2 text-gray-400">
        Campaign Manager Profile
      </div>
      <div className=" text-right space-x-4">
        <Button
          className="w-1/6 bg-blue-400 text-white"
          onClick={() => {
            navigate("/createSpendingRequest");
          }}
        >
          Create Spending Request
        </Button>
        <Button
          className="w-1/6 bg-blue-400 text-white"
          onClick={() => {
            navigate("/createStartup");
          }}
        >
          Create Startup
        </Button>
      </div>
      <div className="grid grid-cols-5 p-4 rounded-xl py-4 border">
        <Space wrap size={16}>
          <Avatar size={64} icon={<UserOutlined />} />
        </Space>
        <div className="grid grid-cols-3 col-span-4">
          <div className="flex space-x-3">
            <div className=" text-slate-500">Name: </div>
            <div className=" font-bold">{user.user.name}</div>
          </div>
          <div className="flex space-x-3">
            <div className=" text-slate-500">Email: </div>
            <div className=" font-bold">{user.user.email}</div>
          </div>
          <div className="flex space-x-3">
            <div className=" text-slate-500">Mobile: </div>
            <div className=" font-bold">{user.user.mobile || "NA"}</div>
          </div>
          <div className="flex space-x-3">
            <div className=" text-slate-500">Total Campaingns managed: </div>
            <div className=" font-bold">{data.length}</div>
          </div>
        </div>
      </div>
      <div>
        <Table
          loading={loading}
          columns={columns}
          pagination={{
            position: [bottom],
          }}
          dataSource={data}
        />
      </div>
    </div>
  );
}
