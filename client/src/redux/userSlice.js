import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
  isLoading: false,
  user: null,
  error: null
}

export const register = createAsyncThunk(
  "auth/register",
  async (userCredentials) => {
      const request = await axios.post('http://localhost:3000/api/auth/register', userCredentials)
      const response = await request.data
      localStorage.setItem('token', response.token)
      localStorage.setItem('username', response.username)
      return response;
  }
)

export const login = createAsyncThunk(
  "auth/login",
  async (userCredentials) => {
      const request = await axios.post('http://localhost:3000/api/auth/login', userCredentials)
      const response = await request.data
      localStorage.setItem('token', response.token)
      localStorage.setItem('username', response.username)
      return response;
  }
)


export const logout = createAsyncThunk(
  "auth/logout", async () => {
    localStorage.removeItem("token")
  }
)

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.user = null
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        console.log(action.error.message);
        if(action.error.message === 'Request failed with status code 400') {
          state.error = 'Access Denied ! Invalid Credentials'
        }else {
          state.error = action.error.message
        }
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.user = null
        state.error = null
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        console.log(action.error.message);
        if(action.error.message === 'Request failed with status code 400') {
          state.error = 'Access Denied ! Invalid Credentials'
        }else {
          state.error = action.error.message
        }
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.currentUser = null;
      });
  },
});

export default userSlice.reducer;