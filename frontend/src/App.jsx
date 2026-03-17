import { useEffect, useState } from "react";
import axios from "axios";

function App() {
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
      // UPDATE
      await axios.put(`http://localhost:8080/attendance/${form.id}`, form);
    } else {
      // CREATE
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
    <div style={styles.container}>
      <h1 style={styles.heading}>📘 Student Attendance Tracker</h1>

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
          {form.id ? "Update Record" : "Add Record"}
        </button>
      </form>

      <h2 style={styles.subheading}>Attendance Records</h2>

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
                  color: a.status === "Present" ? "green" : "red",
                  fontWeight: "bold"
                }}
              >
                {a.status}
              </td>

              <td>
                <button
                  onClick={() => handleEdit(a)}
                  style={styles.editButton}
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(a.id)}
                  style={styles.deleteButton}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "900px",
    margin: "auto",
    textAlign: "center",
    padding: "20px",
    fontFamily: "Arial"
  },
  heading: {
    color: "#333"
  },
  subheading: {
    marginTop: "20px"
  },
  form: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    marginBottom: "20px",
    flexWrap: "wrap"
  },
  input: {
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc"
  },
  button: {
    padding: "8px 15px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },
  editButton: {
    padding: "5px 10px",
    backgroundColor: "orange",
    color: "white",
    border: "none",
    borderRadius: "5px",
    marginRight: "5px",
    cursor: "pointer"
  },
  deleteButton: {
    padding: "5px 10px",
    backgroundColor: "red",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse"
  }
};

export default App;