import client from "./client";

export const getUserReviews = async (username) => {
  try {
    const { data } = await client(`/getReviews/${username}`);
    return data;
  } catch (err) {
    const { response } = err;
    if (response?.data) {
      return response.data;
    }
    return { error: err.message || err };
  }
};

export const getReviews = async (username) => {
  try {
    const { data } = await client(`/${username}`);
    return data;
  } catch (err) {
    const { response } = err;
    if (response?.data) {
      return response.data;
    }
    return { error: err.message || err };
  }
};
