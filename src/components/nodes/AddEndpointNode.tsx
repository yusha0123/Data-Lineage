import { Handle, Position } from "@xyflow/react";
import { AiOutlinePlusCircle } from "react-icons/ai";

interface AddEndPointNodeProps {
  data: {
    label: string;
    type: "add-source" | "add-destination";
    isJoin?: boolean;
    afterDelete?: boolean;
  };
}

export default function AddEndpointNode({ data }: AddEndPointNodeProps) {
  return (
    <div className="w-60 h-32 bg-green-100 border-2 border-dashed border-green-500 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-green-200">
      <div className="flex items-center justify-center mb-2">
        <AiOutlinePlusCircle className="size-12 text-gray-500" />
      </div>
      <span className="text-gray-700 font-semibold">{data.label}</span>

      {data.type === "add-destination" && (
        <Handle
          type="target"
          position={Position.Left}
          className="!w-3 !h-3 !bg-gray-400 !border-2 !border-white"
        />
      )}
      {data.type === "add-source" && (data.isJoin || data.afterDelete) && (
        <Handle
          type="source"
          position={Position.Right}
          className="!w-3 !h-3 !bg-gray-400 !border-2 !border-white"
        />
      )}
    </div>
  );
}
