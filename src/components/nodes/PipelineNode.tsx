import { Handle, Position } from "@xyflow/react";

interface PipelineNodeProps {
  data: {
    name: string;
    timestamp: string;
    createdBy: string;
    modifiedBy: string;
  };
}

export default function PipelineNode({ data }: PipelineNodeProps) {
  return (
    <div className="rounded-md border-l-4 border-green-400 shadow p-4 bg-white w-72 text-sm">
      <div className="flex justify-between items-center mb-1">
        <span className="text-green-600 font-semibold">Pipeline</span>
        <span className="text-xs px-2 py-0.5 bg-gray-200 rounded">
          Scheduled
        </span>
      </div>
      <div className="font-medium">{data.name}</div>
      <p className="text-xs text-gray-500">Last Run: {data.timestamp}</p>
      <p className="text-xs text-gray-700">Created by: {data.createdBy}</p>
      <p className="text-xs text-gray-700">Modified by: {data.modifiedBy}</p>

      <Handle
        type="target"
        position={Position.Left}
        className="w-2 h-2 bg-green-400"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-2 h-2 bg-green-400"
      />
    </div>
  );
}
