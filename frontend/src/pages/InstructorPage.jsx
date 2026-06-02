import { useState, useEffect, useMemo } from "react";
import "../styles/InstructorPage.css";
import { useNavigate } from "react-router-dom";

export default function InstructorPage() {
  const navigate = useNavigate();

  const BACKEND = "http://10.157.123.59/backend";

  const [students, setStudents] = useState([]);
  const [studentsWithGrades, setStudentsWithGrades] = useState([]);

  // Load all students
  useEffect(() => {
    fetch(`${BACKEND}/students.php`)
      .then(res => res.json())
      .then(setStudents)
      .catch(err => console.error("students.php error:", err));
  }, []);

  // Load grades for each student
  useEffect(() => {
    const load = async () => {
      const enriched = [];

      for (const s of students) {
        const res = await fetch(`${BACKEND}/getStudentsGrades.php?id=${s.studentId}`);
        const grades = await res.json();

        enriched.push({
          ...s,
          grades: grades.reduce((acc, g) => {
            acc[g.Course_code] = {
              title: g.Title,
              grade: g.Status
            };
            return acc;
          }, {})
        });
      }

      setStudentsWithGrades(enriched);
    };

    if (students.length > 0) load();
  }, [students]);

  // Collect all unique course codes
  const allCourses = useMemo(() => {
    const set = new Set();
    studentsWithGrades.forEach(s => {
      Object.keys(s.grades).forEach(code => set.add(code));
    });
    return Array.from(set).sort();
  }, [studentsWithGrades]);

  // Update grade locally
  const updateGrade = (studentId, courseCode, newGrade) => {
    setStudentsWithGrades(prev =>
      prev.map(s =>
        s.studentId === studentId
          ? {
              ...s,
              grades: {
                ...s.grades,
                [courseCode]: {
                  ...s.grades[courseCode],
                  grade: newGrade
                }
              }
            }
          : s
      )
    );
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
          <button className="drawer-item" onClick={() => navigate("/student-csv-import")}>
            Students Management & CSV Import
          </button>
          <button className="drawer-item active" onClick={() => navigate("/instructor")}>
            Instructor Interface
          </button>
        </nav>
      </aside>

      <div className="instructor-container">
        <h1 className="title">Instructor User Interface</h1>

        {/* GRID */}
        <div className="scroll-container">
          <div className="grid-wrapper">
            <table className="course-grid">
              <thead>
                <tr>
                  <th className="sticky-col col-1">First Name</th>
                  <th className="sticky-col col-2">Last Name</th>
                  <th className="sticky-col col-3">Student ID</th>
                  <th className="sticky-col col-4">Email</th>

                  {allCourses.map(code => (
                    <th key={code} className="course-header sticky-top">
                      <div className="course-header-content">
                        <span className="course-code">{code}</span>
                        <span className="course-title">
                          {
                            studentsWithGrades.find(s => s.grades[code])?.grades[code]?.title ||
                            "Unknown"
                          }
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {studentsWithGrades.map(s => (
                  <tr key={s.studentId}>
                    <td className="sticky-col col-1">{s.firstName}</td>
                    <td className="sticky-col col-2">{s.lastName}</td>
                    <td className="sticky-col col-3">{s.studentId}</td>
                    <td className="sticky-col col-4">{s.email}</td>

                    {allCourses.map(code => {
                      const course = s.grades[code];
                      const grade = course?.grade || "Not Started";

                      return (
                        <td key={code} className="cell">
                          <select
                            value={grade}
                            onChange={e =>
                              updateGrade(s.studentId, code, e.target.value)
                            }
                          >
                            <option value="Passed">Passed</option>
                            <option value="Failed">Failed</option>
                            <option value="Active">Active</option>
                            <option value="Withdrawn">Withdrawn</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Not Started">Not Started</option>
                          </select>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
