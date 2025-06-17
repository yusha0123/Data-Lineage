import StartNode from './nodes/StartNode';
import PipelineNode from './nodes/PipelineNode';
import DestinationNode from './nodes/DestinationNode';
import EndNode from './nodes/EndNode';
import TableNode from './nodes/TableNode';
import AddSourceDestNode from './nodes/AddSourceDestNode';
import SourceNode from './nodes/SourceNode';
import ETLDestinationNode from './nodes/ETLDestinationNode';

export const nodeTypes = {
    startNode: StartNode,
    pipelineNode: PipelineNode,
    destinationNode: DestinationNode,
    endNode: EndNode,
    tableNode: TableNode,
    addSourceDestNode: AddSourceDestNode,
    sourceNode: SourceNode,
    etlDestinationNode: ETLDestinationNode
};
