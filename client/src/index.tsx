import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { LocalizeProvider } from 'react-localize-redux';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from "redux-saga";
import App from './App';
import rootReducer from './reducers';
import registerServiceWorker from './registerServiceWorker';
import rootSaga from "./sagas";

/**
 * history
 */
const history = createBrowserHistory();

/**
 * saga middleware
 */
const sagaMiddleware = createSagaMiddleware();

/**
 * redux dev tool connection
 */
const composeEnhancer: typeof compose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/**
 * store
 */
const store = createStore(
  connectRouter(history)(rootReducer),
  composeEnhancer(
    applyMiddleware(
      routerMiddleware(history),
      sagaMiddleware
    )
  )
);

/**
 * then run the saga
 */
sagaMiddleware.run(rootSaga);

class Main extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      store
    };
  }

  public render() {
    return (
      <Provider store={store}>
        <LocalizeProvider store={this.state.store}>
          <App history={history} />
        </LocalizeProvider>
      </Provider>
    );
  }
}

ReactDOM.render(
  <Main/>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
