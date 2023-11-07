
import React, { useCallback, useEffect, useMemo } from "react";
import { Edge, Node } from "reactflow";



import ELK from 'elkjs/lib/elk.bundled.js';
const elk = new ELK();

// Elk has a *huge* amount of options to configure. To see everything you can
// tweak check out:
//
// - https://www.eclipse.org/elk/reference/algorithms.html
// - https://www.eclipse.org/elk/reference/options.html
const elkOptions = {
  'elk.algorithm': 'layered',
  'elk.layered.spacing.nodeNodeBetweenLayers': '100',
  'elk.spacing.nodeNode': '80',
};

const getLayoutedElements = (nodes:Array<Node>, edges:Array<Edge>, options:any = {}) => {
  const isHorizontal = options?.['elk.direction'] === 'RIGHT';
  const graph = {
    id: 'root',
    layoutOptions: options,
    children: nodes.map((node) => ({
      ...node,
      // Adjust the target and source handle positions based on the layout
      // direction.
      targetPosition: isHorizontal ? 'left' : 'top',
      sourcePosition: isHorizontal ? 'right' : 'bottom',

      // Hardcode a width and height for elk to use when layouting.
      width: 150,
      height: 50,
    })),
    edges: edges,
  };

  return elk
    .layout(graph as any )
    .then((layoutedGraph) => ({
      nodes: layoutedGraph!.children!.map((node) => ({
        ...node,
        // React Flow expects a position property on the node instead of `x`
        // and `y` fields.
        position: { x: node.x, y: node.y },
      })),

      edges: layoutedGraph.edges,
    }))
    .catch(console.error);
};


export const useAutoLayout=(nodes:Array<Node>,edges:Array<Edge>,setNodes:(nodes:Array<Node>)=>void,setEdges:(nodes:Array<Edge>)=>void,fitView:()=>void)=>{
const onLayout = useCallback(
    ({ direction}:{direction:string,useInitialNodes:boolean}) => {
      const opts = { 'elk.direction': direction, ...elkOptions };

      getLayoutedElements(nodes, edges, opts).then((p) => {
        if(p){
            const { nodes: layoutedNodes, edges: layoutedEdges } = p;
            const newLayoutedNodes = nodes.map(x=>{
                return {...x,...layoutedNodes.find(y=>y.id ===y.id)} as unknown as Node
            })
            setNodes(newLayoutedNodes);
            setEdges(layoutedEdges as unknown as Array<Edge>);
        }

        window.requestAnimationFrame(() => fitView());
      });
    },
    [nodes, edges]
  );
    return [onLayout];
}