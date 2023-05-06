import { Card, Divider, Table, Tag, Tooltip } from "antd";
import React, { useState, useEffect } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { formatDate } from "../config/Constants";
import { getInvestments } from "../config/Requests";

export default function MyInvestments() {
  const [loading, setLoading] = useState(false);
  const [investments, setInvestments] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const res = await getInvestments();
        setInvestments(
          res.data.map((dt) => {
            return { ...dt, createdAt: formatDate(dt) };
          })
        );
        setLoading(false);
      } catch (e) {}
    }

    setLoading(true);
    getData();
  }, []);

  return (
    <div>
      <Divider orientation="left">
        <div className="text-cyan-600/60 text-5xl font-bold">
          Investment Statastics
        </div>
      </Divider>
      <ResponsiveContainer width={"100%"} height={250}>
        <LineChart data={investments} className="mx-auto">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="createdAt" />
          <YAxis dataKey={"amount"} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="amount" stroke="#8884d8" />
          {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
        </LineChart>
      </ResponsiveContainer>
      <Divider orientation="left">
        <div className="text-cyan-600 text-2xl">Investments</div>
      </Divider>
      <Table
        columns={columns}
        pagination={{
          position: ["bottomRight"],
        }}
        dataSource={investments}
      />
    </div>
  );
}

const columns = [
  {
    title: "Sr no.",
    dataIndex: "sr",
    key: "sr",
    render: (i) => i + ".",
  },
  {
    title: "Logo",
    dataIndex: "logo",
    key: "logo",
    render: (src) => <img className="h-[50px] rounded-full" src={src}></img>,
  },
  {
    title: "Startup",
    dataIndex: "startupName",
    key: "startupName",
    render: (name) => <div className=" font-bold text-black/60">{name}</div>,
  },
  {
    title: "Sector",
    dataIndex: "sector",
    key: "sector",
    render: (text) => <Tag className={`m-0 bg-green-200`}>{text}</Tag>,
  },
  {
    title: "Invested (in $)",
    dataIndex: "amount",
    key: "amount",
    render: (text) => "$ " + text + ".00",
  },
  {
    title: "Date & Time",
    dataIndex: "createdAt",
    key: "createdAt",
  },
];
