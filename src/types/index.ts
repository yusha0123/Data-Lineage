import type { Position } from "@xyflow/react";

export interface Dimension {
    dimension_table_id: number;
    dimension_id: number;
    dimension_name: string;
    dimension_created_datetime_timestamp: string;
}

export interface Fact {
    fact_definition_id: number;
    fact_table_id: number;
    fact_id: number;
    fact_name: string;
    fact_created_datetime_timestamp: string;
}

export interface Model {
    dimensions: Dimension[];
    facts: Fact[];
}

export interface Field {
    name: string;
    type: string;
    isPrimaryKey?: boolean;
    isForeignKey?: boolean;
    references?: string;
}

export interface Relationship {
    sourceTable: string;
    targetTable: string;
    sourceField: string;
    targetField: string;
}

export interface SchemaInfo {
    dimensions: {
        name: string;
        fields: Field[];
    }[];
    facts: {
        name: string;
        fields: Field[];
    }[];
    relationships?: Relationship[];
}

export interface DataSchemaData {
    data: {
        models: Model[];
    };
    schemaInfo: SchemaInfo;
}

// Legacy type for backward compatibility
export interface StarSchemaData extends DataSchemaData { }

export interface TableNodeProps {
    data: {
        label: string;
        fields?: Field[];
        isFactTable?: boolean;
        handlePosition?: Position;
    };
}
