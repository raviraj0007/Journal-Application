import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage"; // ✅ Add this
import JournalList from "./pages/JournalList";

function App() {
  return (
    <Router>
      <Routes>
      
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} /> {/* ✅ Added */}
        <Route path="/journals" element={<JournalList />} />
      </Routes>
    </Router>
  );
}

export default App;
