import { Position, type Edge, type Node } from '@xyflow/react';
import type { StarSchemaData, SchemaInfo, Field } from '../types/index';

const RADIUS = 350;
const CENTER_X = 400;
const CENTER_Y = 250;

const getHandlePosition = (angle: number): Position => {
    const PI = Math.PI;
    // Normalize to [-PI, PI]
    let normalizedAngle = angle % (2 * PI);
    if (normalizedAngle > PI) normalizedAngle -= 2 * PI;
    if (normalizedAngle < -PI) normalizedAngle += 2 * PI;

    if (normalizedAngle > -PI / 4 && normalizedAngle <= PI / 4) return Position.Left; // Right
    if (normalizedAngle > PI / 4 && normalizedAngle <= (3 * PI) / 4) return Position.Top; // Bottom
    if (normalizedAngle > (3 * PI) / 4 || normalizedAngle <= -(3 * PI) / 4) return Position.Right; // Left
    return Position.Bottom; // Top
};

export const generateStarSchemaLayout = (schemaData: StarSchemaData): { nodes: Node[], edges: Edge[] } => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    const model = schemaData.data.models[0];
    const schemaInfo = schemaData.schemaInfo;

    if (!model || !model.facts.length || !schemaInfo) {
        return { nodes, edges };
    }

    const fact = model.facts[0];
    const dimensions = model.dimensions;

    // Get the schema info for the fact table
    const factSchemaInfo = schemaInfo.facts.find((f: { name: string }) => f.name === fact.fact_name);

    // Create fact node
    const factNode: Node = {
        id: `fact-${fact.fact_table_id}`,
        type: 'factNode',
        data: {
            label: fact.fact_name,
            fields: factSchemaInfo?.fields || []
        },
        position: { x: CENTER_X, y: CENTER_Y },
    };
    nodes.push(factNode);

    // Create dimension nodes and edges
    const numDimensions = dimensions.length;
    dimensions.forEach((dim, index) => {
        const angle = (index / numDimensions) * 2 * Math.PI;
        const x = CENTER_X + RADIUS * Math.cos(angle);
        const y = CENTER_Y + RADIUS * Math.sin(angle);

        const handlePosition = getHandlePosition(angle);

        // Get the schema info for this dimension
        const dimSchemaInfo = schemaInfo.dimensions.find((d: { name: string }) => d.name === dim.dimension_name);

        const dimensionNode: Node = {
            id: `dim-${dim.dimension_table_id}`,
            type: 'dimensionNode',
            data: {
                label: dim.dimension_name,
                handlePosition,
                fields: dimSchemaInfo?.fields || []
            },
            position: { x, y },
            draggable: true,
        };
        nodes.push(dimensionNode);

        // Find the relevant foreign key field for the edge label
        const foreignKeyField = factSchemaInfo?.fields.find((f: Field) =>
            f.isForeignKey && f.references === dim.dimension_name);

        const edge: Edge = {
            id: `e-${fact.fact_table_id}-${dim.dimension_table_id}`,
            source: dimensionNode.id,
            target: factNode.id,
            animated: true,
            style: { strokeWidth: 2 },
            label: foreignKeyField?.name || ''
        };
        edges.push(edge);
    });

    return { nodes, edges };
};