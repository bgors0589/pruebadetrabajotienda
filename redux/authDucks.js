// constantes
const initialState = {
	user: null,
};

// types
const LOGGED_IN = "LOGGED_IN";
const SIGN_OUT = "SIGN_OUT";

// reducer
export default function AuthReducer(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case LOGGED_IN:
			return { ...state, user: payload };
		case SIGN_OUT:
			return { ...state, user: null };
		default:
			return state;
	}
}

// actions
export const obtenerUsuarioAction = (user) => async (dispatch) => {
	dispatch({
		type: LOGGED_IN,
		payload: user,
	});
};

export const limpiarUsuarioAction = () => async (dispatch) => {
	dispatch({
		type: SIGN_OUT,
	});
};
