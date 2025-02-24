import React, { useEffect, useState } from "react";
import { useGraph } from "../../redux/useReducer";

const Checkbox = ({ item }) => {
  const { fillDependencyList, removeFromDependencyList, graphData } =
    useGraph();
  const [checked, setChecked] = useState(false);
  const SetDependency = () => {
    !checked ? fillDependencyList(item) : removeFromDependencyList(item);
    setChecked(!checked);
  };
  useEffect(() => {
    graphData.dependencyList.includes(item)
      ? setChecked(true)
      : setChecked(false);
  }, [graphData.dependencyList]);
  return (
    <div className="cartCheckboxsection">
      <input
        type="checkbox"
        className="cartCheckbox"
        checked={checked}
        onChange={SetDependency}
      />
      <label>{item}</label>
    </div>
  );
};

export default Checkbox;
