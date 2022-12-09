import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  // initialState,
  // reducers: {
  //   addItem: (state, action) => {
  //     const newItem = action.payload;
  //     const existingItem = state.cartItems.find(
  //       (item) => item.id === newItem.id
  //     );

  //     state.totalQuantity++;

  //     if (!existingItem) {
  //       // state.cartItems.push({
  //       //   id: newItem.id,
  //       //   productName: newItem.productName,
  //       //   imgUrl: newItem.imgUrl,
  //       //   price: newItem.price,
  //       //   quantity: 1,
  //       //   totalPrice: newItem.price,
  //       // });
  //       state.cartItems.push(newItem);
  //     } else {
  //       existingItem._quantity++;
  //       existingItem.totalPrice =
  //         Number(existingItem.totalPrice) + Number(newItem.price);
  //     }

  //     state.totalAmount = state.cartItems.reduce(
  //       (total, item) => total + Number(item.price) * Number(item._quantity),
  //       0
  //     );
  //   },

  //   deleteItem: (state, action) => {
  //     const id = action.payload;
  //     const existingItem = state.cartItems.find((item) => item.id === id);

  //     if (existingItem) {
  //       state.cartItems = state.cartItems.filter((item) => item.id !== id);
  //       state.totalQuantity = state.totalQuantity - existingItem._quantity;
  //     }

  //     state.totalAmount = state.cartItems.reduce(
  //       (total, item) => total + Number(item.price) * Number(item._quantity),
  //       0
  //     );
  //   },
  // },
  initialState: {
    cart: JSON.parse(localStorage.getItem("_cart_")) || { items: [] },
  },
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload ? action.payload : { items: [] };
      localStorage.setItem(
        "_cart_",
        JSON.stringify(state.cart || { items: [] })
      );
    },
    addToCart: (state, action) => {
      if (!state.cart) {
        state.cart = {
          items: [],
        };
      }
      const index = state.cart.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index === -1) {
        state.cart.items = [action.payload, ...state.cart.items];
      } else {
        state.cart.items[index].quantity = action.payload.quantity;
      }

      localStorage.setItem("_cart_", JSON.stringify(state.cart));
    },
    updateCartItem: (state, action) => {
      const index = state.cart.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.cart.items[index].quantity = action.payload.quantity;
      }
      localStorage.setItem("_cart_", JSON.stringify(state.cart));
    },
    deleteCartItem: (state, action) => {
      state.cart.items = state.cart.items.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem("_cart_", JSON.stringify(state.cart));
    },
  },
});

export const cartSelector = (state) => state.cart;
export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
