import * as React from "react";
import * as ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import configureStore from "./store";

import Main from "./component/main";

const mountNode = document.getElementById('root');

const store = configureStore();

const Root = () => (
  <Provider store={store}>
    <Main />
  </Provider>
)

ReactDOM.render(<Root />, mountNode);