import React, { useState } from "react";
import axios from "axios";
import "./App.css";

// Simulated API endpoints for redundancy
const apiEndpoints = [
  "https://api1.example.com/enroll",
  "https://api2.example.com/enroll",
  "https://api3.example.com/enroll"
];

let currentEndpointIndex = 0;
const getNextEndpoint = () => {
  const endpoint = apiEndpoints[currentEndpointIndex];
  currentEndpointIndex = (currentEndpointIndex + 1) % apiEndpoints.length;
  return endpoint;
};

function App() {
  const [studentName, setStudentName] = useState("");
  const [course, setCourse] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    const endpoint = getNextEndpoint();

    try {
      const response = await axios.post(endpoint, {
        name: studentName,
        course: course
      });
      setStatus(`Success: ${response.data.message}`);
    } catch (error) {
      setStatus("Error: Enrollment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>Online Enrollment System</h1>
      <form className="enrollment-form" onSubmit={handleSubmit}>
        <label>
          Student Name:
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            required
          />
        </label>
        <label>
          Course:
          <input
            type="text"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            required
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Enrolling..." : "Enroll Now"}
        </button>
      </form>
      {status && <p className="status">{status}</p>}
    </div>
  );
}

export default App;