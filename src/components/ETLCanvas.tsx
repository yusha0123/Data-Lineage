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
        if (node.id === "1") {
          setNodes((nds) => [
            ...nds,
            {
              id: "2",
              type: "addSourceDestNode",
              position: { x: 550, y: 250 },
              data: { label: "Add Destination", type: "add-destination" },
            },
          ]);

          setEdges((prev) => [
            ...prev,
            {
              id: "e1-2",
              source: "1",
              target: "2",
              type: "buttonedge",
            },
          ]);
        }
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
