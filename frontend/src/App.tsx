import "./App.css";
import Delete from "./components/Delete";
import Get from "./components/Get";
import Update from "./components/Update";

function App() {
  return (
    <div className="App">
      <Get />
      <Update />
      <Delete />
    </div>
  );
}

export default App;
