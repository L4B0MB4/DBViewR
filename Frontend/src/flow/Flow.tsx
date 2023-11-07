import React, { useCallback, useEffect, useMemo } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant,
  Connection,
} from "reactflow";

import "reactflow/dist/style.css";
import { DefaultNode } from "./nodes/default/DefaultNode";
import { useAppDispatch, useAppSelector } from "../state/hooks";

const nodeTypes = { default: DefaultNode }

export const Flow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const tables = useAppSelector(s => s.erm.tables)
  const relations = useAppSelector(s => s.erm.relations)
  useEffect(() => {
    console.log("tables")
    const tableNodes = tables.map((x, i) => ({ id: x.Schema + x.Name, position: { x: 0, y: i * 100 }, data: x }))
    setNodes(tableNodes)
  }, [tables])
  useEffect(() => {
    console.log("relations")
    const edges = relations.map((x) => ({ id: x.from.Schema + x.from.Name, source: x.from.Schema + x.from.Name, target: x.to.Schema + x.to.Name }))
    setEdges(edges)
  }, [relations])

  const onConnect = useCallback(
    (conn: Connection) => {
      console.log("hier");
      console.log(conn);
      return setEdges((eds) => addEdge(conn, eds));
    },
    [setEdges]
  );

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
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
  );
};
