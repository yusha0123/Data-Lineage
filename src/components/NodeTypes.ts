import StartNode from './nodes/StartNode';
import PipelineNode from './nodes/PipelineNode';
import DestinationNode from './nodes/DestinationNode';
import EndNode from './nodes/EndNode';
import DimensionNode from './nodes/DimensionNode';
import FactNode from './nodes/FactNode';
import TableNode from './nodes/TableNode';

export const nodeTypes = {
    startNode: StartNode,
    pipelineNode: PipelineNode,
    destinationNode: DestinationNode,
    endNode: EndNode,
    factNode: FactNode,
    dimensionNode: DimensionNode,
    tableNode: TableNode
};
