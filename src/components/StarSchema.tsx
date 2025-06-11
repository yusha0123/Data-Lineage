import React from "react";
import Canvas from "./Canvas";
import { nodeTypes } from "./NodeTypes";
import { generateStarSchemaLayout } from "../utils/layout";
import type { StarSchemaData } from "../types/index";

interface StarSchemaProps {
  schemaData: StarSchemaData;
}

const StarSchema: React.FC<StarSchemaProps> = ({ schemaData }) => {
  const { nodes, edges } = generateStarSchemaLayout(schemaData);

  return <Canvas nodes={nodes} edges={edges} nodeTypes={nodeTypes} />;
};

export default StarSchema;
