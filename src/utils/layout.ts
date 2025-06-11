import { Position, type Edge, type Node } from '@xyflow/react';
import type { DataSchemaData, StarSchemaData, SchemaInfo, Field, Relationship } from '../types/index';

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

// Legacy function for backward compatibility
export const generateStarSchemaLayout = (schemaData: StarSchemaData): { nodes: Node[], edges: Edge[] } => {
    return generateDataSchemaLayout(schemaData);
};

export const generateDataSchemaLayout = (schemaData: DataSchemaData): { nodes: Node[], edges: Edge[] } => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];
    const tableNodes: Record<string, Node> = {};

    const model = schemaData.data.models[0];
    const schemaInfo = schemaData.schemaInfo;

    if (!model || !schemaInfo) {
        return { nodes, edges };
    }

    // Create table nodes map for easier reference
    const hasFacts = model.facts.length > 0;
    const hasCustomRelationships = schemaInfo.relationships && schemaInfo.relationships.length > 0;
    const numFacts = model.facts.length;

    // Handle facts if they exist
    if (hasFacts) {
        // Calculate positions for multiple fact tables
        model.facts.forEach((fact, factIndex) => {
            // Get the schema info for the fact table
            const factSchemaInfo = schemaInfo.facts.find((f: { name: string }) => f.name === fact.fact_name);

            if (!factSchemaInfo) return;

            // Calculate position based on number of facts
            let factX, factY;

            if (numFacts === 1) {
                // Single fact in center
                factX = CENTER_X;
                factY = CENTER_Y;
            } else {
                // Multiple facts arranged in a small inner circle
                const innerRadius = RADIUS * 0.3;
                const factAngle = (factIndex / numFacts) * 2 * Math.PI;
                factX = CENTER_X + innerRadius * Math.cos(factAngle);
                factY = CENTER_Y + innerRadius * Math.sin(factAngle);
            }

            // Create fact node
            const factNode: Node = {
                id: `table-${fact.fact_name}`,
                type: 'tableNode',
                data: {
                    label: fact.fact_name,
                    fields: factSchemaInfo?.fields || [],
                    isFactTable: true
                },
                position: { x: factX, y: factY },
                draggable: true,
            };
            nodes.push(factNode);
            tableNodes[fact.fact_name] = factNode;
        });
    }

    // Create dimension nodes
    const numDimensions = model.dimensions.length;
    let hasCentralNode = hasFacts;

    model.dimensions.forEach((dim, index) => {
        // If no fact tables exist and this is the first dimension, place it in the center
        let x, y;
        let isCenter = false;

        if (!hasCentralNode && index === 0) {
            x = CENTER_X;
            y = CENTER_Y;
            hasCentralNode = true;
            isCenter = true;
        } else {
            const angle = ((index - (isCenter ? 1 : 0)) / (numDimensions - (isCenter ? 1 : 0))) * 2 * Math.PI;
            x = CENTER_X + RADIUS * Math.cos(angle);
            y = CENTER_Y + RADIUS * Math.sin(angle);
        }

        const handlePosition = !isCenter ? getHandlePosition(
            Math.atan2(y - CENTER_Y, x - CENTER_X)
        ) : Position.Top;

        // Get the schema info for this dimension
        const dimSchemaInfo = schemaInfo.dimensions.find((d: { name: string }) => d.name === dim.dimension_name);

        const dimensionNode: Node = {
            id: `table-${dim.dimension_name}`,
            type: 'tableNode',
            data: {
                label: dim.dimension_name,
                handlePosition,
                fields: dimSchemaInfo?.fields || [],
                isFactTable: false
            },
            position: { x, y },
            draggable: true,
        };
        nodes.push(dimensionNode);
        tableNodes[dim.dimension_name] = dimensionNode;
    });

    // Create edges based on relationships for all fact tables
    if (hasFacts) {
        // Process all fact tables
        model.facts.forEach(fact => {
            const factSchemaInfo = schemaInfo.facts.find((f: { name: string }) => f.name === fact.fact_name);
            const factNode = tableNodes[fact.fact_name];

            if (factSchemaInfo && factNode) {
                factSchemaInfo.fields.forEach(field => {
                    if (field.isForeignKey && field.references) {
                        const dimensionNode = tableNodes[field.references];

                        if (dimensionNode) {
                            const edge: Edge = {
                                id: `e-${field.references}-${fact.fact_name}-${field.name}`,
                                source: dimensionNode.id,
                                target: factNode.id,
                                animated: true,
                                style: { strokeWidth: 2 },
                                label: field.name || ''
                            };
                            edges.push(edge);
                        }
                    }
                });
            }
        });
    }

    // Add dimension-to-dimension relationships if they exist
    if (hasCustomRelationships && schemaInfo.relationships) {
        schemaInfo.relationships.forEach((rel: Relationship, index: number) => {
            const sourceNode = tableNodes[rel.sourceTable];
            const targetNode = tableNodes[rel.targetTable];

            if (sourceNode && targetNode) {
                const edge: Edge = {
                    id: `rel-${index}`,
                    source: sourceNode.id,
                    target: targetNode.id,
                    animated: true,
                    style: { strokeWidth: 2, stroke: '#5e72e4' },
                    label: `${rel.sourceField} → ${rel.targetField}`
                };
                edges.push(edge);
            }
        });
    }

    return { nodes, edges };
};