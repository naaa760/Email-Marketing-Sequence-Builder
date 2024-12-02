/* eslint-disable @typescript-eslint/no-explicit-any */
const API_URL = "http://localhost:5000/api";

export async function saveFlow(flow: {
  name: string;
  nodes: any[];
  edges: any[];
}) {
  const response = await fetch(`${API_URL}/flows`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(flow),
  });

  if (!response.ok) {
    throw new Error("Failed to save flow");
  }

  return response.json();
}

export async function getFlows() {
  const response = await fetch(`${API_URL}/flows`);

  if (!response.ok) {
    throw new Error("Failed to fetch flows");
  }

  return response.json();
}
