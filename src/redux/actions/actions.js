import {
    FETCH_TODOS,
    FETCH_TODOS_SUCCESS,
    FETCH_TODOS_FAILURE
} from "../action-types";

import store from '../store';
import { TODOS_URL } from "../../utils/constants";

export const fetchTodosStart = () => {
    return {
        type: FETCH_TODOS
    };
};

export const fetchTodosSuccess = (todos) => {
    return {
        type: FETCH_TODOS_SUCCESS,
        todos
    };
};

export const fetchTodosFailure = (err) => {
    return {
        type: FETCH_TODOS_FAILURE,
        err
    };
};

/**
 * @desc This is a redux action which is written using the Thunk format
 * */

export const fetchTodos = () => {
    return (dispatch) => {
        dispatch(fetchTodosStart());

        fetch(TODOS_URL)
            .then(response => {
                if (response.ok) {
                    response.json().then(data => {
                        dispatch(fetchTodosSuccess(data));
                    });
                } else {
                    dispatch(fetchTodosFailure(response));
                }
            }, err => {
                dispatch(fetchTodosFailure(err));
            }).catch(err => {
            dispatch(fetchTodosFailure(err));
        });
    };
};

export const dispatchfetchTodos = () => {
    return store.dispatch(fetchTodos())
};
