import { Handle, Position } from "@xyflow/react";

interface ETLDestinationNodeProps {
  data: {
    label: string;
    icon: string;
    databaseType: string;
  };
}

export default function ETLDestinationNode({ data }: ETLDestinationNodeProps) {
  return (
    <div className="rounded-md border-t-4 border-purple-500 shadow p-4 bg-white w-72 text-sm">
      <div className="font-semibold text-purple-500 mb-2">Destination</div>
      <div className="flex items-center gap-2 mb-2">
        <img src={data.icon} alt="icon" className="w-5 h-5" />
        <span className="font-medium">{data.label}</span>
      </div>
      <p className="text-xs text-gray-700">
        Database Type: {data.databaseType}
      </p>
      <Handle
        type="target"
        position={Position.Left}
        className="!w-3 !h-3 !bg-gray-400 !border-2 !border-white"
      />
    </div>
  );
}
