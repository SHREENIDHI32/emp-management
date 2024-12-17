import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./styles.css";

const EmployeeForm = () => {
  const [form, setForm] = useState({
    name: "",
    employeeId: "",
    email: "",
    phone: "",
    department: "",
    dateOfJoining: "",
    role: "",
  });

  const departments = ["HR", "Engineering", "Marketing", "Sales"];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!form.name || !form.employeeId || !form.email || !form.phone || !form.department || !form.dateOfJoining || !form.role) {
      toast.error("All fields are mandatory!");
      return false;
    }
    if (!emailRegex.test(form.email)) {
      toast.error("Invalid email format!");
      return false;
    }
    if (!phoneRegex.test(form.phone)) {
      toast.error("Phone number must be a 10-digit number!");
      return false;
    }
    if (new Date(form.dateOfJoining) > new Date()) {
      toast.error("Date of joining cannot be in the future!");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post("http://localhost:5000/api/employees", form);
      toast.success(response.data.message);
      setForm({ name: "", employeeId: "", email: "", phone: "", department: "", dateOfJoining: "", role: "" });
    } catch (error) {
      toast.error(error.response.data.message || "Submission failed!");
    }
  };

  const handleReset = () => {
    setForm({ name: "", employeeId: "", email: "", phone: "", department: "", dateOfJoining: "", role: "" });
  };

  return (
    <form className="employee-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name:</label>
        <input type="text" name="name" value={form.name} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Employee ID:</label>
        <input type="text" name="employeeId" value={form.employeeId} onChange={handleChange} maxLength="10" required />
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Phone Number:</label>
        <input type="text" name="phone" value={form.phone} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Department:</label>
        <select name="department" value={form.department} onChange={handleChange} required>
          <option value="">Select Department</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Date of Joining:</label>
        <input type="date" name="dateOfJoining" value={form.dateOfJoining} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Role:</label>
        <input type="text" name="role" value={form.role} onChange={handleChange} required />
      </div>
      <button type="submit">Submit</button>
      <button type="button" onClick={handleReset}>
        Reset
      </button>
    </form>
  );
};

export default EmployeeForm;
