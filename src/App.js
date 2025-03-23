import './App.css';
import Wizard from "./components/Wizard";

function App() {
  return (
    <div className="App min-h-screen bg-gray-900 p-4">
      <h1 className="text-3xl text-white mt-8 mb-16">☀️ Your Perfect Day ☀️</h1>
      <div className="flex justify-center items-center ">
        <Wizard />
      </div>
    </div>
  );
}

export default App;
