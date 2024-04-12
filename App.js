import * as React from 'react';
import { Provider } from 'react-redux'; // Importa Provider
import store from './src/store'; // Importa tu store
import Menu from './src/components/Menu';
function App() {
  return (
    <Provider store={store}>
      <Menu />
    </Provider>
  );
}

export default App;
