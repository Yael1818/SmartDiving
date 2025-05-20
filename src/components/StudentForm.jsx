import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addStudent, fetchStudentByTz } from "../redux/slice/studentSlice";
import StudentAddTestForm from "./StudentAddTestForm";
import '../css/AddStudentForm.css';

const AddStudentForm = ({ userId }) => {
  const [name, setName] = useState("");
  const [tz, setTz] = useState("");
  const [showTestForm, setShowTestForm] = useState(false);
  const [showSubmitButton, setShowSubmitButton] = useState(true);
  const [showForm, setShowForm] = useState(true); // מצב לשליטה בהצגת כל הקומפוננטה
  const dispatch = useDispatch();
  const { student, isLoading, error } = useSelector((state) => state.student);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !tz) {
      alert("Please fill in all fields");
      return;
    }

    try {
      await dispatch(addStudent({ userId, name, tz }));
      dispatch(fetchStudentByTz(tz));

      setShowTestForm(true); 
      setShowSubmitButton(false); // העלמת הכפתור בלבד
    } catch (error) {
      console.error("Failed to add student:", error);
    }
  };

  const handleConfirm = () => {
    setShowForm(false); // העלמת כל הקומפוננטה
  };

  return (
    showForm && ( // רק אם showForm true, הקומפוננטה תוצג
      <div className="add-student-container">
        <form onSubmit={handleSubmit} className="student-test-form">
          <div className="student-name-div">
            <label className="student-label">Name:</label>
            <input
              className="student-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter student's name"
            />
          </div>
          <div className="student-tz-div">
            <label className="student-label">TZ:</label>
            <input
              className="student-input"
              type="text"
              value={tz}
              onChange={(e) => setTz(e.target.value)}
              placeholder="Enter student's TZ"
            />
          </div>{showSubmitButton && (
          
            <button className="student-submit-btn" type="submit" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Student"}
            </button>
          )}
        </form>

        {showTestForm && (
          <StudentAddTestForm
            studentId={student?.id}
            userId={userId}
            onClose={handleConfirm} // סגירת כל הקומפוננטה
          />
        )}

        {error && <div className="student-error">{error}</div>}
      </div>
    )
  );
};

export default AddStudentForm;
