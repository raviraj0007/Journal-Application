import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../api/journalApi";

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    try {
      await createUser({ userName: username, email, password });
      navigate("/"); // Redirect to login after signup
    } catch (err) {
      setError("Signup failed. Please try a different username or check your details.");
    }
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
          <h3 className="mt-3">Create Your Journal Account</h3>
          <p className="text-muted">Start documenting your journey</p>
        </div>
        <form onSubmit={handleSignUp}>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choose a username"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
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
              placeholder="Create a password"
              autoComplete="new-password"
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your password"
              autoComplete="new-password"
            />
          </div>
          <button type="submit" className="btn btn-dark w-100 mb-2">
            Create Account
          </button>
          <button
            type="button"
            className="btn btn-outline-dark w-100"
            onClick={() => navigate("/")}
          >
            Already have an account? Login
          </button>
        </form>
      </div>
    </div>
  );
}
