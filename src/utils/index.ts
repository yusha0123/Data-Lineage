import type { Edge, Node } from '@xyflow/react';
import dagre from 'dagre';

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 280;
const nodeHeight = 140;


export function layoutNodesAndEdges(data: InputData): {
    nodes: Node[];
    edges: Edge[];
} {
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    const idMap: Record<string, string> = {};

    const createNode = (
        type: string,
        data: any
    ): string => {
        const id = data.ref;
        idMap[data.ref] = id;

        const node: Node = {
            id,
            type,
            data,
            position: { x: 0, y: 0 },
        };

        nodes.push(node);
        return id;
    };

    data.sources.forEach((src) => {
        createNode('startNode', src);
    });

    data.pipelines.forEach((pipe) => {
        createNode('pipelineNode', pipe);
    });

    data.destinations.forEach((dest) => {
        createNode('destinationNode', dest);
    });

    const endId = createNode('endNode', data.finalTable);

    // Create edges based on the order of nodes
    if (data.sources.length && data.pipelines.length) {
        edges.push({
            id: 'e1',
            source: data.sources[0].ref,
            target: data.pipelines[0].ref,
        });
    }

    if (data.pipelines.length && data.destinations.length) {
        edges.push({
            id: 'e2',
            source: data.pipelines[0].ref,
            target: data.destinations[0].ref,
        });
    }

    if (data.destinations.length) {
        edges.push({
            id: 'e3',
            source: data.destinations[0].ref,
            target: endId,
        });
    }

    // Apply dagre layout
    dagreGraph.setGraph({ rankdir: 'LR' });

    nodes.forEach((node) => {
        dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    nodes.forEach((node) => {
        const nodeWithPosition = dagreGraph.node(node.id);
        node.position = {
            x: nodeWithPosition.x - nodeWidth / 2,
            y: nodeWithPosition.y - nodeHeight / 2,
        };
    });

    return { nodes, edges };
}