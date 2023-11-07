import { useCallback } from 'react';
import { Handle, Node, NodeProps, Position } from 'reactflow';
import { Table } from '../../../state/features/erm/erm';


export const DefaultNode = ({ data }: NodeProps<Table>) => {
    return (
        <>
            <Handle type="target" position={Position.Top} id="ab" />
            <div>
                {data.Schema}.{data.Name}
            </div>
            <Handle type="source" position={Position.Bottom} id="a" />
        </>
    );
}