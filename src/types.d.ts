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