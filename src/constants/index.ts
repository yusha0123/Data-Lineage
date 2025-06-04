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

export { sampleDestination, sampleEnd, samplePipeline, sampleStart };