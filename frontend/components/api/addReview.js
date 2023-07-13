import client from "./client";

export const add = async (review) => {
  try {
    const { data } = await client.post("/addReview", review);
    return data;
  } catch (err) {
    const { response } = err;
    if (response?.data) {
      return response.data;
    }
    return { error: err.message || err };
  }
};

export const edit = async (review) => {
  try {
    const { data } = await client.post("/editReview", review);
    return data;
  } catch (err) {
    const { response } = err;
    if (response?.data) {
      return response.data;
    }
    return { error: err.message || err };
  }
};

export const deleteReview = async (id) => {
  try {
    const { data } = await client.post("/deleteReview", { id });
    return data;
  } catch (err) {
    const { response } = err;
    if (response?.data) {
      return response.data;
    }
    return { error: err.message || err };
  }
};

export const searchReviews = async (search) => {
  try {
    const { data } = await client.post("/searchReviews", search);
    return data;
  } catch (err) {
    const { response } = err;
    if (response?.data) {
      return response.data;
    }
    return { error: err.message || err };
  }
};
