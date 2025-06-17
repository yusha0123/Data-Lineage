import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  useNodesState,
} from "@xyflow/react";
import { nodeTypes } from "./NodeTypes";
import type { Node } from "@xyflow/react";

const ETLCanvas = ({ initialNodes }: { initialNodes: Node[] }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);

  return (
    <>
      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
      >
        <Controls />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </>
  );
};

export default ETLCanvas;
