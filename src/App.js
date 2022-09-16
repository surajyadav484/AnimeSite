import { HomePage, SearchBar } from "./features/components/HomePage";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

function App() {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <HomePage />
      </DndProvider>
    </div>
  );
}

export default App;
