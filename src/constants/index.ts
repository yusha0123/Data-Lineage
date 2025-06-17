import postgresIcon from "@/assets/icons/postgresql.png";
import csvIcon from "@/assets/icons/csv.png";
import snowflakeIcon from "@/assets/icons/snowflake.png";
import apiIcon from "@/assets/icons/api.png";

const SOURCE: PipelineEndpoint[] = [
    {
        id: "source-1",
        name: "PostgreSQL Source",
        type: "source",
        databaseType: "PostgreSQL",
        icon: postgresIcon,
        config: {
            host: "localhost",
            port: 5432,
            database: "sales_data",
            user: "source_user",
        },
    },
    {
        id: "source-2",
        name: "CSV File Source",
        type: "source",
        databaseType: "CSV",
        icon: csvIcon,
        config: {
            filePath: "/data/input.csv",
            delimiter: ",",
        },
    },
];

const DESTINATION: PipelineEndpoint[] = [
    {
        id: "dest-1",
        name: "Snowflake Destination",
        type: "destination",
        databaseType: "Snowflake",
        icon: snowflakeIcon,
        config: {
            account: "myaccount",
            warehouse: "compute_wh",
            database: "analytics",
            user: "dw_user",
        },
    },
    {
        id: "dest-2",
        name: "API Destination",
        type: "destination",
        databaseType: "API",
        icon: apiIcon,
        config: {
            endpoint: "https://analytics.company.com/ingest",
            method: "POST",
            headers: {
                Authorization: "Bearer <token>",
            },
        },
    },
];

export { SOURCE, DESTINATION };
