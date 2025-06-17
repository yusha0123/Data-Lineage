import { Handle, Position, type NodeProps } from "@xyflow/react";
import JoinIcon from "@/assets/icons/join.svg?react";
import { NodeWrapper } from "@/components/NodeWrapper";

export default function JoinNode({ data, id }: NodeProps) {
  return (
    <NodeWrapper nodeId={id}>
      <div
        className="rounded-md border-t-4 border-orange-500 shadow p-4 bg-white w-72 text-sm cursor-pointer"
        title="Double-click to add a new source"
      >
        <div className="font-semibold text-orange-500 mb-2">Join</div>
        <div className="flex items-center gap-2 mb-2">
          <JoinIcon className="w-5 h-5" />
          <span className="font-medium">{data.label as string}</span>
        </div>
        <p className="text-xs text-gray-700">
          Combines rows from two or more tables.
        </p>
        <Handle
          type="target"
          position={Position.Left}
          className="!w-3 !h-3 !bg-gray-400 !border-2 !border-white"
        />
        <Handle
          type="source"
          position={Position.Right}
          className="!w-3 !h-3 !bg-orange-500 !border-2 !border-white"
        />
      </div>
    </NodeWrapper>
  );
}
