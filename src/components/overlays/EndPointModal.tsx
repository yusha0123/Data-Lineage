import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DESTINATION, SOURCE } from "@/constants";
import { useOverlayStore } from "@/hooks/useOverlayStore";
import { useState } from "react";
import { MdCheckCircle, MdCancel } from "react-icons/md";
import { useReactFlow } from "@xyflow/react";

const EndPointModal = () => {
  const {
    isOpen,
    onClose,
    modalType,
    overlayType,
    selectedNodeId,
    setSelectedNodeId,
  } = useOverlayStore();
  const isDialogOpen =
    isOpen &&
    overlayType === "Modal" &&
    (modalType === "source" || modalType === "destination");

  const isSourceModal = modalType === "source";
  const isDestinationModal = modalType === "destination";
  const dialogTitle = `Select a ${isSourceModal ? "Source" : "Destination"}`;
  const endpoints = isSourceModal
    ? SOURCE
    : isDestinationModal
    ? DESTINATION
    : null;
  const { setNodes, setEdges, getNode } = useReactFlow();

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = () => {
    const selected = endpoints?.find((e) => e.id === selectedId);
    if (!selected || !selectedNodeId) return;

    setNodes((prev) =>
      prev.map((node) =>
        node.id === selectedNodeId
          ? {
              ...node,
              type: isSourceModal ? "sourceNode" : "etlDestinationNode",
              data: {
                ...node.data,
                label: selected.name,
                icon: selected.icon,
                databaseType: selected.databaseType,
              },
            }
          : node
      )
    );

    if (isSourceModal) {
      const node = getNode(selectedNodeId);
      const newNodeId = `add-dest-${Date.now()}`;
      if (!node?.data.isJoin) {
        setNodes((prev) => [
          ...prev,
          {
            id: newNodeId,
            type: "addEndpointNode",
            position: {
              x: (node?.position.x || 0) + 300,
              y: (node?.position.y || 0) + 100,
            },
            data: { label: "Add Destination", type: "add-destination" },
          },
        ]);
        setEdges((prev) => [
          ...prev,
          {
            id: `e-${selectedNodeId}-${newNodeId}`,
            source: selectedNodeId,
            target: newNodeId,
            type: "buttonedge",
          },
        ]);
      }
    }

    setSelectedId(null);
    setSelectedNodeId(null);
    onClose();
  };

  const handleCancel = () => {
    setSelectedId(null);
    onClose();
  };

  return (
    <Dialog onOpenChange={onClose} open={isDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">{dialogTitle}</DialogTitle>
          <DialogDescription className="text-sm text-center text-muted-foreground">
            Choose a {isSourceModal ? "source" : "destination"} system from the
            list below. This will connect your pipeline to the selected database
            or data platform.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 p-2">
          {endpoints?.map((endpoint) => (
            <div
              key={endpoint.id}
              onClick={() => setSelectedId(endpoint.id)}
              className={`border p-4 rounded-xl flex items-center gap-4 cursor-pointer transition ${
                selectedId === endpoint.id
                  ? "ring-2 ring-primary bg-muted"
                  : "hover:shadow"
              }`}
            >
              <img
                src={endpoint.icon}
                alt={endpoint.name}
                width={50}
                height={50}
                style={{ objectFit: "contain" }}
              />
              <div>
                <div className="font-semibold">{endpoint.name}</div>
                <div className="text-sm text-muted-foreground">
                  {endpoint.databaseType}
                </div>
              </div>
            </div>
          ))}
        </div>

        <DialogFooter className="mt-4">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="flex items-center gap-2"
          >
            <MdCancel size={18} />
            Cancel
          </Button>
          <Button
            onClick={handleSelect}
            disabled={!selectedId}
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

export default EndPointModal;
