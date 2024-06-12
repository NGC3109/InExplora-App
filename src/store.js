import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import userReducer from './reducers/users/userReducer';
import groupReducer from './reducers/groups/groupReducer';
import socketReducer from './reducers/sockets/socketReducer';
import bookmarkReducer from './reducers/bookmark/bookmarkReducer';
import accomodationsReducer from './reducers/accomodations/accomodationsReducer';
import transportsReducer from './reducers/transports/transportsReducer';
import notificationsReducer from './reducers/notifications/notificationsReducer';
import requestReducer from './reducers/request/requestReducer';
import userPublicReducer from './reducers/userPublic/userPublicReducer';
import destinationsReducer from './reducers/destinations/destinationsReducer';
import commentsReducers from './reducers/comments/commentsReducers';
import dashboardReducer from './reducers/dashboard/dashboardReducers';
import searchReducer from './reducers/search/searchReducers';

// Combinamos los reductores si tienes más de uno
const rootReducer = combineReducers({
  userReducer: userReducer,
  groupReducer: groupReducer,
  socketReducer: socketReducer,
  bookmarkReducer: bookmarkReducer,
  accomodationsReducer: accomodationsReducer,
  transportsReducer: transportsReducer,
  notificationsReducer: notificationsReducer,
  requestReducer: requestReducer,
  userPublicReducer: userPublicReducer,
  destinationsReducer: destinationsReducer,
  commentsReducers: commentsReducers,
  dashboardReducer: dashboardReducer,
  searchReducer: searchReducer,
});

// Creamos el almacenamiento (store) y aplicamos middleware (thunk en este caso) y herramientas de desarrollo
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
