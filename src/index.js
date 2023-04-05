import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {createStore} from 'redux';
import CounterReducer from './Store/Reducer/Reducers/Counter.reducer';
import { Provider } from 'react-redux';




const store = createStore(CounterReducer)
//创建这个store   将reducer这个对象传入createStore方法  





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <Provider store={store}><App /></Provider> 
  </React.StrictMode>
);

