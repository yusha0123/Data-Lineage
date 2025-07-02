import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesState,
  type NodeChange,
} from "@xyflow/react";
import { nodeTypes } from "./NodeTypes";
import { useOverlayStore } from "@/hooks/useOverlayStore";
import { useCallback, useRef } from "react";
import type { Edge, Node } from "@xyflow/react";
import { edgeTypes } from "./edgeTypes";
import {
  findNearestValidPosition,
  isNodeColliding,
  throttledCollisionCheck,
  performanceMonitor,
} from "@/utils/collisionDetection";
import { useCollisionFeedback } from "@/hooks/useCollisonFeedback";

const ETLCanvas = ({ initialNodes }: { initialNodes: Node[] }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState([] as Edge[]);
  const dragStartPositions = useRef<Map<string, { x: number; y: number }>>(
    new Map()
  );

  const { onOpen, setSelectedNodeId } = useOverlayStore();
  const { showCollisionWarning } = useCollisionFeedback();

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
    [onOpen, setSelectedNodeId]
  );

  const handleNodesChange = useCallback(
    (changes: NodeChange[]) => {
      const processedChanges = changes.map((change) => {
        if (
          change.type === "position" &&
          change.position &&
          change.dragging === false
        ) {
          const nodeId = change.id;
          const currentNode = nodes.find((n) => n.id === nodeId);

          if (currentNode) {
            const newPosition = change.position;
            const otherNodes = nodes.filter((n) => n.id !== nodeId);

            // Use performance monitoring in development
            const hasCollision = performanceMonitor.measure(
              "collision-detection",
              () => isNodeColliding(currentNode, otherNodes, newPosition)
            );

            if (hasCollision) {
              showCollisionWarning();

              const validPosition = performanceMonitor.measure(
                "find-valid-position",
                () =>
                  findNearestValidPosition(currentNode, otherNodes, newPosition)
              );

              const originalPosition = dragStartPositions.current.get(nodeId);
              const finalPosition =
                validPosition.x === newPosition.x &&
                validPosition.y === newPosition.y
                  ? originalPosition || currentNode.position
                  : validPosition;

              return {
                ...change,
                position: finalPosition,
              };
            }
          }
        }

        return change;
      });

      onNodesChange(processedChanges);
    },
    [nodes, onNodesChange, showCollisionWarning]
  );

  const onNodeDragStart = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      dragStartPositions.current.set(node.id, {
        x: node.position.x,
        y: node.position.y,
      });
    },
    []
  );

  const onNodeDrag = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      // Use throttled collision check for real-time feedback
      const otherNodes = nodes.filter((n) => n.id !== node.id);

      throttledCollisionCheck(
        node,
        otherNodes,
        node.position,
        (wouldCollide: boolean) => {
          setNodes((prevNodes) =>
            prevNodes.map((n) => {
              if (n.id === node.id) {
                return {
                  ...n,
                  style: {
                    ...n.style,
                    opacity: wouldCollide ? 0.6 : 1,
                    outline: wouldCollide ? "2px solid #ef4444" : "none",
                    transition: "opacity 0.1s ease, outline 0.1s ease",
                  },
                };
              }
              return n;
            })
          );
        }
      );
    },
    [nodes, setNodes]
  );

  const onNodeDragStop = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      // Reset visual feedback when drag stops
      setNodes((prevNodes) =>
        prevNodes.map((n) => {
          if (n.id === node.id) {
            return {
              ...n,
              style: {
                ...n.style,
                opacity: 1,
                outline: "none",
                transition: "opacity 0.2s ease, outline 0.2s ease",
              },
            };
          }
          return n;
        })
      );

      // Clean up drag start position
      dragStartPositions.current.delete(node.id);
    },
    [setNodes]
  );

  return (
    <>
      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        onNodesChange={handleNodesChange}
        onNodeDoubleClick={onNodeDoubleClick}
        onNodeDragStart={onNodeDragStart}
        onNodeDrag={onNodeDrag}
        onNodeDragStop={onNodeDragStop}
        edges={edges}
        onEdgesChange={onEdgesChange}
        edgeTypes={edgeTypes}
        snapToGrid={true}
        snapGrid={[20, 20]}
      >
        <Controls />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </>
  );
};

export default ETLCanvas;
