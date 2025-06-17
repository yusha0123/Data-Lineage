import { Handle, Position, type NodeProps } from "@xyflow/react";
import { NodeWrapper } from "@/components/NodeWrapper";

export default function SourceNode({ data, id }: NodeProps) {
  return (
    <NodeWrapper nodeId={id}>
      <div className="rounded-md border-t-4 border-green-500 shadow p-4 bg-white w-72 text-sm">
        <div className="font-semibold text-green-500 mb-2">Source</div>
        <div className="flex items-center gap-2 mb-2">
          <img src={data.icon as string} alt="icon" className="w-5 h-5" />
          <span className="font-medium">{data.label as string}</span>
        </div>
        <p className="text-xs text-gray-700">
          Database Type: {data.databaseType as string}
        </p>
        <Handle
          type="source"
          position={Position.Right}
          className="!w-3 !h-3 !bg-green-500 !border-2 !border-white"
        />
      </div>
    </NodeWrapper>
  );
}
