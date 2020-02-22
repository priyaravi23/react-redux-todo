// write a function that generates an API based action when provided with a base action name

import {SAVE_TODO, UPDATE_TODO, DELETE_TODO, DELETE_ALL_TODOS, FETCH_TODOS} from "../action-types";
import {TODOS_URL} from "../../utils/constants";

function generateAPIAction(inputs) {
  const {
    url,
    actionType,
    method
  } = inputs;
  /**
   * @desc This function will behave as the action
   * @param {String} relativePath path to be added to the base url
   * @param {Object} bodyData Data for POST, PUT etc
   * @param {Function} successCb Function to be invoked upon success
   * @param {Function} failureCb Function to be invoked upon failure
   * */
  return function (relativePath, bodyData, successCb, failureCb) {
    // Generate params for the API call
    const completeUrl = `${url}${relativePath ? '/' + relativePath : ''}`;
    const fetchConfig = {
      method
    };
    if (typeof bodyData !== 'undefined') {
      fetchConfig.body = JSON.stringify(bodyData);
      fetchConfig.headers = {
        'Content-Type': 'application/json'
      };
    }

    // Return the function to be used by thunk.
    return (dispatch) => {
      dispatch({
        type: actionType
      });
      fetch(completeUrl, fetchConfig)
        .then(response => {
          if (response.ok) {
            response.json().then(data => {
              dispatch({
                type: `${actionType}_SUCCESS`,
                data
              });
              successCb && successCb(data);
            });
          } else {
            dispatch({
              type: `${actionType}_FAILURE`,
              err: response
            });
            failureCb && failureCb(response);
          }
        }).catch(err => {
        dispatch({
          type: `${actionType}_FAILURE`,
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

export const deleteAllTodos = generateAPIAction({
    actionType: DELETE_ALL_TODOS,
    url: TODOS_URL,
    method: 'DELETE'
});
