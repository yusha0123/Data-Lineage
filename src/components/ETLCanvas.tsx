import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  useNodesState,
} from "@xyflow/react";
import { nodeTypes } from "./NodeTypes";
import type { Node } from "@xyflow/react";
import { useOverlayStore } from "@/hooks/useOverlayStore";
import { useCallback } from "react";

const ETLCanvas = ({ initialNodes }: { initialNodes: Node[] }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const { onOpen, setSelectedNodeId } = useOverlayStore();

  const onNodeDoubleClick = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      if (node.type === "addSourceNode") {
        setSelectedNodeId(node.id);
        onOpen("Modal", "source");
      }
    },
    [onOpen, setSelectedNodeId]
  );

  return (
    <>
      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onNodeDoubleClick={onNodeDoubleClick}
      >
        <Controls />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </>
  );
};

export default ETLCanvas;
