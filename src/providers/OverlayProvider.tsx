import EndPointModal from "@/components/overlays/EndPointModal";
import ProcessorModal from "@/components/overlays/ProcessorModal";

const OverlayProvider = () => {
  return (
    <>
      <EndPointModal />
      <ProcessorModal />
    </>
  );
};

export default OverlayProvider;
