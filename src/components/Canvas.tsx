import React from "react";
import {
  ReactFlow,
  Background,
  Controls,
  type Node,
  type Edge,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

interface CanvasProps {
  nodes: Node[];
  edges: Edge[];
  nodeTypes?: Record<string, React.ComponentType<any>>;
}

const Canvas: React.FC<CanvasProps> = ({
  nodes: initialNodes,
  edges: initialEdges,
  nodeTypes = {},
}) => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        nodesDraggable={true}
        nodesConnectable={false}
      >
        <Controls showInteractive={false} />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default Canvas;
