import "./App.css"; // a plugin!
import Calendar from "./components/Calendar";
import Modal from "react-modal";

Modal.setAppElement("#root");

function App() {
  return (
    <div className="App">
      <Calendar />
    </div>
  );
}

export default App;
