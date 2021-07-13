import axiosClient from "./axiosClient";

const userAPI = {
  register: (data) => {
    const url = "/user/new";
    return axiosClient.post(url, data);
  },

  login: (data) => {
    const url = "/auth/login";
    return axiosClient.post(url, data);
  },

  createToken: (data) => {
    const url = "/auth/createTk";
    return axiosClient.post(url, data, {
      withCredentials: true,
    });
  },

  refreshToken: () => {
    const url = "/auth/refreshTk";
    return axiosClient.get(url, {
      withCredentials: true,
    });
  },

  googleLogin: (data) => {
    const url = "/auth/oauth";
    return axiosClient.post(url, data, {
      withCredentials: true,
    });
  },

  logOut: ()=>{
    const url = "/auth/logout";
    return axiosClient.post(url, null, {
      withCredentials: true,
    });
  }
};

export default userAPI;
