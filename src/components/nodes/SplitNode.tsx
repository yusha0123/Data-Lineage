import { Handle, Position, type NodeProps } from "@xyflow/react";
import SplitIcon from "@/assets/icons/split.svg?react";
import { NodeWrapper } from "@/components/NodeWrapper";

export default function SplitNode({ data, id }: NodeProps) {
  return (
    <NodeWrapper nodeId={id}>
      <div className="rounded-md border-t-4 border-blue-500 shadow p-4 bg-white w-72 text-sm">
        <div className="font-semibold text-blue-500 mb-2">Split</div>
        <div className="flex items-center gap-2 mb-2">
          <SplitIcon className="w-5 h-5" />
          <span className="font-medium">{data.label as string}</span>
        </div>
        <p className="text-xs text-gray-700">
          Splits a field into multiple new fields based on delimiters.
        </p>
        <Handle
          type="target"
          position={Position.Left}
          className="!w-3 !h-3 !bg-gray-400 !border-2 !border-white"
        />
        <Handle
          type="source"
          position={Position.Right}
          className="!w-3 !h-3 !bg-blue-500 !border-2 !border-white"
        />
      </div>
    </NodeWrapper>
  );
}
