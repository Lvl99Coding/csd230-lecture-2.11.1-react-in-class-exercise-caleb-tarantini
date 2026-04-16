import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { useAuth } from "../provider/authProvider";
import api from "../api/axiosConfig";

const Login = () => {
    const { setToken } = useAuth();
    const navigate = useNavigate();

    // NEW for 2.12.1: Use location to check for "expired" query parameter
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const isExpired = queryParams.get("expired");

    const [email, setEmail] = useState(""); // Variable named 'email' to match Backend LoginReq
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous errors

        try {
            // 1. Call the Spring Boot AuthController
            // We pass { email, password } to match the LoginReq.java POJO
            const res = await api.post("/auth/login", { email, password });

            // 2. Save the JWT to context (which also updates localStorage)
            setToken(res.data.token);

            // 3. Redirect to home page
            // 'replace: true' prevents the user from clicking "back" to the login page
            navigate("/", { replace: true });
        } catch (err) {
            console.error("Login Error:", err.response?.data || err.message);
            setError("Invalid username or password. Please try again.");
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Bookstore Admin</h1>
            <h2>Sign In</h2>

            {/* NEW for 2.12.1: Session Expired Warning */}
            {isExpired && (
                <div style={{
                    backgroundColor: '#fff3cd',
                    color: '#856404',
                    padding: '12px',
                    borderRadius: '5px',
                    display: 'inline-block',
                    marginBottom: '20px',
                    border: '1px solid #ffeeba',
                    fontWeight: 'bold'
                }}>
                    ⚠️ Your session has expired. Please log in again to continue.
                </div>
            )}

            {/* Error Message Display */}
            {error && (
                <p style={{
                    color: "white",
                    backgroundColor: "#ff4444",
                    padding: "10px",
                    borderRadius: "5px",
                    display: "inline-block"
                }}>
                    {error}
                </p>
            )}

            <br />

            <form onSubmit={handleLogin} className="form-style">
                <div className="form-group">
                    <label>Username:</label><br/>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="form-input"
                        placeholder="e.admin"
                    />
                    <small className="form-hint">Hint: try 'admin' or 'user'</small>
                </div>

                <div className="form-group">
                    <label>Password:</label><br/>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="form-input"
                    />
                </div>

                <button type="submit" className="form-button">Login</button>
            </form>
        </div>
    );
};

export default Login;