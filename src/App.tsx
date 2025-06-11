import React from "react";
import DataSchema from "./components/DataSchema";
import schemaData from "./data/dataSchema.json";
import type { DataSchemaData } from "./types/index";

export default function App() {
  return <DataSchema schemaData={schemaData as DataSchemaData} />;
}
