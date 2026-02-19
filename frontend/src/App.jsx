import CreateProject from "./pages/CreateProject";
import Dashboard from "./pages/Dashboard";
import ProjectDetails from "./pages/ProjectDetails";
import { Routes, Route, Link } from "react-router";

function App() {
  return (
    <>
      <Routes>
        <Route
          index
          element={
            <>
              <Link to="/dashboard">Dashboard</Link>
            </>
          }
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="projects/:id" element={<ProjectDetails />} />
        <Route path="projects/create" element={<CreateProject />} />
      </Routes>
    </>
  );
}

export default App;
