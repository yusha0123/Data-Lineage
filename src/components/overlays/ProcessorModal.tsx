import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useOverlayStore } from "@/hooks/useOverlayStore";

const ProcessorModal = () => {
  const { isOpen, onClose, overlayType, modalType } = useOverlayStore();

  const isDialogOpen =
    isOpen && overlayType === "Modal" && modalType === "processor";

  return (
    <Dialog onOpenChange={onClose} open={isDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Select a Processor</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ProcessorModal;
