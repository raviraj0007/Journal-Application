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
    <div className="d-flex justify-content-center align-items-center vh-100 bg-danger">
      <div className="card shadow p-4" style={{ maxWidth: "500px", width: "100%" }}>
        <div className="text-center mb-3">
          <img
            src="https://img.icons8.com/ios/512/ff0000/journal.png"
            alt="Journal Logo"
            style={{ height: "60px" }}
          />
          <h3 className="mt-3">Welcome to Journal App</h3>
          <p className="text-muted">Please login to continue</p>
        </div>

        <form onSubmit={handleLogin}>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>

          <div className="mb-2 d-flex justify-content-between align-items-center">
            <a href="/forgot-password" className="small text-muted">Forgot password?</a>
            <div>
              <input type="checkbox" id="remember" className="me-1" />
              <label htmlFor="remember" className="small text-muted">Remember</label>
            </div>
          </div>

          <button type="submit" className="btn btn-dark w-100 mb-2">
            Login
          </button>
          <button
            type="button"
            className="btn btn-outline-dark w-100"
            onClick={handleSignUp}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
