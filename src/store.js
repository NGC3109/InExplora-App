import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
import categoryReducer from './reducers/category/categoryReducers';
import initSocketReducer from './reducers/sockets/initSocketReducer';
import chatReducer from './reducers/chatReducer/chatReducer';

// Configuración de persistencia para el reductor de chat
const chatPersistConfig = {
  key: 'chat',
  storage: AsyncStorage,
};

// Combinamos los reductores, aplicando persistencia al reductor de chat
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
  categoryReducer: categoryReducer,
  initSocketReducer: initSocketReducer,
  chatReducer: persistReducer(chatPersistConfig, chatReducer), // Aplicar persistencia al chatReducer
});

// Configuramos el persistReducer general
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['chatReducer'], // Añade aquí otros reductores si deseas persistir más datos
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Creamos el almacenamiento (store) y aplicamos middleware (thunk en este caso) y herramientas de desarrollo
const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));

// Creamos el persistor
const persistor = persistStore(store);

export { store, persistor };
