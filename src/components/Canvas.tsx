import React, { useEffect, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  type Node,
  type Edge,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";
import Sidebar from "./Sidebar";
import Tooltip from "./Tooltip";

interface CanvasProps {
  nodes: Node[];
  edges: Edge[];
  nodeTypes?: Record<string, React.ComponentType<any>>;
  onNodesUpdate?: (nodes: Node[]) => void;
}

const Canvas: React.FC<CanvasProps> = ({
  nodes: initialNodes,
  edges: initialEdges,
  nodeTypes = {},
  onNodesUpdate,
}) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [tooltipNode, setTooltipNode] = useState<Node | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [tooltipVisible, setTooltipVisible] = useState(false);

  useEffect(() => {
    setNodes((prev) => {
      const newNodeMap = new Map(initialNodes.map((n) => [n.id, n]));
      return prev.map((n) => newNodeMap.get(n.id) || n);
    });

    setEdges((prev) => {
      const existingEdgeIds = new Set(prev.map((e) => e.id));
      const newEdges = initialEdges.filter((e) => !existingEdgeIds.has(e.id));
      return [...prev, ...newEdges];
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialNodes, initialEdges]);

  const handleNodeDoubleClick = (_: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
    setSidebarVisible(true);
  };

  const handleCloseSidebar = () => {
    setSidebarVisible(false);
    setSelectedNode(null);
  };

  const handleUpdateNode = (
    nodeId: string,
    updatedData: Node["data"],
    newEdges: Edge[] = []
  ) => {
    const updatedNodes = nodes.map((node) =>
      node.id === nodeId ? { ...node, data: updatedData } : node
    );

    const existingEdgeIds = new Set(edges.map((e) => e.id));
    const uniqueEdges = newEdges.filter((e) => !existingEdgeIds.has(e.id));

    setNodes(updatedNodes);
    setEdges((prevEdges) => [...prevEdges, ...uniqueEdges]);

    if (onNodesUpdate) {
      onNodesUpdate(updatedNodes);
    }

    setSidebarVisible(false);
    setSelectedNode(null);
  };

  const handleNodeMouseEnter = (event: React.MouseEvent, node: Node) => {
    setTooltipNode(node);
    setTooltipPosition({ x: event.clientX, y: event.clientY });
    setTooltipVisible(true);
  };
  const handleNodeMouseLeave = () => {
    setTooltipVisible(false);
  };

  const handlePaneMouseMove = (event: React.MouseEvent) => {
    if (tooltipVisible) {
      setTooltipPosition({ x: event.clientX, y: event.clientY });
    }
  };

  return (
    <div style={{ width: "100%", height: "calc(100vh - 55px)" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeDoubleClick={handleNodeDoubleClick}
        onNodeMouseEnter={handleNodeMouseEnter}
        onNodeMouseLeave={handleNodeMouseLeave}
        onPaneMouseMove={handlePaneMouseMove}
        fitView
        nodesDraggable={true}
        nodesConnectable={false}
      >
        <Controls showInteractive={false} />
        <Background />
      </ReactFlow>

      {sidebarVisible && (
        <div
          className="fixed inset-0 bg-black/20 z-40"
          onClick={handleCloseSidebar}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          sidebarVisible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {selectedNode && (
          <Sidebar
            selectedNode={selectedNode}
            onClose={handleCloseSidebar}
            onUpdate={handleUpdateNode}
            allNodes={nodes}
          />
        )}
      </div>

      {tooltipNode && (
        <Tooltip
          node={tooltipNode}
          visible={tooltipVisible}
          position={tooltipPosition}
        />
      )}
    </div>
  );
};

export default Canvas;
