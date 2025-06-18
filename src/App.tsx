import ETLCanvas from "./components/ETLCanvas";

const initialNodes = [
  {
    id: "1",
    type: "addEndpointNode",
    position: { x: 250, y: 250 },
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
