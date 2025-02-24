import {
  FETCH_GRAPH_DATA_REQUEST,
  FETCH_GRAPH_DATA_SUCCESS,
  FETCH_GRAPH_DATA_FAILURE,
} from "./actionTypes";
import axios from "axios";

export const fetchgraph = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_GRAPH_DATA_REQUEST });

    axios
      .get("https://momentumbackend.onrender.com/graph")
      .then((response) => {
        console.log(response);
        
        dispatch({
          type: FETCH_GRAPH_DATA_SUCCESS,
          payload: response.json(),
        });
      })
      .catch((error) => {
        dispatch({
          type: FETCH_GRAPH_DATA_FAILURE,
          error: error.message,
        });
      });
  };
};

// Add dependency action
export const addDependency = (dependencyId) => ({
  type: 'ADD_DEPENDENCY',
  payload: dependencyId,
});

// Remove dependency action
export const removeDependency = (dependencyId) => ({
  type: 'REMOVE_DEPENDENCY',
  payload: dependencyId,
});
