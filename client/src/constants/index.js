import {
  createCampaign,
  dashboard,
  logout,
  payment,
  profile,
  withdraw,
} from "../assets";

export const navlinks = [
  {
    name: "dashboard",
    imgUrl: dashboard,
    link: "/",
  },
  {
    name: "campaign",
    imgUrl: createCampaign,
    link: "/create-campaign",
  },
  {
    name: "payment",
    imgUrl: payment,
    link: "/",
    disabled: false,
  },
  {
    name: "withdraw",
    imgUrl: withdraw,
    link: "/",
    disabled: false,
  },
  {
    name: "profile",
    imgUrl: profile,
    link: "/profile",
  },
  {
    name: "create-spending-request",
    imgUrl: payment,
    link: "/create-spending-request",
  },
  {
    name: "spending-request",
    imgUrl: payment,
    link: "/spending-request",
  },
  {
    name: "logout",
    imgUrl: logout,
    link: "/",
    disabled: false,
  },
];
