import { Handle, Position } from "reactflow";
import { Mail } from "lucide-react";

interface ColdEmailNodeProps {
  data: {
    label: string;
    subject?: string;
    body?: string;
  };
}

export function ColdEmailNode({ data }: ColdEmailNodeProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 border-2 border-blue-500 min-w-[200px]">
      <Handle type="target" position={Position.Top} className="w-3 h-3" />
      <div className="flex items-center gap-2 mb-2">
        <Mail className="w-5 h-5 text-blue-500" />
        <span className="font-semibold text-gray-800">{data.label}</span>
      </div>
      {data.subject && (
        <div className="text-sm text-gray-600 mb-1">
          Subject: {data.subject}
        </div>
      )}
      {data.body && (
        <div className="text-sm text-gray-600 truncate">Body: {data.body}</div>
      )}
      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </div>
  );
}
