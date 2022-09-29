import './App.css';
import Controller from './controller'
import storeController from './controller/storeController'
import { Provider } from 'react-redux'

function App() {
  return (
    <Provider store={storeController}>
      <div className="App">
        <Controller />
      </div>
    </Provider>
  );
}

export default App;
