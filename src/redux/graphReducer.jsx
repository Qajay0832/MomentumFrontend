import {
  FETCH_GRAPH_DATA_REQUEST,
  FETCH_GRAPH_DATA_SUCCESS,
  FETCH_GRAPH_DATA_FAILURE,
} from "./actionTypes";

const initialState = {
  loading: false,
  data: null,
  error: "",
  dependenciesId: [],
};
const graphReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GRAPH_DATA_REQUEST:
      return { ...state, loading: true };
    case FETCH_GRAPH_DATA_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case FETCH_GRAPH_DATA_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default graphReducer;

export const AddDependency = (state, action) => {
  return {
    ...state,
    dependenciesId: [...state.dependenciesId, action.payload],
  };
}

export const RemoveDependency = (state, action) => {
  return {
    ...state,
    dependenciesId: state.dependenciesId.filter(id => id !== action.payload), // Remove element
  };
};

const dependenciesReducer = (state = { dependenciesId: [] }, action) => {
  switch (action.type) {
    case 'ADD_DEPENDENCY':
      return {
        ...state,
        dependenciesId: [...state.dependenciesId, action.payload], // Add dependency
      };

    case 'REMOVE_DEPENDENCY':
      return {
        ...state,
        dependenciesId: state.dependenciesId.filter(id => id !== action.payload), // Remove dependency
      };

    default:
      return state;
  }
};
