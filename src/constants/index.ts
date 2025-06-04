const sampleStart = {
    name: 'Customer_DB_DL',
    logo: 'https://upload.wikimedia.org/wikipedia/en/d/dd/MySQL_logo.svg',
    timestamp: '05/02/2024 03:17 PM',
    category: 'RDBMS',
    database: 'datastore',
    user: 'Yusha',
};

const samplePipeline = {
    name: 'Customer_Pipeline',
    timestamp: '05/02/2024 03:17 PM',
    createdBy: 'Yusha',
    modifiedBy: 'Vinay',
};

const sampleDestination = {
    name: 'Customer',
    timestamp: '05/02/2024 03:17 PM',
    category: 'RDBMS',
    database: 'sales',
    user: 'Yusha',
};

const sampleEnd = {
    name: 'customer_table',
    timestamp: '05/02/2024 03:17 PM',
    columns: [
        { name: 'customer_id', type: 'int' },
        { name: 'customer_name', type: 'string' },
        { name: 'customer_phone', type: 'string' },
        { name: 'email', type: 'string' },
    ],
};

const rawNodes = [
    {
        id: "1",
        type: "startNode",
        data: {
            ref: "1",
            name: "Customer_DB_DL",
            logo: "https://upload.wikimedia.org/wikipedia/en/d/dd/MySQL_logo.svg",
            timestamp: "05/02/2024 03:17 PM",
            category: "RDBMS",
            database: "datastore",
            user: "Mohit",
        },
    },
    {
        id: "2",
        type: "pipelineNode",
        data: {
            ref: "2",
            name: "Customer_Pipeline",
            timestamp: "05/02/2024 03:17 PM",
            createdBy: "Mohit",
            modifiedBy: "Vinay",
        },
    },
    {
        id: "3",
        type: "destinationNode",
        data: {
            ref: "3",
            name: "Customer",
            timestamp: "05/02/2024 03:17 PM",
            category: "RDBMS",
            database: "sales",
            user: "Mohit",
        },
    },
    {
        id: "4",
        type: "endNode",
        data: {
            ref: "4",
            name: "customer_table",
            timestamp: "05/02/2024 03:17 PM",
            columns: [
                { name: "customer_id", type: "int" },
                { name: "customer_name", type: "string" },
                { name: "customer_phone", type: "string" },
                { name: "email", type: "string" },
            ],
        },
    },
];

const rawEdges = [
    { id: "e1-2", source: "1", target: "2" },
    { id: "e2-3", source: "2", target: "3" },
    { id: "e3-4", source: "3", target: "4" },
];

export { sampleDestination, sampleEnd, samplePipeline, sampleStart, rawNodes, rawEdges };