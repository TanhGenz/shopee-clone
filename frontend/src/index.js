import React from 'react';
import { createRoot } from 'react-dom/client'; 
import App from './App';
import { Provider } from "react-redux";
import { store, persistor } from './redux/store'; 
import {PersistGate} from "redux-persist/integration/react" 
// import store from './redux/store';

// Chọn DOM node root
const rootElement = document.getElementById('root');

// Tạo root
const root = createRoot(rootElement);

// Render ứng dụng
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);