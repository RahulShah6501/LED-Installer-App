import React, { useState, useEffect } from "react";

function ProjectForm({ projectData, setProjectData }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Add a state to calculate measurements
  const [calculatedMeasurement, setCalculatedMeasurement] = useState("");

  useEffect(() => {
    // Example calculation: Display a calculated Niche Depth (just for example)
    if (projectData.screenSize && projectData.screenSize > 0) {
      let nicheDepth = parseFloat(projectData.screenSize) + 2; // Example calculation
      setCalculatedMeasurement(`Niche Depth: ${nicheDepth} inches`);
    }
  }, [projectData.screenSize]);

  return (
    <div>
      <h3>Project Information</h3>
      <div>
        <label>Project Title:</label>
        <input
          type="text"
          name="projectTitle"
          value={projectData.projectTitle}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Designer Name:</label>
        <input
          type="text"
          name="designerName"
          value={projectData.designerName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Department:</label>
        <input
          type="text"
          name="department"
          value={projectData.department}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Screen Size:</label>
        <input
          type="number"
          name="screenSize"
          value={projectData.screenSize}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Date:</label>
        <input
          type="date"
          name="date"
          value={projectData.date}
          onChange={handleChange}
        />
      </div>

      {/* Show calculated measurement */}
      <div style={{ marginTop: "20px", fontWeight: "bold" }}>
        {calculatedMeasurement && <p>{calculatedMeasurement}</p>}
      </div>
    </div>
  );
}

export default ProjectForm;
