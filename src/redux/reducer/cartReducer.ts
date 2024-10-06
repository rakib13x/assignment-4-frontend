export const addToCart = (product, quantity) => ({
  type: "ADD_TO_CART",
  payload: { product, quantity },
});

export const removeFromCart = (productId) => ({
  type: "REMOVE_FROM_CART",
  payload: productId,
});

export const updateQuantity = (productId, quantity) => ({
  type: "UPDATE_QUANTITY",
  payload: { productId, quantity },
});
export const clearCart = () => ({
  type: "CLEAR_CART",
});

const initialState = {
  items: [],
};

function cartReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      const itemInCart = state.items.find(
        (item) => String(item._id) === String(action.payload.product._id)
      );
      if (itemInCart) {
        return {
          ...state,
          items: state.items.map((item) =>
            item._id === action.payload.product._id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
      } else {
        return {
          ...state,
          items: [
            ...state.items,
            { ...action.payload.product, quantity: action.payload.quantity },
          ],
        };
      }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter((item) => item._id !== action.payload),
      };

    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) =>
          item._id === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    case "CLEAR_CART":
      return {
        ...state,
        items: [],
      };

    default:
      return state;
  }
}

export default cartReducer;
