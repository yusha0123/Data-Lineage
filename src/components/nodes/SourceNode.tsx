import { Handle, Position } from "@xyflow/react";

interface SourceNodeProps {
  data: {
    label: string;
    icon: string;
    databaseType: string;
  };
}

export default function SourceNode({ data }: SourceNodeProps) {
  return (
    <div className="rounded-md border-t-4 border-green-500 shadow p-4 bg-white w-72 text-sm">
      <div className="font-semibold text-green-500 mb-2">Source</div>
      <div className="flex items-center gap-2 mb-2">
        <img src={data.icon} alt="icon" className="w-5 h-5" />
        <span className="font-medium">{data.label}</span>
      </div>
      <p className="text-xs text-gray-700">
        Database Type: {data.databaseType}
      </p>
      <Handle
        type="source"
        position={Position.Right}
        className="!w-3 !h-3 !bg-green-500 !border-2 !border-white"
      />
    </div>
  );
}
