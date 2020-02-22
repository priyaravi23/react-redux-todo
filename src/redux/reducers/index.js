import {
  FETCH_TODOS,
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_FAILURE
} from "../action-types";

import keyBy from 'lodash/keyBy';

const DEFAULT_TODOS_STATE = {
  todos: {},
  fetchInProgress: false,
  err: null
};

/**
 * @function todos
 * @desc Reducer: Given an initial state and an action object,
 *   it should generate a new state object based on
 *   the action, or return the existing state.
 * */

export function todos(prevState = DEFAULT_TODOS_STATE, action) {
  switch (action.type) {
    case FETCH_TODOS:
      return {
        ...prevState,
        fetchInProgress: true,
        err: null
      };
    case FETCH_TODOS_SUCCESS:
      return {
        fetchInProgress: false,
        err: null,
        todos: keyBy(action.data, 'id')
      };
    case FETCH_TODOS_FAILURE:
      return {
        fetchInProgress: false,
        err: action.err,
        todos: {},
      };

    default:
      return prevState;
  }
}
