import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  count: 0,
};

const likeSlice = createSlice({
  name: 'likeSlice',
  initialState,
  reducers: {
    addLike: state => {
      state.count += 1;
    },

    removeLike: state => {
      state.count -= 1;
    },
  },
});

// 액션들 내보내기
export const { addLike, removeLike } = likeSlice.actions;

// 보통 Slice 는 default 로 내보냄
export default likeSlice.reducer;
