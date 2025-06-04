import {
  Background,
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import { nodeTypes } from "./components/NodeTypes";
import { layoutNodesAndEdges } from "./utils";
import { rawNodes } from "./constants";

export default function App() {
  const inputData = {
    sources: rawNodes
      .filter((node) => node.type === "startNode")
      .map((node) => node.data),
    pipelines: rawNodes
      .filter((node) => node.type === "pipelineNode")
      .map((node) => node.data),
    destinations: rawNodes
      .filter((node) => node.type === "destinationNode")
      .map((node) => node.data),
    finalTable: rawNodes.find((node) => node.type === "endNode")!
      .data as EndNodeData,
  };

  const { nodes: layoutedNodes, edges: layoutedEdges } =
    layoutNodesAndEdges(inputData);

  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
