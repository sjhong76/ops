import { configureStore, createSlice } from "@reduxjs/toolkit";

/* ────────────────────────────────────────
   user slice - localStorage에서 초기값 복원
──────────────────────────────────────── */
const savedUser = {
  uid:         Number(localStorage.getItem("uid"))      || null,
  userId:      localStorage.getItem("userId")           || "",
  accessToken: localStorage.getItem("accessToken")      || "",
  isLoggedIn:  !!localStorage.getItem("accessToken"),
  wishCount:   Number(localStorage.getItem("wishCount")) || 0,
};

let user = createSlice({
  name: "user",
  initialState: savedUser,
  reducers: {
    setUser(state, action) {
      state.uid         = action.payload.uid;
      state.userId      = action.payload.userId;
      state.accessToken = action.payload.accessToken;
      state.isLoggedIn  = true;
      state.wishCount  = 0;
      localStorage.setItem("uid",         action.payload.uid);
      localStorage.setItem("userId",      action.payload.userId);
      localStorage.setItem("accessToken", action.payload.accessToken);
    },
    setWishCount(state, action) {
      state.wishCount = action.payload;
      localStorage.setItem("wishCount", action.payload);
    },
    logout(state) {
      state.uid         = null;
      state.userId      = "";
      state.accessToken = "";
      state.isLoggedIn  = false;
      state.wishCount  = 0;
      localStorage.removeItem("uid");
      localStorage.removeItem("userId");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("wishCount");
    },
  },
});

export let { setUser, logout, setWishCount } = user.actions;

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
