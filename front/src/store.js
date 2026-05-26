import { configureStore, createSlice } from "@reduxjs/toolkit";

/* ────────────────────────────────────────
   user slice
   - authChecked: false → refresh 완료 전까지 렌더링 보류 (Shoppy 패턴)
   - AccessToken은 메모리(Redux)에만 저장 (localStorage 제거)
──────────────────────────────────────── */
let user = createSlice({
  name: "user",
  initialState: {
    uid:          null,
    userId:       "",
    accessToken:  "",
    isLoggedIn:   false,
    authChecked:  false,   // ← 새로고침 시 깜빡임 방지
    wishCount:    0,
  },
  reducers: {
    setUser(state, action) {
      state.uid         = action.payload.uid;
      state.userId      = action.payload.userId;
      state.accessToken = action.payload.accessToken;
      state.isLoggedIn  = true;
      state.authChecked = true;
    },
    setWishCount(state, action) {
      state.wishCount = action.payload;
    },
    logout(state) {
      state.uid         = null;
      state.userId      = "";
      state.accessToken = "";
      state.isLoggedIn  = false;
      state.authChecked = true;
      state.wishCount   = 0;
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
