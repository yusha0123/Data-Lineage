import { Handle, Position } from "@xyflow/react";
import type { DimensionNodeProps } from "../../types/index";

const DimensionNode = ({ data }: DimensionNodeProps) => {
  return (
    <div className="bg-[#bae1ff] border-1 border-[#89cff0] rounded-md p-3 w-64 text-sm">
      <div className="font-bold text-center border-b border-[#89cff0] mb-2 pb-1">
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
                {field.name}
              </span>
              <span className="text-gray-600">{field.type}</span>
            </div>
          ))}
      </div>
      <Handle type="source" position={data.handlePosition || Position.Top} />
    </div>
  );
};

export default DimensionNode;
