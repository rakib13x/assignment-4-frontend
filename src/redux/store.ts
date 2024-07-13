import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import cartReducer from "./reducer/cartReducer";
import checkoutReducer from "./reducer/checkoutReducer";

// Function to load the state from local storage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("cart");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

// Function to save the state to local storage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("cart", serializedState);
  } catch {
    // Ignore write errors
  }
};

// Load the persisted state
const persistedState = loadState();

// Configure the store
export const store = configureStore({
  reducer: {
    cart: cartReducer, // Spread your existing reducers
    checkout: checkoutReducer,
    [baseApi.reducerPath]: baseApi.reducer, // API reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
  preloadedState: persistedState, // Load persisted state
});

// Subscribe to store changes to save to local storage
store.subscribe(() => {
  saveState({
    cart: store.getState().cart, // Only persist the cart part of the state
  });
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
