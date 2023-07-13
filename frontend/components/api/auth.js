import client from "./client";

export const register = async (user) => {
  try {
    const { data } = await client.post("/register", user);
    return data;
  } catch (err) {
    const { response } = err;
    if (response?.data) {
      return response.data;
    }
    return { error: err.message || err };
  }
};

export const login = async (user) => {
  try {
    const { data } = await client.post("/login", user);
    return data;
  } catch (err) {
    const { response } = err;
    if (response?.data) {
      return response.data;
    }
    return { error: err.message || err };
  }
};

export const reset = async (email) => {
  try {
    const { data } = await client.post("/login/reset", email);
    return data;
  } catch (err) {
    const { response } = err;
    if (response?.data) {
      return response.data;
    }
    return { error: err.message || err };
  }
};

export const checkCode = async (email, code, password, password2) => {
  try {
    const { data } = await client.post(
      "/login/reset/code",
      email,
      code,
      password,
      password2
    );
    return data;
  } catch (err) {
    const { response } = err;
    if (response?.data) {
      return response.data;
    }
    return { error: err.message || err };
  }
};

export const checkToken = async (token) => {
  try {
    const { data } = await client.post("/", token);
    return data;
  } catch (err) {
    const { response } = err;
    if (response?.data) {
      return response.data;
    }
    return { error: err.message || err };
  }
};

export const changePassword = async (user) => {
  try {
    const { data } = await client.post("/changePassword", user);
    return data;
  } catch (err) {
    const { response } = err;
    if (response?.data) {
      return response.data;
    }
    return { error: err.message || err };
  }
};

export const signOut = async (username) => {
  try {
    const { data } = await client.post("/signout", { username });
    return data;
  } catch (err) {
    const { response } = err;
    if (response?.data) {
      return response.data;
    }
    return { error: err.message || err };
  }
};

export const deleteUser = async (username) => {
  try {
    const { data } = await client.post("/deleteUser", { username });
    return data;
  } catch (err) {
    const { response } = err;
    if (response?.data) {
      return response.data;
    }
    return { error: err.message || err };
  }
};
