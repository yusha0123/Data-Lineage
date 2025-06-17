import { create } from "zustand";

type ModalType = "source" | "destination" | "processor" | null;
type OverlayType = "Modal" | "Drawer";

type EdgeContext = {
    sourceId: string;
    targetId: string;
};

type OverlayData = {
    edgeContext?: EdgeContext;
    [key: string]: unknown;
};

interface OverlayState {
    isOpen: boolean;
    overlayType: OverlayType;
    modalType: ModalType;
    data?: OverlayData | null;
    selectedNodeId: string | null;

    onOpen: (
        type: OverlayType,
        modal: ModalType,
        data?: OverlayData
    ) => void;

    onClose: () => void;

    setSelectedNodeId: (id: string | null) => void;
}

export const useOverlayStore = create<OverlayState>((set) => ({
    isOpen: false,
    overlayType: "Modal",
    modalType: null,
    data: null,
    selectedNodeId: null,

    onOpen: (type, modal, data = undefined) =>
        set({
            isOpen: true,
            overlayType: type,
            modalType: modal,
            data,
        }),

    onClose: () =>
        set({
            isOpen: false,
            modalType: null,
            overlayType: "Modal",
            data: null,
        }),

    setSelectedNodeId: (id) => set({ selectedNodeId: id }),
}));
