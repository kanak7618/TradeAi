import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

function App() {
    const token = localStorage.getItem("token");

    return (
        <Router>
            <Routes>
                {token ? (
                    <Route path="*" element={<Dashboard />} />
                ) : (
                    <Route path="*" element={<Login />} />
                )}
            </Routes>
        </Router>
    );
}

export default App;