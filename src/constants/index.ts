import postgresIcon from "@/assets/icons/postgresql.png";
import csvIcon from "@/assets/icons/csv.png";
import snowflakeIcon from "@/assets/icons/snowflake.png";
import apiIcon from "@/assets/icons/api.png";
import joinIcon from "@/assets/icons/join.svg?react";
import aggregateIcon from "@/assets/icons/aggregate.svg?react";
import fieldRemoverIcon from "@/assets/icons/field-remover.svg?react";
import splitIcon from "@/assets/icons/split.svg?react";
import mongodbIcon from "@/assets/icons/mongodb.png";
import sheetsIcon from "@/assets/icons/google-sheets.png";
import mysqlIcon from "@/assets/icons/mysql.png";
import s3Icon from "@/assets/icons/amazon-s3.png";

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
    {
        id: "source-3",
        name: "MongoDB Source",
        type: "source",
        databaseType: "MongoDB",
        icon: mongodbIcon,
        config: {
            uri: "mongodb://localhost:27017",
            database: "marketing_data",
            collection: "leads",
        },
    },
    {
        id: "source-4",
        name: "Google Sheets Source",
        type: "source",
        databaseType: "GoogleSheets",
        icon: sheetsIcon,
        config: {
            sheetId: "1A2B3C4D5E6F7G8H9I0J",
            range: "Sheet1!A1:E100",
            credentialsPath: "/secrets/google-credentials.json",
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
    {
        id: "dest-3",
        name: "MySQL Destination",
        type: "destination",
        databaseType: "MySQL",
        icon: mysqlIcon,
        config: {
            host: "localhost",
            port: 3306,
            database: "reporting",
            user: "dest_user",
            password: "password123",
        },
    },
    {
        id: "dest-4",
        name: "Amazon S3 Destination",
        type: "destination",
        databaseType: "S3",
        icon: s3Icon,
        config: {
            bucket: "data-pipeline-output",
            region: "us-east-1",
            accessKeyId: "<access-key>",
            secretAccessKey: "<secret-key>",
            path: "outputs/etl/",
        },
    },
];

const PROCESSOR_OPTIONS = [
    {
        key: "split",
        label: "Split",
        description: "Extracts information from fields or splits single field into multiple fields.",
        icon: splitIcon,
    },
    {
        key: "fieldRemover",
        label: "Field remover",
        description: "Deletes one or more fields from a dataset.",
        icon: fieldRemoverIcon,
    },
    {
        key: "aggregate",
        label: "Aggregate",
        description:
            "Aggregates the incoming schema based on one or more columns, performs sets of operations.",
        icon: aggregateIcon,
    },
    {
        key: "join",
        label: "Join",
        description:
            "Transforms several existing datasets to a new set of combined records.",
        icon: joinIcon,
    },
];


export { SOURCE, DESTINATION, PROCESSOR_OPTIONS };
