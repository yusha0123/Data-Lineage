import { Handle, Position } from "@xyflow/react";

interface EndNodeProps {
  data: {
    name: string;
    timestamp: string;
    createdBy: string;
    modifiedBy: string;
    columns: { name: string; type: string }[];
  };
}

export default function EndNode({ data }: EndNodeProps) {
  return (
    <div className="rounded-md border-l-4 border-yellow-400 shadow p-4 bg-white w-72 text-sm">
      <div className="text-yellow-500 font-semibold mb-2">End</div>
      <div className="font-medium">{data.name}</div>
      <p className="text-xs text-gray-500">{data.timestamp}</p>
      <p className="text-xs text-gray-700 mb-2">Columns:</p>
      <div className="flex flex-wrap gap-1">
        {data.columns.map((col: { name: string; type: string }) => (
          <span
            key={col.name}
            className="text-xs bg-gray-200 px-2 py-0.5 rounded"
          >
            {col.name} <span className="text-gray-500">({col.type})</span>
          </span>
        ))}
      </div>

      <Handle
        type="target"
        position={Position.Left}
        className="w-2 h-2 bg-yellow-400"
      />
    </div>
  );
}
