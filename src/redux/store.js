import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { todos } from "./reducers/index";

const rootReducer = combineReducers({
    todos
});

const logger = createLogger({});
const middlewareConfig = applyMiddleware(thunk, logger);
const store = createStore(rootReducer, middlewareConfig);

window.store = store;

export default store;