import React, { useState, useEffect } from "react";
import { Radio, Space, Table, Tag, Avatar, Divider, Spin, Button } from "antd";
import { Descriptions } from "antd";
import { UserOutlined } from "@ant-design/icons";
import {
  getSpendingRequestForAdmin,
  getSpendingRequestForInvestor,
} from "../config/Requests";
import { formatDateWithYear } from "../config/Constants";

const calculatetotalinvestment = (data) => {
  let sum = 0;
  data.forEach((element) => {
    sum += element.amount;
  });
  return sum;
};
const AdminProfile = ({ investorId, user }) => {
  const [spendingRequests, setSpendingRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getSpendingRequests() {
      const res = await getSpendingRequestForAdmin();
      console.log(res);
      setLoading(false);
      setSpendingRequests(res.data);
    }
    setLoading(true);
    getSpendingRequests();
  }, [investorId]);

  const columns = [
    {
      title: "Sr no.",
      dataIndex: "srNo",
      key: "srno",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Start up Name",
      dataIndex: "startupName",
      key: "startupName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Campaign Manager Name",
      dataIndex: "cmName",
      key: "cmName",
    },
    {
      title: "Vendor Name",
      dataIndex: "vName",
      key: "vName",
    },
    {
      title: "Amount to be raised",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Total Amount Raised",
      dataIndex: "totalAmountRaised",
      key: "totalAmountRaised",
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
      render: (date) => formatDateWithYear(date),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button className="bg-cyan-500 text-white">Accept</Button>
          <Button className="bg-red-400 text-white">Reject</Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="investor-profile space-y-3">
      <Divider orientation="left">
        <div className="text-cyan-600/60 text-5xl font-bold">
          Investor Profile
        </div>
      </Divider>
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
        </div>
      </div>
      <div>
        <Table
          loading={loading}
          columns={columns}
          pagination={{
            position: ["bottomRight"],
          }}
          dataSource={spendingRequests}
        />
      </div>
    </div>
  );
};

export default AdminProfile;
