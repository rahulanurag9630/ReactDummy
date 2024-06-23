import axios from "axios";
import { ApiConfig } from "./apiConfig";
import toast from "react-hot-toast";

export const postApiHandler = async (endPoint, body) => {
  //   console.log(body, "asjbfafd");
  try {
    const res = await axios({
      method: "POST",
      url: ApiConfig[endPoint],
      data: body,
    });
    console.log(res, "before api call");
    if (res.data?.responseCode == 200 || res.data?.responseCode == 201) {
      return res.data;
    } else {
      toast.error(res.data?.responseMessage || "Something went wrong");
      return null;
    }
  } catch (error) {
    
     if( error?.response?.data?.responseCode === 302){
      

        return error;
      }
   
      // console.log(error)
   
    // console.log(error, "gethandler");
    return error;
  }
};

export const postApiHandlerWithToken = async (endPoint, body) => {
  const token = sessionStorage.getItem("token");
  try {
    const res = await axios({
      method: "POST",
      url: ApiConfig[endPoint],
      data: body,
      headers: {
        token: token,
      },
    });
    if (res.data?.ResponseCode == 200) {
      return res.data;
    } else {
      toast.error(res.data?.ResponseMessage || "Something went wrong");
      return null;
    }
  } catch (error) {
    toast.error(
      error?.response?.data?.ResponseMessage || "Something went wrong"
    );
    return null;
  }
};

export const getApiHandlerWithToken = async (endPoint, params) => {
  const token = sessionStorage.getItem("token");
  try {
    const res = await axios({
      method: "GET",
      url: ApiConfig[endPoint],
      params: params,
      headers: {
        token: token,
      },
    });
    if (res.data?.ResponseCode == 200) {
      return res.data;
    } else {
      toast.error(res.data?.ResponseMessage || "Something went wrong");
      return null;
    }
  } catch (error) {
    toast.error(
      error?.response?.data?.ResponseMessage || "Something went wrong"
    );
    return null;
  }
};
export const getApiHandler = async (endPoint, params) => {
  // alert("api")
  try {
    const res = await axios({
      method: "GET",
      url: ApiConfig[endPoint],
      params: params,
    });
    if (res.data?.responseCode == 200) {
      console.log(res?.data, "dataaaaa");
      return res.data;
    } else {
      // toast.error(res.data?.responseMessage || "Something went wrong");
      return null;
    }
  } catch (error) {
    toast.error(
      error?.response?.data?.responseMessage || "Something went wrong"
    );
    return null;
  }
};
export const putApiHandlerWithToken = async (endPoint, body) => {
  const token = sessionStorage.getItem("token");
  try {
    const res = await axios({
      method: "PUT",
      url: ApiConfig[endPoint],
      data: body,
      headers: {
        token: token,
      },
    });
    if (res.data?.ResponseCode == 200) {
      return res.data;
    } else {
      toast.error(res.data?.ResponseMessage || "Something went wrong");
      return null;
    }
  } catch (error) {
    toast.error(
      error?.response?.data?.ResponseMessage || "Something went wrong"
    );
    return null;
  }
};

export const deleteApiHandlerWithToken = async (endPoint, body) => {
  const token = sessionStorage.getItem("token");
  try {
    const res = await axios({
      method: "DELETE",
      url: ApiConfig[endPoint],
      data: body,
      headers: {
        token: token,
      },
    });
    if (res.data?.ResponseCode == 200) {
      return res.data;
    } else {
      toast.error(res.data?.ResponseMessage || "Something went wrong");
      return null;
    }
  } catch (error) {
    toast.error(
      error?.response?.data?.ResponseMessage || "Something went wrong"
    );
    return null;
  }
};
