import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";

const initialState = {
  posts: [],
  post: {},
  loading: false,
  error: null,
};

export const getAllPosts = createAsyncThunk(
  'posts/getAllPosts',
  async () => {
    try {
      const response = await axios.get('/api/posts');
      return response.data;
    } catch (error) {
      throw new Error('Posts not found');
    }
  }
);

export const getHomePosts = createAsyncThunk(
  'posts/getHomePosts',
  async () => {
    try {
      const response = await axios.get('/api/posts/all');
      return response.data;
    } catch (error) {
      throw new Error('Posts not found');
    }
  }
);

export const detailPost = createAsyncThunk(
  'posts/getDetail',
  async (slug) => {
    try {
      const response = await axios.get(`/api/posts/${slug}`);
      return (response.data);
    } catch (error) {
      throw new Error('Post not found');
    }
  }
);

export const createPost = createAsyncThunk(
  'dashboard/create',
  async (post) => {
    try {
      const response = await axios.post("/api/posts/", post, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      return response.data;
    } catch (error) {
      if (error.response) {
        throw Error(error.response.data.error);
      } else {
        throw Error('Network error');
      }
    }
  }
);

export const updatePost = createAsyncThunk(
  'dashboard/update',
  async ({ slug, post }) => {
    try {
      const response = await axios.put(`/api/posts/${slug}`, post, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      return response.data;
    } catch (error) {
      if (error.response) {
        throw Error(error.response.data.error);
      } else {
        throw Error('Network error');
      }
    }
  }
);

export const deletePost = createAsyncThunk(
  'dashboard/delete',
  async (id) => {
    try {
      const response = await axios.delete(`/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.data.success) {
        throw new Error('Post deletion failed!');
      }

      return id;
    } catch (error) {
      if (error.response) {
        throw Error(error.response.data.error);
      } else {
        throw Error('Network error');
      }
    }
  }
);

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getHomePosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getHomePosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(getHomePosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(detailPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(detailPost.fulfilled, (state, action) => {
        state.loading = false;
        state.post = action.payload;
      })
      .addCase(detailPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : 'Server error';
      })
      .addCase(createPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.post = action.payload;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updatePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.loading = false;
        state.post = action.payload;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default postSlice.reducer;
