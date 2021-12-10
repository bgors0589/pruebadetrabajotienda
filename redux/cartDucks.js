import Data from "./data/data.json";

const libros = Data.libros;
const laptos = Data.laptos;
const accesorios = Data.accesorios;
const ropa = Data.ropa;
const celulares = Data.celulares;

const products = libros.concat(laptos, accesorios, ropa, celulares);
// console.log(products);

// constantes
const initialState = {
	cart: [],
};

// types
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_ONE_FROM_CART = "REMOVE_ONE_FROM_CART";
const REMOVE_ALL_FROM_CART = "REMOVE_ALL_FROM_CART";
const CLEAR_CART = "CLEAR_CART";

// reducer
export default function shoppingReducer(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case ADD_TO_CART: {
			let newItem = products.find((product) => product.id === action.payload);
			//console.log(newItem);

			let itemInCart = state.cart.find((item) => item.id === newItem.id);

			return itemInCart
				? {
						...state,
						cart: state.cart.map((item) =>
							item.id === newItem.id
								? { ...item, quantity: item.quantity + 1 }
								: item
						),
				  }
				: {
						...state,
						cart: [...state.cart, { ...newItem, quantity: 1 }],
				  };
		}
		case REMOVE_ONE_FROM_CART: {
			let itemToDelete = state.cart.find((item) => item.id === action.payload);

			return itemToDelete.quantity > 1
				? {
						...state,
						cart: state.cart.map((item) =>
							item.id === action.payload
								? { ...item, quantity: item.quantity - 1 }
								: item
						),
				  }
				: {
						...state,
						cart: state.cart.filter((item) => item.id !== action.payload),
				  };
		}
		case REMOVE_ALL_FROM_CART: {
			return {
				...state,
				cart: state.cart.filter((item) => item.id !== action.payload),
			};
		}
		case CLEAR_CART:
			return initialState;
		default:
			return state;
	}
}

// actions
export const addToCartAction = (id) => async (dispatch) => {
	dispatch({
		type: ADD_TO_CART,
		payload: id,
	});
};

export const delFromCartAction =
	(id, all = false) =>
	async (dispatch) => {
		if (all) {
			dispatch({ type: REMOVE_ALL_FROM_CART, payload: id });
		} else {
			dispatch({ type: REMOVE_ONE_FROM_CART, payload: id });
		}
	};

export const clearCartAction = () => async (dispatch) => {
	dispatch({ type: CLEAR_CART });
};
