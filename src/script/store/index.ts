import { createStore, combineReducers } from "redux";

import { discReducer, roleReducer, playReducer, volumeReducer } from "./reducers";

const rootReducer = combineReducers({ disc: discReducer, role: roleReducer, play: playReducer, volume:volumeReducer });

export type MainState = ReturnType<typeof rootReducer>;

export default function configureStore() {

  const store = createStore(
    rootReducer
  );

  return store;
}
