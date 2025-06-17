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

const ProcessorModal = () => {
  const { isOpen, onClose, overlayType, modalType } = useOverlayStore();
  const isDialogOpen =
    isOpen && overlayType === "Modal" && modalType === "processor";

  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  const handleSelect = () => {
    if (selectedKey) {
      console.log("Selected Processor:", selectedKey);
      onClose();
    }
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
                onClick={() => setSelectedKey(processor.key)}
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
            onClick={onClose}
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
