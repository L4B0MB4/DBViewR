import { useCallback, useEffect } from "react";
import { Connection, Edge, Node, OnEdgesChange, OnNodesChange, addEdge, useEdgesState, useNodesState } from "reactflow";
import { Table } from "../state/features/erm/erm";
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
  const tableDatas = useAppSelector((s) => s.tabledata.tableWithData);
  const [nodes, setNodes, onNodesChange] = useNodesState<Table>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    console.log("tables");
    const tableNodes = tables.map((x, i) => {
      const tableData = tableDatas.find((y) => y.Schema == x.Schema && y.Name == x.Name);
      console.log(tableData);
      return {
        id: x.Schema + x.Name,
        type: !tableData ? "default" : "tableView",
        position: { x: 0, y: i * 100 },
        data: x,
      };
    });

    setNodes(tableNodes);
  }, [tables]);
  useEffect(() => {
    console.log("relations");
    const edges = relations.map((x) => ({
      id: x.From.Schema + x.From.Name + x.To.Schema + x.To.Name,
      source: x.From.Schema + x.From.Name,
      target: x.To.Schema + x.To.Name,
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
