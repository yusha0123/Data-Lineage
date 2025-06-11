import React from "react";
import StarSchema from "./components/StarSchema";
import schemaData from "./data/starSchema.json";
import type { StarSchemaData } from "./types/index";

export default function App() {
  return <StarSchema schemaData={schemaData as StarSchemaData} />;
}
