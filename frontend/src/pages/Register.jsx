import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/auth/register", form);
      alert("Registered Successfully ✅");
      navigate("/");
    } catch {
      alert("Error ❌");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account ✨</h2>

        <form onSubmit={handleRegister} style={styles.form}>
          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            style={styles.input}
          />

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
            Register 🚀
          </button>
        </form>

        <p style={styles.text}>
          Already have an account?{" "}
          <Link to="/" style={styles.link}>
            Login
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
    background: "linear-gradient(135deg, #ff7e5f, #feb47b)",
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
    background: "#3b82f6",
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
    color: "#fde047",
    textDecoration: "none"
  }
};

export default Register;