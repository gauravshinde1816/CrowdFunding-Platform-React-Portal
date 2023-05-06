import {
  Alert,
  Avatar,
  Button,
  Card,
  Divider,
  Drawer,
  Input,
  List,
} from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InvestDrawer from "../components/InvestDrawer";
import { getAllStartups } from "../config/Requests";

export default function Home() {
  const [investDrawerOpen, setInvestDrawerOpen] = useState(false);
  const [currentStatupDetails, setCurrentStatupDetails] = useState({});
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(false);

  const openInvest = (data) => {
    setInvestDrawerOpen(true);
    setCurrentStatupDetails(data);
  };

  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      try {
        const res = await getAllStartups();
        setStartups(res.data);
        setLoading(false);
      } catch (e) {}
    }

    setLoading(true);
    getData();
  }, []);

  return (
    <div className="">
      <Card>
        <Divider orientation="center">
          <div className="text-cyan-600/60 text-5xl font-bold">Welcome</div>
        </Divider>
        <p>
          This is an open platform for crowdfunding campaigns. You can launch a
          campaign using one of our contract templates or integrate your own
          smart contracts. Join our mailing list to learn more about our
          upcoming platform releases.
        </p>
        <Divider orientation="left">
          <div className="text-xl font-bold text-cyan-400">
            Available Startups
          </div>
        </Divider>
        <List className=" max-h-[500px] overflow-auto " loading={loading}>
          {startups.map((item, _id) => {
            return (
              <List.Item className="">
                <List.Item.Meta
                  avatar={<Avatar src={item?.image} />}
                  title={
                    <div
                      className=" cursor-pointer font-bold text-xl"
                      onClick={() => navigate("/startups/" + item._id)}
                    >
                      {item.name}
                    </div>
                  }
                  description={
                    <div>
                      <p className="mb-2">{item.description}</p>
                      <div className="grid grid-cols-5 gap-2 mb-2">
                        <div className="flex space-x-2">
                          <div className="text-gray-500">Valuation: </div>
                          <div className="text-black">{item.valuation}</div>
                        </div>
                        <div className="flex space-x-2">
                          <div className="text-gray-500">Sector: </div>
                          <div className="text-black">{item.category}</div>
                        </div>
                        <div className="flex space-x-2">
                          <div className="text-gray-500">CEO: </div>
                          <div className="text-black">{item.ceo}</div>
                        </div>
                        <div className="flex space-x-2">
                          <div className="text-gray-500">Country: </div>
                          <div className="text-black">{item.country}</div>
                        </div>
                        <div className="flex space-x-2">
                          <div className="text-gray-500">Head Quarters: </div>
                          <div className="text-black">{item.headQuarters}</div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          type="primary"
                          onClick={() => openInvest(item)}
                          className="bg-blue-300"
                        >
                          Invest
                        </Button>
                        <Button
                          onClick={() => {
                            navigate("/startups/" + item._id);
                          }}
                        >
                          More Info
                        </Button>
                      </div>
                    </div>
                  }
                ></List.Item.Meta>
              </List.Item>
            );
          })}
        </List>
      </Card>
      {investDrawerOpen && (
        <InvestDrawer
          setInvestDrawerOpen={setInvestDrawerOpen}
          investDrawerOpen={investDrawerOpen}
          currentStatupDetails={currentStatupDetails}
        ></InvestDrawer>
      )}
    </div>
  );
}
