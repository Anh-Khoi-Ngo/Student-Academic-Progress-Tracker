import { useState } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";

// Use your server IP, not localhost
const BACKEND = "http://10.157.123.59/backend";

const login = async (email, password) => {
  try {
    const response = await fetch(`${BACKEND}/login.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok || data.error) {
      return { error: data.error || "Login failed" };
    }

    return data;

  } catch (err) {
    console.error("Login request failed:", err);
    return { error: "Server connection failed" };
  }
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!password.trim()) {
      setError("Password is required");
      return;
    }

    const result = await login(email, password);

    if (result.error) {
      setError(result.error);
      return;
    }

    // Save token + user info
    localStorage.setItem("token", result.token);
    localStorage.setItem("user", JSON.stringify(result.user));
    
    alert("Login successful!");
    navigate("/instructor");
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleLogin}>
        <h2>Student Academic Progress Tracker</h2>

        <div className="floating-label">
          <input
            type="email"
            placeholder=" "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Email</label>
        </div>

        <div className="floating-label">
          <input
            type="password"
            placeholder=" "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label>Password</label>
        </div>

        <p className="error">{error}</p>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
