const SOURCE: PipelineEndpoint[] = [
    {
        id: 'source-1',
        name: 'PostgreSQL Source',
        type: 'source',
        databaseType: 'PostgreSQL',
        icon: '/assets/icons/postgresql.png',
        config: {
            host: 'localhost',
            port: 5432,
            database: 'sales_data',
            user: 'source_user',
        },
    },
    {
        id: 'source-2',
        name: 'CSV File Source',
        type: 'source',
        databaseType: 'CSV',
        icon: '/assets/icons/csv.png',
        config: {
            filePath: '/data/input.csv',
            delimiter: ',',
        },
    },
];

const DESTINATION: PipelineEndpoint[] = [
    {
        id: 'dest-1',
        name: 'Snowflake Destination',
        type: 'destination',
        databaseType: 'Snowflake',
        icon: '/assets/icons/snowflake.png',
        config: {
            account: 'myaccount',
            warehouse: 'compute_wh',
            database: 'analytics',
            user: 'dw_user',
        },
    },
    {
        id: 'dest-2',
        name: 'API Destination',
        type: 'destination',
        databaseType: 'API',
        icon: '/assets/icons/api.png',
        config: {
            endpoint: 'https://analytics.company.com/ingest',
            method: 'POST',
            headers: {
                Authorization: 'Bearer <token>',
            },
        },
    },
];

export { SOURCE, DESTINATION };