import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import userReducer from './reducers/users/userReducer';
import groupReducer from './reducers/groups/groupReducer';
import socketReducer from './reducers/sockets/socketReducer';
import bookmarkReducer from './reducers/bookmark/bookmarkReducer';

// Combinamos los reductores si tienes más de uno
const rootReducer = combineReducers({
  userReducer: userReducer,
  groupReducer: groupReducer,
  socketReducer: socketReducer,
  bookmarkReducer: bookmarkReducer,
});

// Creamos el almacenamiento (store) y aplicamos middleware (thunk en este caso) y herramientas de desarrollo
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
