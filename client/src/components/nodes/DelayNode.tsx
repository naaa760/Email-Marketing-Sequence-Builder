import { Handle, Position } from "reactflow";
import { Clock } from "lucide-react";

interface DelayNodeProps {
  data: {
    label: string;
    delay?: number;
  };
}

export function DelayNode({ data }: DelayNodeProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 border-2 border-yellow-500 min-w-[200px]">
      <Handle type="target" position={Position.Top} className="w-3 h-3" />
      <div className="flex items-center gap-2">
        <Clock className="w-5 h-5 text-yellow-500" />
        <span className="font-semibold text-gray-800">{data.label}</span>
      </div>
      {data.delay && (
        <div className="text-sm text-gray-600 mt-1">
          Wait for: {data.delay} hours
        </div>
      )}
      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </div>
  );
}
