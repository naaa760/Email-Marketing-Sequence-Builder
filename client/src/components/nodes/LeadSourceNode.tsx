import { Handle, Position } from "reactflow";
import { Users } from "lucide-react";

interface LeadSourceNodeProps {
  data: {
    label: string;
    source?: string;
  };
}

export function LeadSourceNode({ data }: LeadSourceNodeProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 border-2 border-green-500 min-w-[200px]">
      <div className="flex items-center gap-2">
        <Users className="w-5 h-5 text-green-500" />
        <span className="font-semibold text-gray-800">{data.label}</span>
      </div>
      {data.source && (
        <div className="text-sm text-gray-600 mt-1">Source: {data.source}</div>
      )}
      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </div>
  );
}
