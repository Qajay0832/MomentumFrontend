import { useDispatch, useSelector } from "react-redux";
import {
  updateData,
  addCurrentDependency,
  removeDependencyId,
  addDependencyId,
  removeDependencyList,
  addDependencyList,
} from "./actions.jsx";

export const useGraph = () => {
  const graphData = useSelector((state) => state.graph);
  console.log("products");
  const dispatch = useDispatch();
  const setData = (array) => {
    dispatch(updateData(array));
  };
  const fillDependencyIds = (id) => {
    dispatch(addDependencyId(id));
  };
  const currentCard = (id) => {
    dispatch(addCurrentDependency(id));
  };
  const removeDependency = (id) => {
    dispatch(removeDependencyId(id));
  };
  const fillDependencyList = (dependency) => {
    dispatch(addDependencyList(dependency));
  };
  const removeFromDependencyList = (dependency) => {
    dispatch(removeDependencyList(dependency));
  };
  return {
    graphData,
    setData,
    removeDependency,
    fillDependencyIds,
    currentCard,
    fillDependencyList,
    removeFromDependencyList,
  };
};
