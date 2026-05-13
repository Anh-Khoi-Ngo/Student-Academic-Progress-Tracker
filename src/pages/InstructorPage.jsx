import { useState, useMemo } from "react";
import "../styles/InstructorPage.css";

export default function InstructorPage() {
  const termMap = useMemo(() => ({
    "Fall 2025": [
      "COMM1281A", "DATA1054A", "MATH1300A", "MULT1190A",
      "OSSE1101A", "PERS1274A", "PROG1337A", "SAAL1882A"
    ],
    "Winter 2026": [
      "DATA1055A", "ETHI1075A", "OSSE1100A", "PROG1338A",
      "PROG1339B", "PROG1340A", "SECU1322C", "SYST1088A"
    ],
    "Fall 2026": [
      "PERS1313A", "PROG1341A", "PROG1342A", "PROG1343A", "PROG1346A"
    ],
    "Winter 2027": [
      "COMM1282A", "PROG1344A", "PROG1345A"
    ],
    "Spring/Summer 2027": [
      "PROG1357A", "PROG1358A"
    ]
  }), []);

  const courseTitles = {
    COMM1281A: "Written, Interpersonal, and Intrapersonal Skills Development",
    DATA1054A: "Database Design and SQL",
    MATH1300A: "Computer Math and Statistics",
    MULT1190A: "Responsive Web Design",
    OSSE1101A: "Operating and File Systems Concepts",
    PERS1274A: "Orientation to Community Services",
    PROG1337A: "Programming Fundamentals",
    SAAL1882A: "Introduction to Source Control",
    DATA1055A: "Intermediate SQL for Developers",
    ETHI1075A: "Ethics for Computing Professionals",
    OSSE1100A: "Command Line Interface: Bash",
    PROG1338A: "Object Oriented Programming",
    PROG1339B: "JavaScript Programming",
    PROG1340A: "Database Programming",
    SECU1322C: "Work Safely",
    SYST1088A: "Software Engineering",
    PERS1313A: "Employment Readiness",
    PROG1341A: "Advanced JavaScript",
    PROG1342A: "Server-Side Web: MVC Framework",
    PROG1343A: "PHP",
    PROG1346A: "Enterprise Java",
    COMM1282A: "Technical Research and Writing for IT",
    PROG1344A: "Applied Software Architecture",
    PROG1345A: "Networking for Programmers",
    PROG1357A: "Field Experience: Software Development",
    PROG1358A: "Capstone Project: Software Development"
  };

  const mockStudents = [
    {
      studentId: "1001",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@nbcc.ca",
      grades: {}
    },
    {
      studentId: "1002",
      firstName: "Sarah",
      lastName: "Lee",
      email: "sarah.lee@nbcc.ca",
      grades: {}
    }
  ];

  const [students, setStudents] = useState(mockStudents);

  // FILTER STATE
  const [selectedTerm, setSelectedTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("");

  // FILTER LOGIC
  const filteredTerms = useMemo(() => {
    let terms = Object.entries(termMap);

    if (selectedTerm) {
      terms = terms.filter(([term]) => term === selectedTerm);
    }

    if (selectedYear) {
      terms = terms.filter(([term]) =>
        term.includes(selectedYear === "1" ? "2025" : "2026")
      );
    }

    // Program filtering placeholder (expand when mapping exists)
    if (selectedProgram) {
      // Example: ITSD = all PROG courses
      terms = terms.map(([term, codes]) => [
        term,
        codes.filter(code =>
          selectedProgram === "ITSD"
            ? code.startsWith("PROG")
            : !code.startsWith("PROG")
        )
      ]);
    }

    return terms.filter(([codes]) => codes.length > 0);
  }, [selectedTerm, selectedYear, selectedProgram, termMap]);

  const filteredCourses = filteredTerms.flatMap(([codes]) => codes);

  const updateGrade = (studentId, courseCode, newGrade) => {
    setStudents(prev =>
      prev.map(s =>
        s.studentId === studentId
          ? { ...s, grades: { ...s.grades, [courseCode]: newGrade } }
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
    <button className="drawer-item">Students Management & CSV Import</button>
    <button className="drawer-item">Instructor Interface</button>
  </nav>
    </aside>
    <div className="instructor-container">

      {/* Sticky Page Title */}
      <h1 className="title">Instructor User Interface</h1>

      {/* FILTER BAR */}
      <div className="filters">
        <select value={selectedTerm} onChange={e => setSelectedTerm(e.target.value)}>
          <option value="">All Terms</option>
          {Object.keys(termMap).map(term => (
            <option key={term} value={term}>{term}</option>
          ))}
        </select>

        <select value={selectedYear} onChange={e => setSelectedYear(e.target.value)}>
          <option value="">All Years</option>
          <option value="1">Year 1</option>
          <option value="2">Year 2</option>
        </select>

        <select value={selectedProgram} onChange={e => setSelectedProgram(e.target.value)}>
          <option value="">All Programs</option>
          <option value="ITSD">IT: Software Development</option>
          <option value="ITBA">IT: Business Analyst</option>
        </select>
      </div>

      {/* SCROLL WRAPPER */}
      <div className="scroll-container">
        <div className="grid-wrapper">
          <table className="course-grid">
            <thead>
              <tr>
                <th className="sticky-col col-1 sticky-top" rowSpan={2}>First Name</th>
                <th className="sticky-col col-2 sticky-top" rowSpan={2}>Last Name</th>
                <th className="sticky-col col-3 sticky-top" rowSpan={2}>Student ID</th>
                <th className="sticky-col col-4 sticky-top" rowSpan={2}>Email Address</th>

                {filteredTerms.map(([term, codes]) => (
                  <th key={term} colSpan={codes.length} className="term-header sticky-top">
                    {term}
                  </th>
                ))}
              </tr>

              <tr>
                {filteredCourses.map(code => (
                  <th key={code} className="course-header sticky-top">
                    <div className="course-header-content">
                      <span className="course-code">{code}</span>
                      <span className="course-title" title={courseTitles[code]}>
                        {courseTitles[code]}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {students.map(s => (
                <tr key={s.studentId}>
                  <td className="sticky-col col-1 student-data">{s.firstName}</td>
                  <td className="sticky-col col-2 student-data">{s.lastName}</td>
                  <td className="sticky-col col-3 student-data id-data">{s.studentId}</td>
                  <td className="sticky-col col-4 student-data email-data">{s.email}</td>

                  {filteredCourses.map(course => {
                    const grade = s.grades[course] || "Not Started";
                    const gradeClass = grade.toLowerCase().replace(" ", "-");

                    return (
                      <td key={course} className="cell">
                        <div className="select-container">
                          <select
                            className={`grade-select ${gradeClass}`}
                            value={grade}
                            onChange={e =>
                              updateGrade(s.studentId, course, e.target.value)
                            }
                          >
                            <option value="Pass">Pass</option>
                            <option value="Fail">Fail</option>
                            <option value="Withdrawn">Withdrawn</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Not Started">Not Started</option>
                          </select>
                        </div>
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
