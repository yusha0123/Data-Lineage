import ETLCanvas from "./components/ETLCanvas";

const screenHeight = window.innerHeight;
const nodeHeight = 128; // Approx height of the node
const centerY = screenHeight / 2 - nodeHeight / 2;

const initialNodes = [
  {
    id: "1",
    type: "addEndpointNode",
    position: { x: 250, y: centerY },
    data: { label: "Add Source", type: "add-source" },
  },
];

const App = () => {
  return (
    <div className="w-full h-screen">
      <ETLCanvas initialNodes={initialNodes} />
    </div>
  );
};

export default App;
