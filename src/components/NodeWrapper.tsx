import { type ReactNode, useState } from "react";
import { useReactFlow } from "@xyflow/react";
import { MdDelete } from "react-icons/md";

type Props = {
  nodeId: string;
  children: ReactNode;
};

export const NodeWrapper = ({ nodeId, children }: Props) => {
  const [hovered, setHovered] = useState(false);
  const { setNodes, setEdges } = useReactFlow();

  const handleDelete = () => {
    if (!window.confirm("Are you sure you want to delete this node?")) return;

    setNodes((nodes) => {
      const nodeToDelete = nodes.find((n) => n.id === nodeId);
      if (!nodeToDelete) return nodes;
      return nodes.filter((n) => n.id !== nodeId);
    });

    setEdges((edges) => {
      const incomingEdges = edges.filter((e) => e.target === nodeId);
      const outgoingEdges = edges.filter((e) => e.source === nodeId);

      const newEdges = [];

      for (const inEdge of incomingEdges) {
        for (const outEdge of outgoingEdges) {
          newEdges.push({
            id: `${inEdge.source}-${outEdge.target}`,
            source: inEdge.source,
            target: outEdge.target,
            sourceHandle: inEdge.sourceHandle || null,
            targetHandle: outEdge.targetHandle || null,
            type: inEdge.type || outEdge.type || "default", // fallback to default
          });
        }
      }

      return edges
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
