import React from "react";
import { Node } from "../../types/flow";
import { useFlowStore } from "../../store/flowStore";

interface NodeEditorProps {
  node: Node;
  onClose: () => void;
}

export function NodeEditor({ node, onClose }: NodeEditorProps) {
  const updateNode = useFlowStore((state) => state.updateNode);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    updateNode(node.id, { ...node.data, ...data });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">Edit {node.type}</h2>
        <form onSubmit={handleSubmit}>
          {node.type === "coldEmail" && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  defaultValue={node.data.subject}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Body</label>
                <textarea
                  name="body"
                  defaultValue={node.data.body}
                  className="w-full p-2 border rounded h-32"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">To</label>
                <input
                  type="email"
                  name="to"
                  defaultValue={node.data.to}
                  className="w-full p-2 border rounded"
                />
              </div>
            </>
          )}
          {node.type === "delay" && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Delay (hours)
              </label>
              <input
                type="number"
                name="delay"
                defaultValue={node.data.delay}
                min="1"
                className="w-full p-2 border rounded"
              />
            </div>
          )}
          {node.type === "leadSource" && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Source</label>
              <input
                type="text"
                name="source"
                defaultValue={node.data.source}
                className="w-full p-2 border rounded"
              />
            </div>
          )}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
