// // cartActions.js
// import axios from 'axios';
// // Definir los tipos de acciones
// import {
//     ADD_TO_CART_SUCCESS,
//     ADD_TO_CART_ERROR,
//     FETCH_CART_SUCCESS,
//     FETCH_CART_ERROR,
//     REMOVE_FROM_CART_SUCCESS,
//     REMOVE_FROM_CART_ERROR,
// } from './actions'

// // Acción para agregar un producto al carrito
// export const addToCart = (product) => async (dispatch) => {
//   try {
//     const cartItem = {
//       productId: product._id,
//       name: product.name,
//       quantity: product.quantity || 1,
//       price: product.price,
//       thumbnail: product.thumbnail,
//       dimension: product.dimension,
//       color: product.color,
//       category: product.category,
//     };
//     // Realizar una solicitud POST al backend para agregar el producto al carrito
//     const response = await axios.post('http://localhost:3001/api/cart', {
//       item: cartItem,
//     });
//     dispatch({ type: ADD_TO_CART_SUCCESS, payload: response.data });
//     // Aquí podrías mostrar una notificación o mensaje al usuario indicando que el producto se ha agregado al carrito
//   } catch (error) {
//     console.error('Error al agregar el producto al carrito:', error);
//     dispatch({ type: ADD_TO_CART_ERROR, payload: error });
//     // Aquí podrías mostrar una notificación o mensaje de error si ocurre algún problema al agregar el producto
//   }
// };