// write a function that generates an API based action when provided with a base action name

import {SAVE_TODO, UPDATE_TODO, DELETE_TODO, FETCH_TODOS} from "../action-types";
import {TODOS_URL} from "../../utils/constants";
import {fetchTodosFailure, fetchTodosStart, fetchTodosSuccess} from "./actions";

function generateAPIAction(inputs) {
  const {
    url,
    actionName,
    method
  } = inputs;
  /**
   * @desc This function will behave as the action
   * */
  return function (relativePath, bodyData, successCb, failureCb) {
    // Generate params for the API call
    const url = `${url}${relativePath ? '/' + relativePath : ''}`;
    const fetchConfig = {
      method
    };
    if (typeof bodyData !== 'undefined') {
      fetchConfig.body = JSON.stringify(bodyData)
    }

    // Return the function to be used by thunk.
    return (dispatch) => {
      dispatch({
        type: actionName
      });
      fetch(url, fetchConfig)
        .then(response => {
          if (response.ok) {
            response.json().then(data => {
              dispatch({
                type: `${actionName}_SUCCESS`,
                data
              });
              successCb && successCb(data);
            });
          } else {
            dispatch({
              type: `${actionName}_FAILURE`,
              err: response
            });
            failureCb && failureCb(response);
          }
        }).catch(err => {
        dispatch({
          type: `${actionName}_FAILURE`,
          err
        });
        failureCb && failureCb(err);
      });
    };
  }
}

export const fetchTodos = generateAPIAction({
  actionType: FETCH_TODOS,
  url: TODOS_URL,
  method: 'GET'
});

export const saveTodo = generateAPIAction({
  actionType: SAVE_TODO,
  url: TODOS_URL,
  method: 'POST'
});

export const updateTodo = generateAPIAction({
  actionType: UPDATE_TODO,
  url: TODOS_URL,
  method: 'PUT'
});

export const deleteTodo = generateAPIAction({
  actionType: DELETE_TODO,
  url: TODOS_URL,
  method: 'DELETE'
});
