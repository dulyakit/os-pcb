import './App.css';
import Controller from './controller'
import store from './controller/storeController'
import { Provider } from 'react-redux'

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Controller />
      </div>
    </Provider>
  );
}

export default App;
