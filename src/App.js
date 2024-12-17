import React from "react";
import EmployeeForm from "./components/EmployeeForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <h1>Employee Management System</h1>
      <EmployeeForm />
      <ToastContainer />
    </div>
  );
}

export default App;
