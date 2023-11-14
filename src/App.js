import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./Components/Header";
import ProjectList from "./Projects/ProjectList";
import CreateProject from "./Projects/CreateProject";
import EditProject from "./Projects/EditProject";
import SingleProject from "./Projects/SingleProject";
import EditTask from "./Tasks/EditTask";
import CreateTask from "./Tasks/CreateTask";
import NotFound from "./NotFound";

function App() {
  return (
    <div className="app">
      <Router>
        <Header />
        <div className="max-w-4xl mx-auto">
          <div className="m-6 lg:mx-auto">
            <Routes>
              <Route exact path="/" element={ <ProjectList /> } />
              <Route exact path="/projects/create" element={ <CreateProject /> } />
              <Route exact path="/projects/edit/:projectid" element={ <EditProject /> } />
              <Route exact path="/projects/:projectid" element={ <SingleProject /> } />
              <Route exact path="/projects/:projectid/tasks/create" element={ <CreateTask /> } />
              <Route exact path="/projects/:projectid/tasks/:taskid/edit" element={ <EditTask /> } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
        
      </Router>   
    </div>
  );
}

export default App;
