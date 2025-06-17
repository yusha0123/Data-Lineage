import { Handle, Position } from "@xyflow/react";
import FieldRemoverIcon from "@/assets/icons/field-remover.svg?react";

interface FieldRemoverNodeProps {
  data: {
    label: string;
  };
}

export default function FieldRemoverNode({ data }: FieldRemoverNodeProps) {
  return (
    <div className="rounded-md border-t-4 border-red-500 shadow p-4 bg-white w-72 text-sm">
      <div className="font-semibold text-red-500 mb-2">Field Remover</div>
      <div className="flex items-center gap-2 mb-2">
        <FieldRemoverIcon className="w-5 h-5" />
        <span className="font-medium">{data.label}</span>
      </div>
      <p className="text-xs text-gray-700">
        Removes one or more specified fields from input data.
      </p>
      <Handle
        type="target"
        position={Position.Left}
        className="!w-3 !h-3 !bg-gray-400 !border-2 !border-white"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="!w-3 !h-3 !bg-red-500 !border-2 !border-white"
      />
    </div>
  );
}
