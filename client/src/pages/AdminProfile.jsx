import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { Radio, Space, Table, Tag, Avatar, Divider, Spin, Button } from "antd";
import { Descriptions } from "antd";
import { UserOutlined } from "@ant-design/icons";
import {
  getSpendingRequestForAdmin,
  approveSpendingRequest
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
  const navigate = useNavigate()

  const upvote = async (id) => {
    const res = await approveSpendingRequest(id);
    console.log(res)
    navigate("/")
  }

  const downvote = async (id) => {
    const res = await downvoteSpendingRequest(id)
  }

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
      title: "title",
      dataIndex: "title",
      key: "title",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "productDetails",
      dataIndex: "productDetails",
      key: "productDetails",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "amount",
      dataIndex: "amount",
      key: "amount",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "totalAmountRaised",
      dataIndex: "totalAmountRaised",
      key: "totalAmountRaised",
      render: (text) => <a>{text}</a>,
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
      render: (data) => {
        return (data ? <span>✅︎</span> : <span>X</span>)
      }
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        const isPresent = record.votes.find((ele) => ele.user === record.user)
        const isApperoved = record.isApproved
        console.log(record)


        return isApperoved ? <Space>Approved ✅︎</Space> : (
          <Space size="middle">
            <Button disabled={isPresent} onClick={() => upvote(record._id)} className="bg-cyan-500 text-white">Accept</Button>
            <Button onClick={() => downvote(record._id)} className="bg-red-400 text-white">Reject</Button>
          </Space>
        )
      }
      ,
    },
  ];

  return (
    <div className="investor-profile space-y-3">
      <Divider orientation="left">
        <div className="text-cyan-600/60 text-5xl font-bold">
          Admin Profile
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
