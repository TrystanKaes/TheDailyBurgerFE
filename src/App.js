import React from 'react';
import './App.css';
import { Provider } from 'react-redux'
import FrontPage from './features/frontPage'
import store from './stores/store'

function App() {
  return (
      <div>
        <Provider store={store}>
          <FrontPage />
        </Provider>
      </div>
  );
}


export default App;
