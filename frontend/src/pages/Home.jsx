import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Home() {
  const [attendance, setAttendance] = useState([]);
  const [form, setForm] = useState({
    id: null,
    studentName: "",
    date: "",
    status: ""
  });

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    const res = await axios.get("http://localhost:8080/attendance");
    setAttendance(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.id) {
      await axios.put(`http://localhost:8080/attendance/${form.id}`, form);
    } else {
      await axios.post("http://localhost:8080/attendance", form);
    }

    setForm({ id: null, studentName: "", date: "", status: "" });
    fetchAttendance();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8080/attendance/${id}`);
    fetchAttendance();
  };

  const handleEdit = (record) => {
    setForm(record);
  };

  return (
    <div style={styles.page}>
      <Navbar />

      <div style={styles.container}>
        <h1 style={styles.heading}>📘 Attendance Dashboard</h1>

        {/* FORM CARD */}
        <div style={styles.card}>
          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              name="studentName"
              placeholder="Student Name"
              value={form.studentName}
              onChange={handleChange}
              style={styles.input}
            />

            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              style={styles.input}
            />

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="">Select Status</option>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </select>

            <button type="submit" style={styles.button}>
              {form.id ? "Update" : "Add Record"}
            </button>
          </form>
        </div>

        {/* TABLE CARD */}
        <div style={styles.card}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {attendance.map((a) => (
                <tr key={a.id}>
                  <td>{a.studentName}</td>
                  <td>{a.date}</td>
                  <td
                    style={{
                      color: a.status === "Present" ? "#22c55e" : "#ef4444",
                      fontWeight: "bold"
                    }}
                  >
                    {a.status}
                  </td>
                  <td>
                    <button onClick={() => handleEdit(a)} style={styles.edit}>
                      ✏️
                    </button>
                    <button onClick={() => handleDelete(a.id)} style={styles.delete}>
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    fontFamily: "Poppins"
  },

  container: {
    padding: "20px"
  },

  heading: {
    textAlign: "center",
    color: "white",
    marginBottom: "20px"
  },

  card: {
    background: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(10px)",
    padding: "20px",
    borderRadius: "15px",
    marginBottom: "20px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
  },

  form: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    justifyContent: "center"
  },

  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    outline: "none"
  },

  button: {
    padding: "10px 15px",
    background: "#22c55e",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold"
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    color: "white"
  },

  edit: {
    marginRight: "5px",
    padding: "5px 10px",
    background: "#f59e0b",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },

  delete: {
    padding: "5px 10px",
    background: "#ef4444",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }
};

export default Home;