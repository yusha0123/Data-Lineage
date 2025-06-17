import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import { nodeTypes } from "./NodeTypes";
import { useOverlayStore } from "@/hooks/useOverlayStore";
import { useCallback } from "react";
import type { Edge, Node } from "@xyflow/react";
import { edgeTypes } from "./edgeTypes";

const ETLCanvas = ({ initialNodes }: { initialNodes: Node[] }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([] as Edge[]);
  const { onOpen, setSelectedNodeId } = useOverlayStore();

  const onNodeDoubleClick = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      if (node.data.type === "add-source") {
        setSelectedNodeId(node.id);
        onOpen("Modal", "source");
      }
      if (node.data.type === "add-destination") {
        setSelectedNodeId(node.id);
        onOpen("Modal", "destination");
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onOpen, setSelectedNodeId]
  );

  return (
    <>
      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onNodeDoubleClick={onNodeDoubleClick}
        edges={edges}
        onEdgesChange={onEdgesChange}
        edgeTypes={edgeTypes}
      >
        <Controls />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </>
  );
};

export default ETLCanvas;
