import * as React from 'react';
import { Provider } from 'react-redux'; // Importa Provider
import store from './src/store'; // Importa tu store
import Menu from './src/components/Menu';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.safeArea}>
          <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
          <Menu />
      </SafeAreaView>
    </Provider>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
})

export default App;
