import { type ReactNode, useState } from "react";
import { useReactFlow } from "@xyflow/react";
import { MdDelete } from "react-icons/md";

type Props = {
  nodeId: string;
  children: ReactNode;
};

export const NodeWrapper = ({ nodeId, children }: Props) => {
  const [hovered, setHovered] = useState(false);
  const { setNodes, setEdges, getNodes, getEdges } = useReactFlow();

  const handleDelete = () => {
    if (!window.confirm("Are you sure you want to delete this node?")) return;

    const nodes = getNodes();
    const nodeToDelete = nodes.find((n) => n.id === nodeId);
    if (!nodeToDelete) return;

    const isSource = nodeToDelete.type === "sourceNode";
    const isDestination = nodeToDelete.type === "etlDestinationNode";

    const newNodeId = crypto.randomUUID();

    const oldEdges = getEdges();

    if (isSource || isDestination) {
      const placeholderNode = {
        id: newNodeId,
        type: "addEndpointNode",
        position: {
          x: nodeToDelete.position?.x || 0,
          y: nodeToDelete.position?.y || 0,
        },
        data: {
          label: isDestination ? "Add Destination" : "Add Source",
          type: isDestination ? "add-destination" : "add-source",
        },
      };

      // Remove the node and add the new one
      setNodes((prev) => [
        ...prev.filter((n) => n.id !== nodeId),
        placeholderNode,
      ]);

      // Reconnect any edges to the new placeholder node
      const remappedEdges = oldEdges.map((e) => {
        if (e.source === nodeId || e.target === nodeId) {
          return {
            ...e,
            id: `${e.source === nodeId ? newNodeId : e.source}-${
              e.target === nodeId ? newNodeId : e.target
            }`,
            source: e.source === nodeId ? newNodeId : e.source,
            target: e.target === nodeId ? newNodeId : e.target,
          };
        }
        return e;
      });

      setEdges(remappedEdges);
      return;
    }
    // For all other nodes — normal delete + edge rewiring
    setNodes((prevNodes) => prevNodes.filter((n) => n.id !== nodeId));

    setEdges((prevEdges) => {
      const incomingEdges = prevEdges.filter((e) => e.target === nodeId);
      const outgoingEdges = prevEdges.filter((e) => e.source === nodeId);

      const newEdges = [];

      for (const inEdge of incomingEdges) {
        for (const outEdge of outgoingEdges) {
          newEdges.push({
            id: `${inEdge.source}-${outEdge.target}`,
            source: inEdge.source,
            target: outEdge.target,
            sourceHandle: inEdge.sourceHandle || null,
            targetHandle: outEdge.targetHandle || null,
            type: inEdge.type || outEdge.type || "default",
          });
        }
      }

      return prevEdges
        .filter((e) => e.source !== nodeId && e.target !== nodeId)
        .concat(newEdges);
    });
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        className={`absolute cursor-pointer hover:bg-gray-100 -top-3 -right-3 z-10 bg-white border border-gray-300 rounded-full p-1 shadow text-red-600 transition-all duration-300 ease-in-out 
        ${
          hovered
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-1 pointer-events-none"
        }`}
        onClick={handleDelete}
      >
        <MdDelete size={20} />
      </button>

      {children}
    </div>
  );
};
