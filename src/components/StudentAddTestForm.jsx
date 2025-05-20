// StudentAddTestForm.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTestsByUserId, addTestToStudent } from "../redux/slice/TestSlice";
import "../css/StudentAddTestForm.css"; // Assuming the CSS is in the same folder

const StudentAddTestForm = ({ studentId, userId, onClose }) => {
  const [selectedTests, setSelectedTests] = useState([]);
  const dispatch = useDispatch();
  const { tests, isLoading, error } = useSelector((state) => state.test);

  useEffect(() => {
    dispatch(fetchTestsByUserId(userId));
  }, [userId, dispatch]);

  const handleTestSelection = (testId) => {
    setSelectedTests((prev) =>
      prev.includes(testId) ? prev.filter((id) => id !== testId) : [...prev, testId]
    );
  };

  const handleSubmit = () => {
    if (selectedTests.length === 0) {
      alert("Please select at least one test.");
      return;
    }
    selectedTests.forEach((testId) => {
      dispatch(addTestToStudent({ studentId, testId }));
    });
    onClose(); // Close the form after submission
  };

  const testArray = tests?.$values || [];

  return (
    <div className="student-add-test-form-container">
      <h1 className="student-add-test-form-title">Add Tests to Student</h1>
      {isLoading && <p className="student-add-test-loading-text">Loading tests...</p>}
      {testArray.length > 0 && (
        <div className="student-add-test-selection-container">
          <h3 className="student-add-test-section-title">Select Tests</h3>
          <ul className="student-add-test-list">
            {testArray.map((test) => (
              <li key={test.id} className="student-add-test-item">
                <label>
                  <input
                    type="checkbox"
                    checked={selectedTests.includes(test.id)}
                    onChange={() => handleTestSelection(test.id)}
                    className="student-add-test-checkbox"
                  />
                  {test.subject}
                </label>
              </li>
            ))}
          </ul>
          <button onClick={handleSubmit} disabled={isLoading} className="student-add-test-submit-button">
            {isLoading ? "Adding..." : "Confirm"}
          </button>
        </div>
      )}
      {error && <div className="student-add-test-error-message">{error}</div>}
    </div>
  );
};

export default StudentAddTestForm;
