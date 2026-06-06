import { useState, useEffect } from "react";
import "../styles/StudentCSVImport.css";
import { useNavigate } from "react-router-dom";

export default function StudentCSVImport() {
  const navigate = useNavigate();
  const [previewRows, setPreviewRows] = useState([]);
  const [instructor] = useState(() => ({
    name: localStorage.getItem("instructorName") || "Unknown Instructor",
    email: localStorage.getItem("instructorEmail") || "No Email Found",
  }));

  // AUTH CHECK
  useEffect(() => {
    const id = localStorage.getItem("instructorId");
    if (!id) {
      alert("Please log in first");
      navigate("/login");
    }
  }, [navigate]);

  // CSV UPLOAD HANDLER
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result.trim();
      const rows = text.split("\n").map((r) => r.split(","));
      setPreviewRows(rows.slice(1)); // skip header
    };
    reader.readAsText(file);
  };

  return (
    <div className="page-layout">

      {/* LEFT COLUMN (drawer + info box) */}
      <div className="sidebar-column">

        {/* LEFT DRAWER */}
        <aside className="left-drawer">
          <div className="drawer-header">
            <span className="drawer-title">Academic Progress Tracker</span>
          </div>

          <nav className="drawer-nav">
            <button className="drawer-item">Sync Curriculum</button>

            <button
              className="drawer-item active"
              onClick={() => navigate("/student-csv-import")}
            >
              Students Management & CSV Import
            </button>

            <button
              className="drawer-item"
              onClick={() => navigate("/instructor")}
            >
              Instructor Interface
            </button>
          </nav>
        </aside>

        {/* INFO BOX BELOW DRAWER */}
        <div className="instructor-info-panel">
          <div className="instructor-name">{instructor.name}</div>
          <div className="instructor-email">{instructor.email}</div>

          <button
            className="logout-btn"
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
          >
            Logout
          </button>
        </div>

      </div>

      {/* MAIN CONTENT */}
      <main className="main-content">

        {/* TOP BAR */}
        <div className="csv-header">
          <h1>Students Management & CSV Import</h1>
        </div>

        {/* UPLOAD BOX */}
        <div className="upload-box">
          <div className="upload-icon">☁️</div>

          <label className="upload-btn">
            Upload file
            <input type="file" accept=".csv" onChange={handleFileUpload} hidden />
          </label>
        </div>

        {/* PREVIEW TABLE */}
        <h2 className="preview-title">Preview</h2>

        <table className="preview-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Student Number</th>
              <th>Email</th>
              <th>Program</th>
              <th>Campus</th>
              <th>Year</th>
            </tr>
          </thead>

          <tbody>
            {previewRows.length === 0 ? (
              <tr>
                <td colSpan="7" className="empty-preview">
                  No data loaded
                </td>
              </tr>
            ) : (
              previewRows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j}>{cell}</td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>

      </main>
    </div>
  );
}
