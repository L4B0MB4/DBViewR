import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  NodeChange,
  Panel,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import { getLayoutedElements } from "./layout/autolayout";
import { DefaultNode } from "./nodes/default/DefaultNode";
import { TableViewNode } from "./nodes/tableview/TableViewNode";
import { useFlowPreparation } from "./useFlowPreparation";

const nodeTypes = { default: DefaultNode, tableView: TableViewNode };

export const Flow = () => {
  const { fitView, getNodes, getEdges } = useReactFlow();
  const [nodes, setNodes, onNodesChange, edges, setEdges, onEdgesChange, onConnect] = useFlowPreparation();
  console.log(nodes);
  const onLayout = () => {
    const x = getLayoutedElements(getNodes(), getEdges());
    setNodes([...x.nodes]);
    setEdges([...x.edges]);
    window.requestAnimationFrame(() => {
      fitView({
        duration: 500,
      });
    });
  };

  const onNodesChangeImpr = (changes: Array<NodeChange>) => {
    // call the actual change handler to apply the node changes to your nodes
    onNodesChange(changes);
    // loop through the changes and check for a dimensions change that relates to the node we want to focus
    /* changes.forEach((change) => {
      
  const focusId = "dboTable1";
            if (
        change.type === "dimensions" &&
        focusId === change.id &&
        change.dimensions &&
        change.dimensions.height > 0 &&
        change.dimensions.width > 0
      ) {
        fitView({
          nodes: [{ id: focusId }],
          duration: 500,
        });

        // reset the focus id so we don't retrigger fit view when the dimensions of this node happen to change
        //setFocusId(null);
      } 
    });*/
  };
  return (
    <>
      <div style={{ width: "100vw", height: "100vh" }}>
        <ReactFlow
          maxZoom={10}
          minZoom={0.1}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChangeImpr}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
        >
          <Controls />
          <MiniMap />
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
          <Panel position="bottom-center">
            <button onClick={() => onLayout()}>vertical layout</button>
          </Panel>
        </ReactFlow>
      </div>
    </>
  );
};
