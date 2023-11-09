import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Review {
  id: number;
  starts: number;
  content: string;
  user: { id: number; username: string };
}

interface ReviewState {
  reviews: Review[];
  loading: boolean;
  error: string | null;
}

const initialState: ReviewState = {
  reviews: [],
  loading: false,
  error: null,
};

const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    fetchCommentsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCommentsSuccess: (state, action: PayloadAction<Review[]>) => {
      state.loading = false;
      state.reviews = action.payload;
    },
    fetchCommentsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    addComment: (state, action: PayloadAction<Review>) => {
      state.reviews.push(action.payload);
    },
    deleteComment: (state, action: PayloadAction<number>) => {
      state.reviews = state.reviews.filter(
        (comment) => comment.id !== action.payload
      );
    },
  },
});

export const {
  fetchCommentsStart,
  fetchCommentsSuccess,
  fetchCommentsFailure,
  addComment,
  deleteComment,
} = reviewSlice.actions;

export default reviewSlice.reducer;
