import React from "react";
import Canvas from "./Canvas";
import { nodeTypes } from "./NodeTypes";
import { generateDataSchemaLayout } from "../utils/layout";
import type { DataSchemaData } from "../types/index";

interface DataSchemaProps {
  schemaData: DataSchemaData;
}

const DataSchema: React.FC<DataSchemaProps> = ({ schemaData }) => {
  const { nodes, edges } = generateDataSchemaLayout(schemaData);

  return <Canvas nodes={nodes} edges={edges} nodeTypes={nodeTypes} />;
};

export default DataSchema;
