import logo from './logo.svg';
import './App.css';

import bat from './Component/bat';

import {Provider} from 'react-redux'

import store from './Component/store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
      <bat/>

      </Provider>

      <h1>hello</h1>
    </div>
  );
}

export default App;