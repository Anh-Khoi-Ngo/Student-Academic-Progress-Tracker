import { useState } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";

const login = async (email, password) => {
  const response = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    return { error: data.error || data.message || "Login failed" };
  }

  return data;
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const result = await login(email, password);

      if (result.error) {
        setError(result.error);
        console.log("Login error:", result.error);
      } else {
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
        alert("Login successful");
        navigate("/instructor");
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError("Login failed");
    }
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
            type={showPassword ? "text" : "password"}
            placeholder=" "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label>Password</label>

          <span
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
          </span>
        </div>

        <p className="error">{error}</p>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}