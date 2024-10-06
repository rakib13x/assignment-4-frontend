// src/redux/store.ts

import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import { productsApi } from "./features/Products/productsApi";
import cartReducer from "./reducer/cartReducer";
import checkoutReducer from "./reducer/checkoutReducer";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("cart");
    if (serializedState === null) {
      return undefined;
    }
    // Parse the cart items array and wrap it inside the cart object
    const cartItems = JSON.parse(serializedState);
    return { cart: { items: cartItems } };
  } catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    if (state.cart.items.length === 0) {
      localStorage.removeItem("cart");
    } else {
      const serializedState = JSON.stringify(state.cart.items);
      localStorage.setItem("cart", serializedState);
    }
  } catch {
    // Ignore write errors
  }
};

const persistedState = loadState();

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    checkout: checkoutReducer,
    [baseApi.reducerPath]: baseApi.reducer,
    // [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/PURGE",
          "persist/REGISTER",
        ],
      },
    }).concat(baseApi.middleware, productsApi.middleware),
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveState(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
