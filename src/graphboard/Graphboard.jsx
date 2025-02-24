import React from "react";
import Card from "../components/card/Card.jsx";
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  MarkerType,
} from "@xyflow/react";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import "@xyflow/react/dist/style.css";
import "./graphboard.css";
import CommitIcon from "../assets/commiticon.svg";
import DependencyList from "../../data/dependencies.json";
import GraphData from "../../data/graph.json";
import DBConfiguartion from "../../data/configuration.json";
import dependencyIcon from "../assets/dependencyIcon.svg";
import { useGraph } from "../redux/useReducer.jsx";
import Checkbox from "../components/checkbox/Checkbox.jsx";

const Graphboard = () => {
  const [dummyNodes, setDummyNodes] = useState([]);
  const [dummyEdges, setDummyEdges] = useState([]);
  const [dataConfig, setDataConfig] = useState(DBConfiguartion);
  const [hostName, setHostName] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [dbMock, setdbMock] = useState(true);
  const { graphData, setData, fillDependencyList } = useGraph();

  const DataProcessor = async (data) => {
    // setDummyNodes
    const initialX = 500; // Starting from the center
    const initialY = 200;
    const horizontalSpacing = 400;
    let verticalSpacing = 200;
    // let dummy="";
    const processNodes = (data, parentId = "1", x = initialX, y = initialY) => {
      if (Array.isArray(data)) {
        return data.map((item, index) => {
          return processNodes(
            item,
            `${parentId}${index + 1}`,
            x + horizontalSpacing,
            y + index * verticalSpacing
          );
        });
      }

      const nodeId = parentId;

      setDummyNodes((prev) => [
        ...prev,
        {
          id: nodeId,
          position: { x, y },
          data: { data },
          type: "Card",
          draggable: true,
        },
      ]);

      if (
        data.children &&
        Array.isArray(data.children) &&
        data.children.length > 0
      ) {
        const childVerticalSpacing = verticalSpacing * 2;
        data.children.forEach((child, index) => {
          const childId = `${nodeId}-${index + 1}`;
          setDummyEdges((prev) => [
            ...prev,
            {
              id: `e${nodeId}-${childId}`,
              source: nodeId,
              target: childId,
              type: "step",
              markerEnd: {
                type: MarkerType.Arrow,
                width: 20,
                height: 20,
                color: "#7C7C7C",
              },
              style: {
                strokeWidth: 1.5,
                stroke: "#7C7C7C",
              },
            },
          ]);

          processNodes(
            child,
            childId,
            x + horizontalSpacing,
            y +
              childVerticalSpacing *
                (index - Math.floor(data.children.length / 2))
          );
        });
      }
    };

    await processNodes(data);
  };
  useEffect(() => {
    if (graphData.data && graphData.data.function) {
      DataProcessor(graphData.data);
    }
  }, [graphData.data]);
  const fetchData = async () => {
    try {
      const data = await axios.get(
        "https://momentumbackend.onrender.com/graph"
      );
      if (!data) {
        console.log("error");
        return null;
      }
      setData(data.data.proxy[0]);

      data.data.dbSchema[0].entities_to_mock.map((item) => {
        fillDependencyList(item);
      });
      alert(
        "Please enter Username Qajay0832 and Password Ajayq0832 and host Ajay Tiwari to add dependencies"
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const nodeTypes = useMemo(() => ({ Card: Card }), []);
  const postGraph = async () => {
    setHostName("");
    setUsername("");
    setPassword("");
    try {
      const updateGraph = await axios.post(
        "https://momentumbackend.onrender.com/graph",
        {
          host: hostName,
          username: username,
          password: password,
          data: GraphData,
          dependencyList: DependencyList,
          dependencyIds: graphData.dependencyList,
        }
      );
      if (!updateGraph) {
        console.log("Error in updating the Dependencies");
        alert("Error in updating the Dependencies");
        return;
      }
      alert("Dependencies Updated Successfully");
      return;
    } catch (error) {
      console.log(error);
      alert("Error in updating the Dependencies ! Please try Again!");
      return;
    }
  };

  return (
    <div className="appContainer">
      <section className="firstContainer">
        <section
          className="mainContainer"
          style={{ height: "100vh", width: "100vw" }}
        >
          {/* {dummyNodes && dummyEdges && console.log(dummyNodes)} */}
          {dummyNodes && dummyEdges && (
            <ReactFlow
              style={{ height: "100vh", width: "100vw" }}
              nodes={dummyNodes}
              edges={dummyEdges}
              nodeTypes={nodeTypes}
            >
              <Background
                color="rgba(58,62,66,255)"
                gap={50}
                variant={BackgroundVariant.Lines}
              />
            </ReactFlow>
          )}
        </section>
        {graphData.currentDependency && (
          <div className="footer">
            {graphData.currentDependency == null
              ? ""
              : "Post/Cards/" + graphData.currentDependency}
          </div>
        )}
      </section>

      <section className="secondContainer">
        <hr />
        <div className="cartContainer">
          <p className="cartTitle">cart_campaign</p>
          <div className="commits">
            <p className="commitItems">
              <img src={CommitIcon} alt="commitIcon" />
              <span>Last 2 commits scanned</span>
            </p>
            <p className="commitItems">
              <img src={CommitIcon} alt="commitIcon" />
              <span>
                {graphData.dependencyId.length == 0
                  ? "No"
                  : graphData.dependencyId.length}{" "}
                entry points identified
              </span>
            </p>
          </div>
          <div className="cartContent">
            <p className="cartHeadings">Selected flow</p>
            <select className="selectCards">
              {graphData.dependencyId.length == 0 ? (
                <option disabled selected>
                  Add Some Cards
                </option>
              ) : (
                graphData.dependencyId.map((item) => (
                  <option key={item} value={item}>
                    POST/cards/{item}
                  </option>
                ))
              )}
            </select>
          </div>
          <div className="cartContent">
            <p className="cartHeadings">Dependencies</p>
            <p className="cartsubHeadings">Select the ones you want to mock</p>
            <div className="cartDependenciesContainer">
              {DependencyList.map((item) => (
                <div className="cartCheckboxContainer">
                  <Checkbox item={item} />
                  <img src={dependencyIcon} alt="dependencyIcon" />
                </div>
              ))}
            </div>
          </div>
          <div className="cartContent">
            <p className="cartHeadings">Databases</p>
            <p className="cartsubHeadings">
              Select if you want to mock databases
            </p>
            <div className="cartDependenciesContainer">
              <div className="cartCheckboxsection">
                <input
                  type="checkbox"
                  checked={dbMock}
                  onChange={() => setdbMock(!dbMock)}
                ></input>
                <label>I want to mock databases</label>
              </div>
              <div className="cartCheckboxsection">
                <input
                  type="checkbox"
                  checked={!dbMock}
                  onChange={() => setdbMock(!dbMock)}
                ></input>
                <label>I don’t want to mock database</label>
              </div>
            </div>
          </div>
          <div className="cartContent dbInputs">
            <p className="cartHeadings">Database Configurations</p>
            <div className="cartDatabaseInputs">
              <div className="inputContainer">
                <input
                  disabled={dbMock}
                  type="text"
                  className={`textfield ${dbMock ? "disabledtextfield" : ""}`}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="textfield" className="input-label">
                  Database User
                </label>
              </div>
              <div className="inputContainer">
                <input
                  disabled={dbMock}
                  type="text"
                  className={`textfield ${dbMock ? "disabledtextfield" : ""}`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="textfield" className="input-label">
                  Database Password
                </label>
              </div>
              <div className="inputContainer">
                <input
                  disabled={dbMock}
                  type="text"
                  className={`textfield ${dbMock ? "disabledtextfield" : ""}`}
                  value={hostName}
                  onChange={(e) => setHostName(e.target.value)}
                />
                <label htmlFor="textfield" className="input-label">
                  Database Hostname
                </label>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="saveContainer">
          <button disabled={dbMock} className="saveBtn" onClick={postGraph}>
            Save
          </button>
        </div>
      </section>
    </div>
  );
};

export default Graphboard;
