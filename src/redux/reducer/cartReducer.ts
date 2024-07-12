// actions/cartActions.js
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

// reducers/cartReducer.js
const initialState = {
  items: [], // { _id, name, price, quantity, stock }
};

function cartReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      const itemInCart = state.items.find(
        (item) => item._id === action.payload.product._id
      );

      if (itemInCart) {
        // If the item is already in the cart, update its quantity
        return {
          ...state,
          items: state.items.map((item) =>
            item._id === action.payload.product._id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
      } else {
        // If the item is not in the cart, add it to the cart
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

    default:
      return state;
  }
}

export default cartReducer;
