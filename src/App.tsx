import type { Edge } from "@xyflow/react";
import ETLCanvas from "./components/ETLCanvas";

const initialNodes = [
  {
    id: "1",
    type: "addSourceDestNode",
    position: { x: 250, y: 250 },
    data: { label: "Add Source", type: "add-source" },
  },

  {
    id: "2",
    type: "addSourceDestNode",
    position: { x: 550, y: 250 },
    data: { label: "Add Destination", type: "add-destination" },
  },
];

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", type: "buttonedge" },
];

const App = () => {
  return (
    <div className="w-full h-screen">
      <ETLCanvas initialNodes={initialNodes} initialEdges={initialEdges} />
    </div>
  );
};

export default App;
