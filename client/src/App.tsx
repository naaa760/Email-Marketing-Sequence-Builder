import { ReactFlowProvider } from "reactflow";
import { Sidebar } from "./components/Sidebar";
import { FlowEditor } from "./components/FlowEditor";
import { Toolbar } from "./components/Toolbar";

function App() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <ReactFlowProvider>
        <div className="flex-1 relative">
          <Toolbar />
          <FlowEditor />
        </div>
      </ReactFlowProvider>
    </div>
  );
}

export default App;
