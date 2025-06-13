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

  // Update nodes and edges when props change
  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [initialNodes, initialEdges, setNodes, setEdges]);

  const handleNodeDoubleClick = (_: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
    setSidebarVisible(true);
  };

  const handleCloseSidebar = () => {
    setSidebarVisible(false);
    setSelectedNode(null);
  };

  const handleUpdateNode = (nodeId: string, data: any) => {
    // Update the node locally
    const updatedNodes = nodes.map((node) => {
      if (node.id === nodeId) {
        return { ...node, data };
      }
      return node;
    });

    setNodes(updatedNodes);

    // Callback to parent component if provided
    if (onNodesUpdate) {
      onNodesUpdate(updatedNodes);
    }

    // Close the sidebar
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

      {sidebarVisible && selectedNode && (
        <Sidebar
          selectedNode={selectedNode}
          onClose={handleCloseSidebar}
          onUpdate={handleUpdateNode}
          allNodes={nodes}
        />
      )}

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
