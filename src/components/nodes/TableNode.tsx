import { Handle, Position } from "@xyflow/react";
import type { TableNodeProps } from "../../types/index";

const TableNode = ({ data }: TableNodeProps) => {
  const isFactTable = data.isFactTable ?? false;
  const bgColor = isFactTable ? "bg-[#ffb3ba]" : "bg-[#bae1ff]";
  const borderColor = isFactTable ? "border-[#ff8f9a]" : "border-[#89cff0]";
  const handlePosition = data.handlePosition || Position.Top;

  return (
    <div
      className={`${bgColor} border-1 ${borderColor} rounded-md p-3 w-72 text-sm cursor-pointer transition-shadow hover:shadow-lg`}
      title="Double-click to edit"
    >
      <div
        className={`font-bold text-center border-b ${borderColor} mb-2 pb-1`}
      >
        {data.label}
      </div>
      <div className="space-y-1">
        {data.fields &&
          data.fields.map((field, index) => (
            <div key={index} className="flex justify-between">
              <span className="font-medium">
                {field.isPrimaryKey && (
                  <span className="text-blue-600">🔑 </span>
                )}
                {field.isForeignKey && (
                  <span className="text-green-600">🔗 </span>
                )}
                {field.name}
                {field.isForeignKey && field.references && (
                  <span className="text-xs text-gray-500 ml-1">
                    → {field.references}
                  </span>
                )}
              </span>
              <span className="text-gray-600">{field.type}</span>
            </div>
          ))}
      </div>
      <Handle
        type={isFactTable ? "target" : "source"}
        position={handlePosition}
        isConnectable={true}
      />
      {!isFactTable && (
        <Handle type="target" position={Position.Bottom} isConnectable={true} />
      )}
    </div>
  );
};

export default TableNode;
