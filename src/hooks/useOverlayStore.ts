import { create } from "zustand";

type ModalType = "source" | "destination" | "processor" | null;

interface EdgeContext {
    sourceId: string;
    targetId: string;
}

interface OverlayState {
    isOpen: boolean;
    overlayType: "Modal" | null;
    modalType: ModalType;
    data: {
        edgeContext?: EdgeContext;
    };
    selectedNodeId: string | null;
    onOpen: (
        overlayType: "Modal",
        modalType: ModalType,
        data?: { edgeContext?: EdgeContext }
    ) => void;
    onClose: () => void;
    setSelectedNodeId: (id: string | null) => void;
}

export const useOverlayStore = create<OverlayState>((set) => ({
    isOpen: false,
    overlayType: null,
    modalType: null,
    data: {},
    selectedNodeId: null,
    onOpen: (overlayType, modalType, data = {}) =>
        set({ isOpen: true, overlayType, modalType, data }),
    onClose: () =>
        set({
            isOpen: false,
            overlayType: null,
            modalType: null,
            data: {},
            selectedNodeId: null,
        }),
    setSelectedNodeId: (id) => set({ selectedNodeId: id }),
}));
