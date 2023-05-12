import { Card, Descriptions, Spin, Table } from "antd";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getStartupById } from "../config/Requests";

const StartupDetails = () => {
  const [data, setData] = useState({});
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(false);

  const params = useParams();

  useEffect(() => {
    const fetchStartup = async () => {
      setLoading(true);
      try {
        setLoading(false);
        const res = await getStartupById(params.id);
        setData(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchStartup();
  }, []);

  return (
    <Spin spinning={loading}>
      <div className="startup-details space-y-4">
        <div className="col-span-2 flex items-center space-x-8 p-4 shadow bg-blue-50 rounded-xl">
          <img
            className=" rounded-full w-[140px] h-[140px]"
            src={data.image}
          ></img>
          <div className=" text-7xl">{data.name}</div>
        </div>
        <Descriptions
          title="Basic Info"
          className="p-4 rounded-xl shadow"
          bordered
          column={2}
          colon={true}
          size={"small"}
        >
          <Descriptions.Item label="Valuation">
            ${data.valuation} Millions
          </Descriptions.Item>
          <Descriptions.Item label="Ceo">{data.ceo}</Descriptions.Item>
          <Descriptions.Item label="Head Quarters">
            {data.headQuarters}
          </Descriptions.Item>
          <Descriptions.Item label="Country">{data.country}</Descriptions.Item>
          <Descriptions.Item label="Sector">{data.category}</Descriptions.Item>
          <Descriptions.Item label="Founded in">
            {data.foundedIn}
          </Descriptions.Item>
        </Descriptions>

        {/* <Table columns={columns} dataSource={investments}></Table> */}
      </div>
    </Spin>
  );
};

export default StartupDetails;

const columns = [
  {
    title: "Investor",
    dataIndex: "investor",
    key: "investor",
  },
  {
    title: "Valuation",
    dataIndex: "valuation",
    key: "valuation",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
];
