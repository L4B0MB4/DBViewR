import { useCallback, useEffect } from "react";
import {
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  useViewport,
  OnNodesChange,
  Edge,
  OnEdgesChange,
  Node,
} from "reactflow";
import { Relation, Table } from "../state/features/erm/erm";
import { useAppSelector } from "../state/hooks";

export const useFlowPreparation = (): [
  Array<Node>,
  React.Dispatch<React.SetStateAction<Node<Table, string | undefined>[]>>,
  OnNodesChange,
  Array<Edge>,
  React.Dispatch<React.SetStateAction<Edge<any>[]>>,
  OnEdgesChange,
  (conn: Connection) => void
] => {
  const tables = useAppSelector((s) => s.erm.tables);
  const relations = useAppSelector((s) => s.erm.relations);
  const [nodes, setNodes, onNodesChange] = useNodesState<Table>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const view = useViewport();
  let step = 1;
  if (view.zoom > 2) {
    step = 2;
  }
  useEffect(() => {
    console.log("tables");
    const tableNodes = tables.map((x, i) => ({
      id: x.Schema + x.Name,
      type: i == 0 ? "default" : "tableView",
      position: { x: 0, y: i * 100 },
      data: x,
    }));
    setNodes(tableNodes);
  }, [tables, step]);
  useEffect(() => {
    console.log("relations");
    const edges = relations.map((x) => ({
      id: x.from.Schema + x.from.Name + x.to.Schema + x.to.Name,
      source: x.from.Schema + x.from.Name,
      target: x.to.Schema + x.to.Name,
    }));
    setEdges(edges);
  }, [relations]);

  const onConnect = useCallback(
    (conn: Connection) => {
      console.log("hier");
      console.log(conn);
      return setEdges((eds) => addEdge(conn, eds));
    },
    [setEdges]
  );

  return [nodes, setNodes, onNodesChange, edges, setEdges, onEdgesChange, onConnect];
};
