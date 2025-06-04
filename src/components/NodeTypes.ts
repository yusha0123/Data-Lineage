
import StartNode from './nodes/StartNode';
import PipelineNode from './nodes/PipelineNode';
import DestinationNode from './nodes/DestinationNode';
import EndNode from './nodes/EndNode';

export const nodeTypes = {
    startNode: StartNode,
    pipelineNode: PipelineNode,
    destinationNode: DestinationNode,
    endNode: EndNode,
};
