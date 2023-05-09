import axios from "axios";

const backend = axios.create({
  baseURL: "http://localhost:5000",
});

const tokenKey = "auth-token-34";

const authHeaders = {
  headers: {
    Authorization: localStorage.getItem(tokenKey),
  },
};

export const getAllStartups = () => backend.get("/startups");
export const getStartupsForManager = () =>
  backend.get("/startups/me", authHeaders);
export const getStartupById = (id) => backend.get("/startups/" + id);
export const getInvestments = () =>
  backend.get("/investments/investor", authHeaders);
export const createUser = (data) => backend.post("/users", data);
export const createStartup = (data) =>
  backend.post("/startups", data, authHeaders);
export const getAllSpendingRequests = () => backend.get("/spendingrequest");
export const getAllSpendingRequestsForManager = () =>
  backend.get("/spendingrequest/me", authHeaders);
export const createSpendingRequest = (data) =>
  backend.post("/spendingrequest/" + data.startupId, data, authHeaders);

export const getSpendingRequestForStartups = (startupId) =>
  backend.get("/spendingrequest/byStartup/" + startupId);
export const login = (data) => backend.post("/users/login", data);

export const loginWithToken = (token) =>
  backend.get("/users/profile", {
    headers: {
      Authorization: token,
    },
  });

export const invest = (data) => {
  console.log(authHeaders);
  backend.post(
    "/investors/invest/" + data.startupId + "/" + data.spendingRequestId,
    data,
    authHeaders
  );
};

export const getSpendingRequestForInvestor = () =>
  backend.get("/spendingrequest/byInvestor", authHeaders);

export const upvoteSpendingRequest = (id) => {
  backend.post("/spendingrequest/" + id + "/upvote", {}, authHeaders);
};

export const downvoteSpendingRequest = (id) => {
  backend.put("/spendingrequest/" + id + "/downvote", {}, authHeaders);
};
