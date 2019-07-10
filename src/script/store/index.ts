import { createStore, combineReducers } from "redux";

import { listReducer, showReducer, getShowList } from "./reducers";

const showlist = () => ( getShowList() )
const rootReducer = combineReducers({ lists: listReducer, showtype: showReducer, showlists: showlist });

export type MainState = ReturnType<typeof rootReducer>;

export default function configureStore() {

  const store = createStore(
    rootReducer
  );

  return store;
}
