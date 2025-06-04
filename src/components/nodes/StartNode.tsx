import { Handle, Position } from "@xyflow/react";

interface StartNodeProps {
  data: {
    name: string;
    timestamp: string;
    logo: string;
    database: string;
    user: string;
    category: string;
    columns: { name: string; type: string }[];
  };
}

export default function StartNode({ data }: StartNodeProps) {
  return (
    <div className="rounded-md border-t-4 border-pink-500 shadow p-4 bg-white w-72 text-sm">
      <div className="font-semibold text-pink-500 mb-2">Start</div>
      <div className="flex items-center gap-2 mb-2">
        <img src={data.logo} alt="logo" className="w-5 h-5" />
        <span className="font-medium">{data.name}</span>
      </div>
      <p className="text-xs text-gray-500">{data.timestamp}</p>
      <p className="text-xs text-gray-700 mt-1">
        Source Category: {data.category}
      </p>
      <p className="text-xs text-gray-700">Database: {data.database}</p>
      <p className="text-xs text-gray-700">Configured by: {data.user}</p>

      <Handle
        type="source"
        position={Position.Right}
        className="w-2 h-2 bg-pink-500"
      />
    </div>
  );
}
