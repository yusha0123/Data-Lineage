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

export interface StarSchemaData {
    data: {
        models: Model[];
    };
}

export interface Field {
    name: string;
    type: string;
    isPrimaryKey?: boolean;
    isForeignKey?: boolean;
    references?: string;
}

export interface FactNodeProps {
    data: {
        label: string;
        fields?: Field[];
    };
}

export interface DimensionNodeProps {
    data: {
        label: string;
        handlePosition: Position;
        fields?: Field[];
    };
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
}
