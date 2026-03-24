import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/"); // back to login
  };

  return (
    <div style={styles.nav}>
      <h2 style={styles.logo}>🎓 Attendance App</h2>

      <button onClick={handleLogout} style={styles.logout}>
        Logout
      </button>
    </div>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    background: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(10px)",
    color: "white",
    borderBottom: "1px solid rgba(255,255,255,0.2)"
  },
  logo: {
    margin: 0
  },
  logout: {
    padding: "8px 15px",
    background: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  }
};

export default Navbar;