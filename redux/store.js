import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";
// import persistState from "redux-localstorage";

import AuthReducer from "./authDucks";

const rootReducer = combineReducers({
	auth: AuthReducer,
});

let mainEnhancer = compose(
	// persistState("token", "events"),
	// composeWithDevTools(
	applyMiddleware(thunk)
	// )
);

export default function generateStore() {
	const store = createStore(rootReducer, {}, mainEnhancer);
	return store;
}
