import { Handle, Position } from "@xyflow/react";

interface DestinationNodeProps {
  data: {
    name: string;
    timestamp: string;
    category: string;
    database: string;
    user: string;
  };
}

export default function DestinationNode({ data }: DestinationNodeProps) {
  return (
    <div className="rounded-md border-t-4 border-yellow-400 shadow p-4 bg-white w-72 text-sm">
      <div className="text-yellow-500 font-semibold mb-2">Destination</div>
      <div className="font-medium">{data.name}</div>
      <p className="text-xs text-gray-500">{data.timestamp}</p>
      <p className="text-xs text-gray-700">Category: {data.category}</p>
      <p className="text-xs text-gray-700">Database: {data.database}</p>
      <p className="text-xs text-gray-700">Configured by: {data.user}</p>

      <Handle
        type="target"
        position={Position.Left}
        className="w-2 h-2 bg-yellow-400"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-2 h-2 bg-yellow-400"
      />
    </div>
  );
}
