import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import InstructorPage from "./pages/InstructorPage.jsx";
import StudentCSVImport from "./pages/Student & CSV Import.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/instructor" element={<InstructorPage />} />
      <Route path="/student-csv-import" element={<StudentCSVImport />} />
    </Routes>
  );
}