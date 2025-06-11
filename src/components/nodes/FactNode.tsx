import { Handle, Position } from "@xyflow/react";
import type { FactNodeProps } from "../../types/index";



const FactNode = ({ data }: FactNodeProps) => {
  return (
    <div className="bg-[#ffb3ba] border-1 border-[#ff8f9a] rounded-md p-3 w-72 text-sm">
      <div className="font-bold text-center border-b border-[#ff8f9a] mb-2 pb-1">
        {data.label}
      </div>
      <div className="space-y-1">
        {data.fields &&
          data.fields.map((field, index) => (
            <div key={index} className="flex justify-between">
              <span className="font-medium">
                {field.isForeignKey && (
                  <span className="text-green-600">🔗 </span>
                )}
                {field.name}
                {field.isForeignKey && (
                  <span className="text-xs text-gray-500 ml-1">
                    → {field.references}
                  </span>
                )}
              </span>
              <span className="text-gray-600">{field.type}</span>
            </div>
          ))}
      </div>
      <Handle type="target" position={Position.Top} isConnectable={false} />
    </div>
  );
};

export default FactNode;
