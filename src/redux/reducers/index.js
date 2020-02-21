import {
    FETCH_TODOS_BEGIN,
    FETCH_TODOS_SUCCESS,
    FETCH_TODOS_FAILURE,
    CREATE_TODO,
    DELETE_TODO,
    UPDATE_TODO
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
        case FETCH_TODOS_BEGIN:
            return {
                ...prevState,
                fetchInProgress: true,
                err: null
            };
        case FETCH_TODOS_SUCCESS:
            return {
                fetchInProgress: false,
                err: null,
                todos: keyBy(action.todos, 'id')
            };
        case FETCH_TODOS_FAILURE:
            return {
                fetchInProgress: false,
                err: action.err,
                todos: {},
            };
        case CREATE_TODO:
            return {
                ...prevState,
                todos: {
                    ...prevState.todos,
                    [action.todo.id]: action.todo
                }
            };

        default:
            return prevState;
    }
}
