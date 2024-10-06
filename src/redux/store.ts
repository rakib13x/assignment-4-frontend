//@ts-nocheck

import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import { productsApi } from "./features/Products/productsApi";
import cartReducer from "./reducer/cartReducer";
import checkoutReducer from "./reducer/checkoutReducer";

// Load cart items from local storage
const loadState = (): { cart: { items: any[] } } | undefined => {
  try {
    const serializedState = localStorage.getItem("cart");
    if (serializedState === null) {
      return undefined;
    }
    const cartItems = JSON.parse(serializedState);
    return { cart: { items: cartItems } };
  } catch (err) {
    return undefined;
  }
};

// Save cart items to local storage
const saveState = (state: { cart: any; checkout?: any }) => {
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

// Configure the Redux store
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    checkout: checkoutReducer,
    [baseApi.reducerPath]: baseApi.reducer, // Mounting baseApi reducer
    [productsApi.reducerPath]: productsApi.reducer, // Mounting productsApi reducer
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/PURGE",
          "persist/REGISTER",
        ],
      },
    }),
    baseApi.middleware as any, // Use `as any` to bypass type checking for middleware
    productsApi.middleware as any, // Use `as any` to bypass type checking for middleware
  ],
  preloadedState: persistedState,
});

// Persist cart data to local storage
store.subscribe(() => {
  saveState(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
