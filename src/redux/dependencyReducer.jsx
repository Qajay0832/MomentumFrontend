
const initialState = {
  dependenciesId: [],
  currentDependency: null,
};

const dependenciesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_DEPENDENCY":
      return state.dependenciesId.find(
        (dependency) => dependency === action.payload
      ) === undefined
        ? {
            ...state,
            dependenciesId: [...state.dependenciesId, action.payload],
            currentDependency:action.payload // Add dependency
          }
        : state;

    case "REMOVE_DEPENDENCY":
      return {
        ...state,
        dependenciesId: state.dependenciesId.filter(
          (id) => id !== action.payload
        ),
        currentDependency:null, // Remove dependency
      };

    default:
      return state;
  }
};

export default dependenciesReducer;
