import { useState } from "react";
import DataSchema from "./components/DataSchema";
import starSchemaData from "./data/starSchema.json";
import snowflakeSchemaData from "./data/snowflakeSchema.json";
import type { DataSchemaData } from "./types/index";

export default function App() {
  const [schemaType, setSchemaType] = useState<"star" | "snowflake">("star");

  const handleSchemaChange = (type: "star" | "snowflake") => {
    setSchemaType(type);
  };

  return (
    <div className="flex flex-col w-full h-screen">
      <div className="flex justify-center p-2 bg-gray-100">
        <div className="flex space-x-4">
          <button
            className={`px-4 py-2 rounded-md font-medium transition-colors text-sm ${
              schemaType === "star"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => handleSchemaChange("star")}
          >
            Star Schema
          </button>
          <button
            className={`px-4 py-2 rounded-md font-medium transition-colors text-sm ${
              schemaType === "snowflake"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => handleSchemaChange("snowflake")}
          >
            Snowflake Schema
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        <DataSchema
          schemaData={
            schemaType === "star"
              ? (starSchemaData as DataSchemaData)
              : (snowflakeSchemaData as DataSchemaData)
          }
        />
      </div>
    </div>
  );
}
