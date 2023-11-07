
import "./App.css";
import { Flow } from "./flow/Flow";
import { useAppDispatch } from "./state/hooks";

function App() {

  const dispatch = useAppDispatch()
  console.log(dispatch)
  return (
    <>
      <Flow />
    </>
  );
}

export default App;
