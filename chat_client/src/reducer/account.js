import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// fetch implemetation

const fetchLogin = async (id, password) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      password,
    }),
  };

  let reply = await fetch("api/passport", options);
  //let reply = await fetch("api/login", options);
  let json = await reply.json();

  if (json.status === "success") {
    return { result: true, displayName: json.payload.id };
  } else {
    return { result: false, message: json.message };
  }
};

const fetchCreateAccount = async (id, name, password) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      name,
      password,
    }),
  };

  let reply = await fetch("/api/account/", options);
  let json = await reply.json();

  if (json.status === "success") {
    return [true];
  } else {
    return [false, json.message];
  }
};

// slicer async call

export const asyncLogin = createAsyncThunk(
  "account/login",
  async ({ id, password }) => {
    return await fetchLogin(id, password);
  }
);

export const asyncCreateAccount = createAsyncThunk(
  "account/create",
  async ({ id, name, password }, onReject) => {
    const [result, message] = await fetchCreateAccount(id, name, password);
    if (result) {
      return true;
    } else {
      return onReject(message);
    }
  }
);

const initialAccountState = {
  profileImage: "https://freesvg.org/img/PixelCharacter.png",
  name: "default name",
  status: "logout",
};

export const accountSlice = createSlice({
  name: "account",
  initialState: initialAccountState,
  reducers: {},
  extraReducers: {
    [asyncLogin.pedding]: (state) => {
      state.status = "pedding";
    },
    [asyncLogin.fulfilled]: (state, action) => {
      const { result, displayName } = action.payload;

      if (result) {
        state.status = "idle";
        state.name = displayName;
      } else {
        state.status = "fail";
      }

      console.log(`accountSlice asyncLogin.fulfilled ${JSON.stringify(state)}`);
    },
    [asyncLogin.rejected]: (state) => {
      state.status = "fetchLogin.reject";
    },
    [asyncCreateAccount.pedding]: (state) => {
      state.status = "pedding";
    },
    [asyncCreateAccount.fulfilled]: (state) => {
      state.status = "idle";
    },
    [asyncCreateAccount.rejected]: (state, action) => {
      state.status = "fetchCreate.reject";
      state.error = action.payload;
    },
  },
});

// exporsed API
// 앞쪽 dispatch 와 함수의 인자에 해당하는 오브젝트 구분이 필요하다.
// dispatch 를 효과적으로 전달 받을 수 있는 방법이란?

export const login = async (dispatch, { id, password }) => {
  const account_data = {
    id,
    password,
  };

  let fetchResult = await dispatch(asyncLogin(account_data)).unwrap();

  return fetchResult;
};

export const createAccount = async (dispatch, { id, name, password }) => {
  const account_data = {
    id,
    name,
    password,
  };

  let fetchResult = await dispatch(
    asyncCreateAccount(account_data, (message) => {
      console.log("fetchResult fail");
      console.log(message);
    })
  ).unwrap();

  return fetchResult;
};

export default accountSlice.reducer;
