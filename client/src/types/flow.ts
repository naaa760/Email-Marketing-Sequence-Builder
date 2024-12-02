/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Node {
  id: string;
  type: "coldEmail" | "delay" | "leadSource";
  position: { x: number; y: number };
  data: {
    label: string;
    [key: string]: any;
  };
}

export interface Edge {
  id: string;
  source: string;
  target: string;
}
