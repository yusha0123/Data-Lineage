import { useOverlayStore } from "@/hooks/useOverlayStore";
import {
  BaseEdge,
  EdgeLabelRenderer,
  getSmoothStepPath,
  type EdgeProps,
} from "@xyflow/react";
import { FiPlus } from "react-icons/fi";

export default function ButtonEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  source,
  target,
  style = {},
  markerEnd,
}: EdgeProps) {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  const { onOpen } = useOverlayStore();

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        <div
          className="nodrag nopan"
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: "all",
          }}
        >
          <button
            className="w-8 h-8 rounded-full bg-white border border-gray-300 shadow-md flex items-center justify-center text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition cursor-pointer"
            onClick={() =>
              onOpen("Modal", "processor", {
                edgeContext: {
                  sourceId: source,
                  targetId: target,
                },
              })
            }
          >
            <FiPlus size={16} />
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
