import axios from "axios";
import { useEffect, useReducer } from "react";
import {
  sharedReducer,
  ACTION_TYPE_ERROR,
  ACTION_TYPE_LOADING,
  ACTION_TYPE_SUCCESS,
  sharedInitialReducerState,
} from "reducer";

/**
 * useAsync - hook to GET data
 *
 * @param {string} apiToCall - api to call
 * @returns an object {state, dispatch, callAPI}
 */
export const useAsync = (apiToCall = {}) => {
  const { api, propertyToGet } = apiToCall;

  const [state, dispatch] = useReducer(
    sharedReducer,
    sharedInitialReducerState
  );

  /**
   * callAPI - function to call api
   *
   * @param {string} api - api to call
   * @param {string} propertyToGet - property to
   *                        get from api resolved response
   * @param {Function} dispatch - reducer dispatch function
   */
  const callAPI = async (api, propertyToGet, dispatch) => {
    dispatch({ type: ACTION_TYPE_LOADING });

    try {
      const response = await axios.get(api);

      dispatch({
        type: ACTION_TYPE_SUCCESS,
        payload: response.data[propertyToGet],
      });
    } catch (error) {
      dispatch({
        type: ACTION_TYPE_ERROR,
        payload: error.message,
      });
    }
  };

  useEffect(() => {
    callAPI(api, propertyToGet, dispatch);
  }, [api, propertyToGet]);

  return { state, dispatch, callAPI };
};
