import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, Store as ReduxStore } from 'redux';
import { Provider } from 'react-redux';
import reducer, { State, Action, DispatchType } from 'store';
import './index.css';
import App from './app';
import * as serviceWorker from './serviceWorker';

const store: ReduxStore<State, Action> & {
  dispatch: DispatchType
} = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
