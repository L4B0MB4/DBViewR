import { ReactFlowProvider } from "reactflow";
import "./App.css";
import { Flow } from "./flow/Flow";
import { useAppDispatch } from "./state/hooks";

function App() {
  const dispatch = useAppDispatch();
  console.log(dispatch);
  return (
    <>
      <ReactFlowProvider>
        <Flow />
      </ReactFlowProvider>
    </>
  );
}

export default App;
