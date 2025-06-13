type SourceNodeData = {
    ref: string;
    name: string;
    timestamp: string;
    category: string;
    database: string;
    user: string;
    logo?: string;
};

type PipelineNodeData = {
    ref: string;
    name: string;
    timestamp: string;
    createdBy: string;
    modifiedBy: string;
};

type DestinationNodeData = {
    ref: string;
    name: string;
    timestamp: string;
    category: string;
    database: string;
    user: string;
};

type EndNodeData = {
    ref: string;
    name: string;
    timestamp: string;
    columns: { name: string; type: string }[];
};

type InputData = {
    sources: SourceNodeData[];
    pipelines: PipelineNodeData[];
    destinations: DestinationNodeData[];
    finalTable: EndNodeData;
};

type Field = {
    name: string;
    type: 'string' | 'int' | 'float' | 'date' | 'boolean';
    isPrimaryKey?: boolean;
    isForeignKey?: boolean;
    references?: string;
};

interface NodeData {
    label: string;
    fields?: Field[];
    isFactTable?: boolean;
}

interface Dimension {
    dimension_table_id: number;
    dimension_id: number;
    dimension_name: string;
    dimension_created_datetime_timestamp: string;
}

interface Fact {
    fact_definition_id: number;
    fact_table_id: number;
    fact_id: number;
    fact_name: string;
    fact_created_datetime_timestamp: string;
}

interface Model {
    dimensions: Dimension[];
    facts: Fact[];
}

interface Relationship {
    sourceTable: string;
    targetTable: string;
    sourceField: string;
    targetField: string;
}

interface SchemaInfo {
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

interface DataSchemaData {
    data: {
        models: Model[];
    };
    schemaInfo: SchemaInfo;
}

// Legacy type for backward compatibility
type StarSchemaData = DataSchemaData;

interface TableNodeProps {
    data: {
        label: string;
        fields?: Field[];
        isFactTable?: boolean;
        handlePosition?: import("@xyflow/react").Position;
    };
}
