import { createStore, combineReducers } from "redux";

import { discReducer, roleReducer, playReducer, volumeReducer, getRoleDisc } from "./reducers";

const roledisc = () => ( getRoleDisc() )
const rootReducer = combineReducers({ disc: discReducer, role: roleReducer, play: playReducer, volume:volumeReducer, roledisc: roledisc });

export type MainState = ReturnType<typeof rootReducer>;

export default function configureStore() {

  const store = createStore(
    rootReducer
  );

  return store;
}
