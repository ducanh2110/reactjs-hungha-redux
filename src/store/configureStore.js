import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers";
import logger from "redux-logger";
import api from "../middleware/api";
import DevTools from "../containers/DevTools";

const configureStore = initialState => {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(api, logger),
      DevTools.instrument()
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("../reducers", () => {
      store.replaceReducer(rootReducer);
    });
  }
  return store;
};

export default configureStore;
