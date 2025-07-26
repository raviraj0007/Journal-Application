import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { setBasicAuth, getJournals } from "../api/journalApi";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setBasicAuth(username, password);
    try {
      await getJournals(); // Try to fetch journals to check credentials
      setUser({ username });
      navigate("/journals");
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("User not present");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className="min-h-screen bg-danger d-flex justify-content-center align-items-center p-3">
      <div className="card shadow-lg p-4 p-md-5" style={{ 
        maxWidth: "500px", 
        width: "100%",
        minWidth: "280px"
      }}>
        <div className="text-center mb-3 mb-md-4">
          <div className="d-flex justify-content-center mb-3">
            <img
              src="https://img.icons8.com/ios/512/ff0000/journal.png"
              alt="Journal Logo"
              className="img-fluid"
              style={{ height: "60px", maxHeight: "80px" }}
            />
          </div>
          <h3 className="mt-3 mt-md-4 fs-4 fs-md-3">Welcome to Journal App</h3>
          <p className="text-muted mb-0 fs-6 fs-md-5">Please login to continue</p>
        </div>

        <form onSubmit={handleLogin}>
          {error && <div className="alert alert-danger fs-6">{error}</div>}
          <div className="mb-3">
            <label className="form-label fw-medium">Username</label>
            <input
              type="text"
              className="form-control form-control-lg"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-medium">Password</label>
            <input
              type="password"
              className="form-control form-control-lg"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>

          <div className="mb-3 d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-2">
            <a href="/forgot-password" className="small text-muted text-decoration-none">Forgot password?</a>
            <div className="d-flex align-items-center">
              <input type="checkbox" id="remember" className="me-2" />
              <label htmlFor="remember" className="small text-muted mb-0">Remember</label>
            </div>
          </div>

          <button type="submit" className="btn btn-dark w-100 mb-3 py-2 py-md-3 fs-6">
            Login
          </button>
          <button
            type="button"
            className="btn btn-outline-dark w-100 py-2 py-md-3 fs-6"
            onClick={handleSignUp}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
