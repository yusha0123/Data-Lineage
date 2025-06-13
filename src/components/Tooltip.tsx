import React from "react";
import type { Node } from "@xyflow/react";

interface TooltipProps {
  node: Node;
  visible: boolean;
  position: { x: number; y: number };
}

const Tooltip: React.FC<TooltipProps> = ({ node, visible, position }) => {
  if (!visible) return null;

  const isFactTable = node.data.isFactTable;
  const fields = node.data.fields || [];
  const primaryKeys = fields.filter((field) => field.isPrimaryKey);
  const foreignKeys = fields.filter((field) => field.isForeignKey);

  return (
    <div
      className="absolute bg-white shadow-md rounded-md p-3 z-50 text-sm max-w-xs pointer-events-none"
      style={{
        left: position.x + 10,
        top: position.y + 10,
      }}
    >
      <div className="font-bold border-b pb-1 mb-2">{node.data.label}</div>
      <div className="space-y-2">
        <div>
          <span className="font-medium">Type:</span>{" "}
          {isFactTable ? "Fact Table" : "Dimension Table"}
        </div>
        <div>
          <span className="font-medium">Fields:</span> {fields.length}
        </div>
        <div>
          <span className="font-medium">Primary Keys:</span>{" "}
          {primaryKeys.length}
        </div>
        <div>
          <span className="font-medium">Foreign Keys:</span>{" "}
          {foreignKeys.length}
        </div>
        <div className="text-xs text-gray-500 italic">Double-click to edit</div>
      </div>
    </div>
  );
};

export default Tooltip;
