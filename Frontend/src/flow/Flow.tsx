import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
  useNodes,
  useReactFlow,
  useEdges,
} from "reactflow";
import { useCallback, useEffect, useMemo } from "react";
import "reactflow/dist/style.css";
import { DefaultNode } from "./nodes/default/DefaultNode";
import { TableViewNode } from "./nodes/tableview/TableViewNode";
import { useFlowPreparation } from "./useFlowPreparation";
import dagre from "dagre";

const nodeTypes = { default: DefaultNode, tableView: TableViewNode };

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 36;

const getLayoutedElements = (nodes, edges, direction = "TB") => {
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? "left" : "top";
    node.sourcePosition = isHorizontal ? "right" : "bottom";

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes, edges };
};

export const Flow = () => {
  const [nodes, setNodes, onNodesChange, edges, setEdges, onEdgesChange, onConnect] = useFlowPreparation();

  const onLayout = useCallback(() => {
    console.log("hier");
    const { nodes: nodesLayouted, edges: edgesLayouted } = getLayoutedElements(nodes, edges);
    setNodes(nodesLayouted);
    setEdges(edgesLayouted);
  }, [nodes, edges]);

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
