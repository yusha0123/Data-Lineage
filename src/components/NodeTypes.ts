import StartNode from './nodes/StartNode';
import PipelineNode from './nodes/PipelineNode';
import DestinationNode from './nodes/DestinationNode';
import EndNode from './nodes/EndNode';
import TableNode from './nodes/TableNode';
import AddEndpointNode from './nodes/AddEndpointNode';
import SourceNode from './nodes/SourceNode';
import ETLDestinationNode from './nodes/ETLDestinationNode';
import SplitNode from './nodes/SplitNode';
import AggregateNode from './nodes/AggregateNode';
import FieldRemoverNode from './nodes/FieldRemoverNode';
import JoinNode from './nodes/JoinNode';

export const nodeTypes = {
    startNode: StartNode,
    pipelineNode: PipelineNode,
    destinationNode: DestinationNode,
    endNode: EndNode,
    tableNode: TableNode,
    addEndpointNode: AddEndpointNode,
    sourceNode: SourceNode,
    etlDestinationNode: ETLDestinationNode,
    splitNode: SplitNode,
    aggregateNode: AggregateNode,
    fieldRemoverNode: FieldRemoverNode,
    joinNode: JoinNode,
};
