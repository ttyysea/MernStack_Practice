import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Redux
import { Provider } from 'react-redux';
import { legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../component/reducers/index.js';

// Route
import { BrowserRouter } from 'react-router-dom';

const store = createStore(rootReducer, composeWithDevTools());


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
  // </React.StrictMode>,
  );
