import React from "react";
import { Handle, Position } from "@xyflow/react";
import shareicon from "../../assets/shareicon.svg";
import { useGraph } from "../../redux/useReducer";

import "./card.css";
const Card = ({ data }) => {
  const { graphData } = useGraph();
  const title = data.data.function.split(":")[0].split("/")[
    data.data.function.split(":")[0].split("/").length - 1
  ];
  const content = data.data.function.split(":")[1];
  const params = data.data.params.map((param) => {
    return [param.identifier, param.type];
  });
  const responseobject = data.data.response_object;
  const { fillDependencyIds, currentCard } = useGraph();
  const AddDependency = (id) => {
    fillDependencyIds(id);
    currentCard(id);
  };
  return (
    <div>
      <Handle type="target" position={Position.Left} />
      <div className="card">
        <div className="cardTitleContainer">
          <p className="card-title">{title}</p>
          <img
            src={shareicon}
            alt="share"
            className="shareIcon"
            onClick={() => AddDependency(data.data._id)}
          />
        </div>
        <div className="cardcontent">
          <p className="card-content-heading">{content}</p>
          <div className="card-desc">
            <div className="card-desc-item">
              <p className="card-desc-item-heading">"DependentLibs"</p>:
              <p className="card-desc-item-content">
                {" "}
                {graphData.dependencyList
                  ? graphData.dependencyList.map((e) => <p>{e}</p>)
                  : ["sqlalchemy"]}
              </p>
            </div>
            <div className="card-desc-item">
              <p className="card-desc-item-heading">"Params"</p>:
              <p className="card-desc-item-content">
                {params.map((param) => {
                  return (
                    <span>
                      {params.length == 0
                        ? ["null"]
                        : [param[0], "-", param[1]]}
                    </span>
                  );
                })}
              </p>
            </div>
            <div className="card-desc-item">
              <p className="card-desc-item-heading">"Response Object"</p>:
              <p className="card-desc-item-content">
                {" "}
                {responseobject.length == 0 ? "none" : responseobject}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Handle type="source" position={Position.Right} id="a" />
    </div>
  );
};

export default Card;
