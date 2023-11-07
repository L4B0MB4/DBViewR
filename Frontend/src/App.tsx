import { useEffect } from "react";
import { ReactFlowProvider } from "reactflow";
import "./App.css";
import { Flow } from "./flow/Flow";
import { useAppDispatch } from "./state/hooks";

function App() {
  const dispatch = useAppDispatch();
  console.log(dispatch);
  useEffect(() => {
    fetch("/api/hello");
  });
  return (
    <>
      <ReactFlowProvider>
        <Flow />
      </ReactFlowProvider>
    </>
  );
}

export default App;
