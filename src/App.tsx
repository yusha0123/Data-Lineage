import ETLCanvas from "./components/ETLCanvas";

const initialNodes = [
  {
    id: "1",
    type: "addSourceNode",
    position: { x: 250, y: 250 },
    data: { label: "Add Source" },
  },
];

const App = () => {
  return (
    <div className="w-full h-[100dvh]">
      <ETLCanvas initialNodes={initialNodes} />
    </div>
  );
};

export default App;
