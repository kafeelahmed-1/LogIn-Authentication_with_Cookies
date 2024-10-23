import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";

import CustomTable from "./service";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/CustomizedTables" element={<CustomTable />} />{" "}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
