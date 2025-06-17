
import { create } from "zustand";

type ModalType = "source" | "destination" | "processor" | null;
type OverlayType = "Modal" | "Drawer";

interface OverlayState {
    isOpen: boolean;
    overlayType: OverlayType;
    modalType: ModalType;
    data?: unknown;
    selectedNodeId: string | null;
    onOpen: (type: OverlayType, modal: ModalType, data?: unknown) => void;
    onClose: () => void;
    setSelectedNodeId: (id: string | null) => void;
}

export const useOverlayStore = create<OverlayState>((set) => ({
    isOpen: false,
    overlayType: "Modal",
    modalType: null,
    data: null,
    selectedNodeId: null,
    onOpen: (type, modal, data) =>
        set({ isOpen: true, overlayType: type, modalType: modal, data }),
    onClose: () =>
        set({ isOpen: false, modalType: null, overlayType: "Modal", data: null }),
    setSelectedNodeId: (id) => set({ selectedNodeId: id }),
}));
