import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PROCESSOR_OPTIONS } from "@/constants";
import { useOverlayStore } from "@/hooks/useOverlayStore";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { MdCancel, MdCheckCircle } from "react-icons/md";
import { useReactFlow } from "@xyflow/react";

type ProcessorKey = "split" | "aggregate" | "fieldRemover" | "join";

const ProcessorModal = () => {
  const { isOpen, onClose, overlayType, modalType, data } = useOverlayStore();
  const edgeContext = data?.edgeContext;
  const isDialogOpen =
    isOpen && overlayType === "Modal" && modalType === "processor";
  const { setNodes, getNode, setEdges } = useReactFlow();

  const [selectedKey, setSelectedKey] = useState<ProcessorKey | null>(null);

  const handleSelect = () => {
    if (selectedKey && selectedKey !== "join") {
      handleProcessorAdd(selectedKey as Exclude<ProcessorKey, "join">);
      handleClose();
    } else {
      handleClose();
    }
  };

  const handleProcessorAdd = (key: Exclude<ProcessorKey, "join">) => {
    const id = `${key}-${Date.now()}`;
    const processorNodeMap = {
      split: "splitNode",
      aggregate: "aggregateNode",
      fieldRemover: "fieldRemoverNode",
    };

    const type = processorNodeMap[key];
    if (!type || !edgeContext) return;

    const sourceNode = getNode(edgeContext.sourceId);
    const targetNode = getNode(edgeContext.targetId);
    if (!sourceNode || !targetNode) return;

    const position = {
      x: (sourceNode.position.x + targetNode.position.x) / 2,
      y: (sourceNode.position.y + targetNode.position.y) / 2,
    };

    setNodes((nodes) => [
      ...nodes,
      {
        id,
        type,
        position,
        data: {
          label: key[0].toUpperCase() + key.slice(1),
        },
      },
    ]);

    setEdges((edges) => {
      const withoutOriginal = edges.filter(
        (edge) =>
          !(
            edge.source === edgeContext.sourceId &&
            edge.target === edgeContext.targetId
          )
      );

      return [
        ...withoutOriginal,
        {
          id: `e-${edgeContext.sourceId}-${id}`,
          source: edgeContext.sourceId,
          target: id,
          type: "buttonedge",
        },
        {
          id: `e-${id}-${edgeContext.targetId}`,
          source: id,
          target: edgeContext.targetId,
          type: "buttonedge",
        },
      ];
    });
  };

  const handleClose = () => {
    setSelectedKey(null);
    onClose();
  };

  return (
    <Dialog onOpenChange={onClose} open={isDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Select a Processor</DialogTitle>
        </DialogHeader>

        <div className="space-y-2 max-h-[450px] overflow-y-auto">
          {PROCESSOR_OPTIONS.map((processor) => {
            const Icon = processor.icon;

            return (
              <div
                key={processor.key}
                className={cn(
                  "p-4 border rounded cursor-pointer",
                  selectedKey === processor.key
                    ? "border-blue-500 bg-blue-50"
                    : "hover:bg-gray-50"
                )}
                onClick={() => setSelectedKey(processor.key as ProcessorKey)}
              >
                <div className="flex items-center gap-2 font-semibold">
                  <Icon className="w-5 h-5" />
                  <span>{processor.label}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {processor.description}
                </p>
              </div>
            );
          })}
        </div>

        <DialogFooter className="flex justify-end gap-2 pt-4">
          <Button
            variant="outline"
            onClick={handleClose}
            className="flex items-center gap-2"
          >
            <MdCancel size={18} />
            Cancel
          </Button>
          <Button
            onClick={handleSelect}
            disabled={!selectedKey}
            className="flex items-center gap-2"
          >
            <MdCheckCircle size={18} />
            Select
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProcessorModal;
