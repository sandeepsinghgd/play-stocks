// import { createStore, compose, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import rootReducer from '../redux/reducers';

// const composeEnhancers = (typeof window !== 'undefined' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

// // !There must be only one store per application
// export default function configureStore(initialState?: { [x: string]: any; } | undefined) {
//     return createStore(
//         rootReducer,
//         initialState,
//         composeEnhancers(applyMiddleware(thunk))
//     );
// }

import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../redux/reducers";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "../utils/storeInLocalStorage";

const composeEnhancers =
  (typeof window !== "undefined" &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
const persistedStore = loadFromLocalStorage();

const store = createStore(
  rootReducer,
  persistedStore,
  composeEnhancers(applyMiddleware(thunk))
);

store.subscribe(() => {
  saveToLocalStorage(store.getState());
});

export default store;
