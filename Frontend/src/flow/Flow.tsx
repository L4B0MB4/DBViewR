import ReactFlow, { MiniMap, Controls, Background, BackgroundVariant } from "reactflow";
import { useCallback, useEffect, useMemo } from "react";
import "reactflow/dist/style.css";
import { DefaultNode } from "./nodes/default/DefaultNode";
import { TableViewNode } from "./nodes/tableview/TableViewNode";
import { useFlowPreparation } from "./useFlowPreparation";
import { getLayoutedElements } from "./layout/autolayout";

const nodeTypes = { default: DefaultNode, tableView: TableViewNode };

export const Flow = () => {
  const [nodes, setNodes, onNodesChange, edges, setEdges, onEdgesChange, onConnect] = useFlowPreparation();

  const onLayout = () => {
    const x = getLayoutedElements(nodes, edges);
    console.log(x);
    setNodes([...x.nodes]);
    setEdges(x.edges);
  };
  return (
    <>
      <button onClick={() => onLayout()}>vertical layout</button>
      <div style={{ width: "100vw", height: "100vh" }}>
        <ReactFlow
          maxZoom={10}
          minZoom={0.1}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
        >
          <Controls />
          <MiniMap />
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>
      </div>
    </>
  );
};
