/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { Node, Edge } from "../types/flow";
import { saveFlow, getFlows } from "../api/flows";

interface FlowState {
  nodes: Node[];
  edges: Edge[];
  selectedNode: Node | null;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  addNode: (type: Node["type"], position: { x: number; y: number }) => void;
  updateNode: (id: string, data: any) => void;
  selectNode: (node: Node | null) => void;
  saveCurrentFlow: () => Promise<void>;
  loadFlows: () => Promise<void>;
}

export const useFlowStore = create<FlowState>((set, get) => ({
  nodes: [],
  edges: [],
  selectedNode: null,
  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
  addNode: (type, position) => {
    const newNode: Node = {
      id: `${type}-${Date.now()}`,
      type,
      position,
      data: { label: type.charAt(0).toUpperCase() + type.slice(1) },
    };

    set((state) => ({
      nodes: [...state.nodes, newNode],
    }));
  },
  updateNode: (id, data) => {
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...data } } : node
      ),
    }));
  },
  selectNode: (node) => set({ selectedNode: node }),
  saveCurrentFlow: async () => {
    const { nodes, edges } = get();
    await saveFlow({
      name: "Email Sequence",
      nodes,
      edges,
    });
  },
  loadFlows: async () => {
    const flows = await getFlows();
    if (flows.length > 0) {
      const latestFlow = flows[0];
      set({
        nodes: latestFlow.nodes,
        edges: latestFlow.edges,
      });
    }
  },
}));
