/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect } from "react";
import ReactFlow, {
  Background,
  Controls,
  NodeTypes,
  OnConnect,
  Connection,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";

import { ColdEmailNode } from "./nodes/ColdEmailNode";
import { DelayNode } from "./nodes/DelayNode";
import { LeadSourceNode } from "./nodes/LeadSourceNode";
import { NodeEditor } from "./modals/NodeEditor";
import { useFlowStore } from "../store/flowStore";

const nodeTypes: NodeTypes = {
  coldEmail: ColdEmailNode,
  delay: DelayNode,
  leadSource: LeadSourceNode,
};

export function FlowEditor() {
  const {
    nodes,
    edges,
    selectedNode,
    setNodes,
    setEdges,
    addNode,
    selectNode,
    loadFlows,
  } = useFlowStore();
  const { project } = useReactFlow();

  useEffect(() => {
    loadFlows().catch(console.error);
  }, [loadFlows]);

  const onConnect: OnConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds: string | any[]) => [
        ...eds,
        { ...connection, id: `e${eds.length + 1}` },
      ]);
    },
    [setEdges]
  );

  const onNodeClick = useCallback(
    (_: any, node: any) => {
      selectNode(node);
    },
    [selectNode]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");
      if (!type) return;

      const position = project({
        x: event.clientX - 240,
        y: event.clientY - 40,
      });

      addNode(type as any, position);
    },
    [project, addNode]
  );

  return (
    <div className="flex-1 h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={(changes) =>
          setNodes(
            nodes.map((n: { id: any }) => {
              const change = changes.find((c) => c.id === n.id);
              return change?.type === "position"
                ? { ...n, position: change.position }
                : n;
            })
          )
        }
        onEdgesChange={(changes) =>
          setEdges(
            edges.map((e: { id: any }) => {
              const change = changes.find((c) => c.id === e.id);
              return change ? { ...e, ...change } : e;
            })
          )
        }
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        onDragOver={onDragOver}
        onDrop={onDrop}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
      {selectedNode && (
        <NodeEditor node={selectedNode} onClose={() => selectNode(null)} />
      )}
    </div>
  );
}
