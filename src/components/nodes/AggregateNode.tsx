import { Handle, Position, type NodeProps } from "@xyflow/react";
import AggregateIcon from "@/assets/icons/aggregate.svg?react";
import { NodeWrapper } from "@/components/NodeWrapper";

export default function AggregateNode({ data, id }: NodeProps) {
  return (
    <NodeWrapper nodeId={id}>
      <div className="rounded-md border-t-4 border-yellow-500 shadow p-4 bg-white w-72 text-sm">
        <div className="font-semibold text-yellow-500 mb-2">Aggregate</div>
        <div className="flex items-center gap-2 mb-2">
          <AggregateIcon className="w-5 h-5" />
          <span className="font-medium">{data.label as string}</span>
        </div>
        <p className="text-xs text-gray-700">
          Performs aggregations on selected fields.
        </p>
        <Handle
          type="target"
          position={Position.Left}
          className="!w-3 !h-3 !bg-gray-400 !border-2 !border-white"
        />
        <Handle
          type="source"
          position={Position.Right}
          className="!w-3 !h-3 !bg-yellow-500 !border-2 !border-white"
        />
      </div>
    </NodeWrapper>
  );
}
