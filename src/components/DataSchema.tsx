import React, { useMemo } from "react";
import Canvas from "./Canvas";
import { nodeTypes } from "./NodeTypes";
import { generateDataSchemaLayout } from "../utils/layout";
import type { Node } from "@xyflow/react";

interface DataSchemaProps {
  schemaData: DataSchemaData;
  onSchemaUpdate?: (updatedSchema: DataSchemaData) => void;
}

const DataSchema: React.FC<DataSchemaProps> = ({
  schemaData,
  onSchemaUpdate,
}) => {
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

  const handleNodesUpdate = (updatedNodes: Node[]) => {
    if (!onSchemaUpdate) return;

    // Create a copy of the schema data to update
    const updatedSchema = { ...schemaData };

    // Update the schema information with the changes from the nodes
    updatedNodes.forEach((node) => {
      const tableName = node.data.label as string;
      const fields = node.data.fields as Field[];

      if (node.data.isFactTable) {
        // Update fact table
        const factIndex = updatedSchema.schemaInfo.facts.findIndex(
          (fact) => fact.name === tableName
        );

        if (factIndex !== -1) {
          updatedSchema.schemaInfo.facts[factIndex] = {
            ...updatedSchema.schemaInfo.facts[factIndex],
            name: tableName,
            fields: fields,
          };
        }
      } else {
        // Update dimension table
        const dimIndex = updatedSchema.schemaInfo.dimensions.findIndex(
          (dim) => dim.name === tableName
        );

        if (dimIndex !== -1) {
          updatedSchema.schemaInfo.dimensions[dimIndex] = {
            ...updatedSchema.schemaInfo.dimensions[dimIndex],
            name: tableName,
            fields: fields,
          };
        }
      }
    });

    // Call the update handler with the new schema
    onSchemaUpdate(updatedSchema);
  };

  return (
    <div className="relative w-full h-full">
      <div className="absolute top-2 left-2 z-10 bg-white bg-opacity-75 px-3 py-1 rounded-md shadow text-sm">
        {isSnowflake ? "Snowflake Schema" : "Star Schema"}
      </div>
      <Canvas
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesUpdate={handleNodesUpdate}
      />
    </div>
  );
};

export default DataSchema;
