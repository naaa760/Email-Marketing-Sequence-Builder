/* eslint-disable @typescript-eslint/no-explicit-any */

import { Save } from "lucide-react";
import { useFlowStore } from "../store/flowStore";

export function Toolbar() {
  const saveCurrentFlow = useFlowStore(
    (state: { saveCurrentFlow: any }) => state.saveCurrentFlow
  );

  const handleSave = async () => {
    try {
      await saveCurrentFlow();
      alert("Flow saved successfully!");
    } catch (error) {
      console.error("Failed to save flow:", error);
      alert("Failed to save flow");
    }
  };

  return (
    <div className="absolute top-4 right-4 z-10">
      <button
        onClick={handleSave}
        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        <Save className="w-4 h-4" />
        Save Flow
      </button>
    </div>
  );
}
