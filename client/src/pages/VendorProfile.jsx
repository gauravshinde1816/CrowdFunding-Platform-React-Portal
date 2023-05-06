import React, { useState, useEffect } from "react";
import { Space, Table, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { getAllSpendingRequests } from "../config/Requests";

const columns = [
  {
    title: "Sr no",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Transaction Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Transaction Id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Credited By",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Amount credited",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Purpose",
    dataIndex: "productDetails",
    key: "productDetails",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
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

export default function VendorProfile() {
  const [top, setTop] = useState("topLeft");
  const [bottom, setBottom] = useState("bottomRight");
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(dummyData);

  useEffect(() => {
    async function getData() {
      try {
        const res = await getAllSpendingRequests();
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
        Vendor Profile
      </div>
      <div className="grid grid-cols-5 p-4 rounded-xl py-4 border">
        <Space wrap size={16}>
          <Avatar size={64} icon={<UserOutlined />} />
        </Space>
        <div className="grid grid-cols-3 col-span-4">
          <div className="flex space-x-3">
            <div className=" text-slate-500">Name: </div>
            <div className=" font-bold">Bhavana Bafna</div>
          </div>
          <div className="flex space-x-3">
            <div className=" text-slate-500">Email: </div>
            <div className=" font-bold">bhavnaabafna.bb@gmail.com</div>
          </div>
          <div className="flex space-x-3">
            <div className=" text-slate-500">Mobile: </div>
            <div className=" font-bold">9823889479</div>
          </div>
          <div className="flex space-x-3">
            <div className=" text-slate-500">Total Campaingns managed: </div>
            <div className=" font-bold">21</div>
          </div>
        </div>
      </div>
      <div></div>

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
