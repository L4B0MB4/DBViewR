import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';

const handleStyle = { left: 10 };

export const DefaultNode = () => {

    return (
        <>
            <Handle type="target" position={Position.Top} id="ab" />
            <div>
                halloo
            </div>
            <Handle type="source" position={Position.Bottom} id="a" />
        </>
    );
}