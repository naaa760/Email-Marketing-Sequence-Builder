import React from "react";
import { Mail, Clock, Users } from "lucide-react";
import { useFlowStore } from "../store/flowStore";

export function Sidebar() {
  const addNode = useFlowStore((state) => state.addNode);

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4">
      <h2 className="text-lg font-semibold mb-4">Node Types</h2>
      <div className="space-y-3">
        <div
          className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg cursor-move hover:bg-blue-100 transition-colors"
          draggable
          onDragStart={(e) => onDragStart(e, "coldEmail")}
        >
          <Mail className="w-5 h-5 text-blue-500" />
          <span>Cold Email</span>
        </div>
        <div
          className="flex items-center gap-2 p-3 bg-yellow-50 rounded-lg cursor-move hover:bg-yellow-100 transition-colors"
          draggable
          onDragStart={(e) => onDragStart(e, "delay")}
        >
          <Clock className="w-5 h-5 text-yellow-500" />
          <span>Delay</span>
        </div>
        <div
          className="flex items-center gap-2 p-3 bg-green-50 rounded-lg cursor-move hover:bg-green-100 transition-colors"
          draggable
          onDragStart={(e) => onDragStart(e, "leadSource")}
        >
          <Users className="w-5 h-5 text-green-500" />
          <span>Lead Source</span>
        </div>
      </div>
    </div>
  );
}
