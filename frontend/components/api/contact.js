import client from "./client";

export const sendContactMessage = async (message) => {
  try {
    const { data } = await client.post("/contactUs", message);
    return data;
  } catch (err) {
    const { response } = err;
    if (response?.data) {
      return response.data;
    }
    return { error: err.message || err };
  }
};
