import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/auth/login", form);
      navigate("/home");
    } catch {
      alert("Invalid Credentials ❌");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back 👋</h2>

        <form onSubmit={handleLogin} style={styles.form}>
          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            style={styles.input}
          />

          <button type="submit" style={styles.button}>
            Login 🚀
          </button>
        </form>

        <p style={styles.text}>
          Don’t have an account?{" "}
          <Link to="/register" style={styles.link}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    fontFamily: "Poppins"
  },

  card: {
    background: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(12px)",
    padding: "30px",
    borderRadius: "15px",
    width: "300px",
    textAlign: "center",
    color: "white",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
  },

  title: {
    marginBottom: "15px"
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },

  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    outline: "none"
  },

  button: {
    padding: "10px",
    background: "#22c55e",
    border: "none",
    borderRadius: "8px",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold"
  },

  text: {
    marginTop: "10px"
  },

  link: {
    color: "#facc15",
    textDecoration: "none"
  }
};

export default Login;