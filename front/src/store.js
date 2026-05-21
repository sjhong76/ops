import { configureStore, createSlice } from "@reduxjs/toolkit";

/* ────────────────────────────────────────
   user slice
   - localStorage에서 초기값 복원 (새로고침 후에도 로그인 유지)
──────────────────────────────────────── */
const savedUser = {
  userId:      localStorage.getItem("userId")      || "",
  accessToken: localStorage.getItem("accessToken") || "",
  isLoggedIn:  !!localStorage.getItem("accessToken"),
};

let user = createSlice({
  name: "user",
  initialState: savedUser,
  reducers: {
    setUser(state, action) {
      state.userId      = action.payload.userId;
      state.accessToken = action.payload.accessToken;
      state.isLoggedIn  = true;
      // localStorage에도 저장
      localStorage.setItem("userId",      action.payload.userId);
      localStorage.setItem("accessToken", action.payload.accessToken);
    },
    logout(state) {
      state.userId      = "";
      state.accessToken = "";
      state.isLoggedIn  = false;
      localStorage.removeItem("userId");
      localStorage.removeItem("accessToken");
    },
  },
});

export let { setUser, logout } = user.actions;

/* ────────────────────────────────────────
   cart slice
──────────────────────────────────────── */
let cart = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addCount(state, action) {
      const item = state.find((a) => a.id === action.payload);
      if (item) item.count++;
    },
    decreaseCount(state, action) {
      const item = state.find((a) => a.id === action.payload);
      if (!item) return;
      if (item.count > 1) item.count--;
      else alert("최소 주문수량은 1개 입니다.");
    },
    addItem(state, action) {
      const existing = state.find((a) => a.id === action.payload.id);
      if (existing) existing.count += action.payload.count;
      else state.push(action.payload);
    },
    deleteItem(state, action) {
      const idx = state.findIndex((a) => a.id === action.payload);
      if (idx !== -1) state.splice(idx, 1);
    },
    clearCart() { return []; },
    sortName(state) {
      state.sort((a, b) => (a.name > b.name ? 1 : -1));
    },
  },
});

export const { addCount, decreaseCount, addItem, deleteItem, clearCart, sortName } = cart.actions;

export default configureStore({
  reducer: {
    user: user.reducer,
    cart: cart.reducer,
  },
});
