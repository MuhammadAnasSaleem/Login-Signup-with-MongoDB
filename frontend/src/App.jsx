import Signup from "./pages/signup";
import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedPage from "./pages/ProtectedPage";
import ProtectedRouteChecker from "./components/ProtectedRouteChecker";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/protected" element={<ProtectedPage />} />

        {/* */}
      </Routes>
    </Router>
  );
}

export default App;
