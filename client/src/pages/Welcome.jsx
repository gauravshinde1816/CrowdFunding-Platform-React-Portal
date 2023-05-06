import { Button, Card } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Welcome(props) {
  const navigate = useNavigate();
  return (
    <div>
      <div className="max-w-[700px] mx-auto mt-40 space-y-4">
        <div className="text-5xl text-gray-400 font-light">Welcome</div>
        <div className="text-green-500 font-bold text-2xl">
          Crowd Funding and Fraud Detection Platform
        </div>
        <Button
          className="w-[200px] bg-blue-500 text-white"
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
        <Card
          title="New to the platform?"
          className="max-w-[500px] mx-auto border-none"
        >
          <div className=" grid grid-cols-1 gap-2">
            <Button
              onClick={() => {
                navigate("/createCampaignManagerProfile");
              }}
            >
              Join as Campaign Manager
            </Button>
            <Button
              onClick={() => {
                navigate("/createInvestor");
              }}
            >
              Join as Investor
            </Button>
            <Button
              onClick={() => {
                navigate("/createVendor");
              }}>Join as Vendor</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
