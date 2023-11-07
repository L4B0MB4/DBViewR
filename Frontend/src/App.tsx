import { useEffect } from "react";
import { ReactFlowProvider } from "reactflow";
import "./App.css";
import { Flow } from "./flow/Flow";
import { fetchRelations, fetchTables } from "./state/features/erm/erm";
import { useAppDispatch } from "./state/hooks";

function App() {
  const dispatch = useAppDispatch();
  console.log(dispatch);
  useEffect(() => {
    dispatch(fetchTables());
    dispatch(fetchRelations());
  }, []);

  return (
    <>
      <ReactFlowProvider>
        <Flow />
      </ReactFlowProvider>
    </>
  );
}

export default App;
