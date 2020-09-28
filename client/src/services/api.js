import request from "superagent";
import { getAuthHeader } from "./auth";
import { toast } from "react-toastify";

async function post(url, params = {}) {
  try {
    const res = await request.post(url).send(params).set(getAuthHeader());

    return res.body;
  } catch (err) {
    if (err.status === 401) {
      window.location.href = "/login";
    } else {
      if (err.response) {
        toast.error(err.response.body);
      } else {
        toast.error(JSON.stringify(err));
      }
    }
    throw new Error();
  }
}

async function get(url, params) {
  try {
    const res = await request.get(url).query(params).set(getAuthHeader());

    return res.body;
  } catch (err) {
    if (err.status === 401) {
      window.location.href = "/login";
    } else {
      if (err.response) {
        toast.error(err.response.body);
      } else {
        toast.error(JSON.stringify(err));
      }
    }
    throw new Error();
  }
}

async function patch(url, params) {
  try {
    const res = await request.patch(url).send(params).set(getAuthHeader());

    return res.body;
  } catch (err) {
    if (err.status === 401) {
      window.location.href = "/login";
    } else {
      if (err.response) {
        toast.error(err.response.body);
      } else {
        toast.error(JSON.stringify(err));
      }
    }
    throw new Error();
  }
}

async function del(url, params) {
  try {
    await request.del(url).set(getAuthHeader()).send(params);
  } catch (err) {
    if (err.status === 401) {
      window.location.href = "/login";
    } else {
      if (err.response) {
        toast.error(err.response.body);
      } else {
        toast.error(JSON.stringify(err));
      }
    }
    throw new Error();
  }
}

export { post, get, patch, del };
