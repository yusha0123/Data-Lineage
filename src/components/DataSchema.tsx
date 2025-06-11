import React, { useMemo } from "react";
import Canvas from "./Canvas";
import { nodeTypes } from "./NodeTypes";
import { generateDataSchemaLayout } from "../utils/layout";
import type { DataSchemaData } from "../types/index";

interface DataSchemaProps {
  schemaData: DataSchemaData;
}

const DataSchema: React.FC<DataSchemaProps> = ({ schemaData }) => {
  const { nodes, edges } = useMemo(() => {
    return generateDataSchemaLayout(schemaData);
  }, [schemaData]);

  // Determine if this is a star or snowflake schema based on relationship complexity
  const isSnowflake = useMemo(() => {
    if (!schemaData?.schemaInfo?.relationships) return false;

    // If we have relationships between dimensions, it's a snowflake schema
    const dimensionToDimensionRelationships =
      schemaData.schemaInfo.relationships.filter((rel) => {
        // Check if both tables are dimension tables (not fact tables)
        const isSourceFact = schemaData.schemaInfo.facts.some(
          (f) => f.name === rel.sourceTable
        );
        const isTargetFact = schemaData.schemaInfo.facts.some(
          (f) => f.name === rel.targetTable
        );
        return !isSourceFact && !isTargetFact;
      });

    return dimensionToDimensionRelationships.length > 0;
  }, [schemaData]);

  return (
    <div className="relative w-full h-full">
      <div className="absolute top-2 left-2 z-10 bg-white bg-opacity-75 px-3 py-1 rounded-md shadow text-sm">
        {isSnowflake ? "Snowflake Schema" : "Star Schema"}
      </div>
      <Canvas nodes={nodes} edges={edges} nodeTypes={nodeTypes} />
    </div>
  );
};

export default DataSchema;
