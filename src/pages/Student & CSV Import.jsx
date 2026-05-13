import { useState } from "react";
import "../styles/StudentCSVImport.css";

export default function StudentCSVImport() {
  const [previewRows, setPreviewRows] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const rows = text.split("\n").map((r) => r.split(","));
      setPreviewRows(rows.slice(1)); // skip header
    };
    reader.readAsText(file);
  };

  return (
    <div className="page-layout">

      {/* LEFT DRAWER */}
      <aside className="left-drawer">
        <div className="drawer-header">
          <span className="drawer-title">Academic Progress Tracker</span>
        </div>

        <nav className="drawer-nav">
          <button className="drawer-item">Sync Curriculum</button>
          <button className="drawer-item active">Students Management & CSV Import</button>
          <button className="drawer-item">Instructor Interface</button>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <div className="csv-container">

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

      </div>
    </div>
  );
}
