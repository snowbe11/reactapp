import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

const tryLogin = async ({ id, password }) => {
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

  let reply = await fetch("api/login", options);
  let json = await reply.json();

  if (json.status === "success") {
    return [true, json.payload];
  } else {
    return [false, ""];
  }
};

export const fetchLogin = createAsyncThunk(
  "account/login",
  async ({ id, password }) => {
    return await tryLogin(id, password);
  }
);

const tryCreate = async ({ id, name, password }) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      name: name,
      password: password,
    }),
  };

  console.log(options);

  let reply = await fetch("api/create", options);
  let json = await reply.json();

  if (json.status === "success") {
    return [true, ""];
  } else {
    return [false, json.payload];
  }
};

export const fetchCreate = createAsyncThunk(
  "account/create",
  async ({ id, name, password }, { onReject }) => {
    const [result, message] = await tryCreate({ id, name, password });
    if (result) {
      return true;
    } else {
      return onReject(message);
    }
  }
);

const initialLoginContext = {
  profileImage: "https://freesvg.org/img/PixelCharacter.png",
  name: "default name",
};

export const accountSlice = createSlice({
  name: "account",
  initialState: initialLoginContext,
  reducers: {},
  extraReducers: {
    [fetchLogin.pedding]: (state) => {
      state.status = "pedding";
      state.error = null;
    },
    [fetchLogin.fulfilled]: (state, action) => {
      const [success, data] = action.payload;
      if (success) {
        state.status = "idle";
        state.name = data;
      } else {
        state.status = "fail";
        state.name = data;
      }
    },
    [fetchLogin.rejected]: (state, action) => {
      state.status = "fetchLogin.reject";
      state.error = action.payload;
    },
    [fetchCreate.pedding]: (state) => {
      state.status = "pedding";
      state.error = null;
    },
    [fetchCreate.fulfilled]: (state, action) => {
      const [success, data] = action.payload;
      if (success) {
        state.status = "idle";
        state.name = data;
      } else {
        state.status = "fail";
        state.name = data;
      }
    },
    [fetchCreate.rejected]: (state, action) => {
      state.status = "fetchCreate.reject";
      state.error = action.payload;
    },
  },
});

export default accountSlice.reducer;

export const store = configureStore({
  reducer: {
    account: accountSlice.reducer,
  },
});
