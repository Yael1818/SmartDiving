import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTestGroups } from '../redux/slice/testGroupsSlice';
import AddStudentForm from './StudentForm';
import AddTestForm from './UserAddTestForm';
import '../css/DataEntry.css';
import test from '../assets/test.jpg';
import student from '../assets/student.png';
import logo from '../assets/logo.jpg';

const DataEntry = () => {
  const [isTestOpen, setTestIsOpen] = useState(false);
  const [isStudentOpen, setStudentIsOpen] = useState(false);
  const [isTestGroupsVisible, setIsTestGroupsVisible] = useState(false);

  const dispatch = useDispatch();
  const { testGroups, isLoading, error } = useSelector((state) => ({
    testGroups: state.testGroups?.testGroups?.$values || [],
    isLoading: state.testGroups?.isLoading,
    error: state.testGroups?.error,
  }));


  let user = JSON.parse(localStorage.getItem('user'));
  const userId = user ? user.userId : null;

  useEffect(() => {
    if (userId && isTestGroupsVisible) {
      dispatch(fetchTestGroups(userId));
    }
  }, [dispatch, userId, isTestGroupsVisible]);

  const toggleTestForm = () => {
    setTestIsOpen(!isTestOpen);
  };
  const toggleStudentForm = () => {
    setStudentIsOpen(!isStudentOpen);
  };

  const handleLogoClick = () => {
    setIsTestGroupsVisible((prev) => !prev);
  };

  return (
    <div className="data-entry-container">
      <div className="data-entry-header"></div>

      <div className="data-entry-circle-container">


        <div>
          <div
            className="data-entry-circle"
            style={{ backgroundImage: `url(${student})` }}
            onClick={toggleStudentForm}
          ></div>

          {isStudentOpen && <AddStudentForm userId={userId} />}
        </div>
        <div
          className="data-entry-circle"
          style={{ backgroundImage: `url(${logo})` }}
          onClick={handleLogoClick}
        ></div>

        <div>
          <div
            className="data-entry-circle"
            style={{ backgroundImage: `url(${test})` }}
            onClick={toggleTestForm}
          ></div>

          {isTestOpen && <AddTestForm userId={userId} onClose={() => setTestIsOpen(false)} />}
        </div>
      </div>

      {isTestGroupsVisible && (
        <div className="data-entry-test-group-container">
          {isLoading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          {testGroups.length > 0 ? (
            testGroups.map((group, index) => (
              <div key={index}>
                <h2> {index + 1}קבוצה</h2>
                <ul className="data-entry-test-group-ul">
                  {group.tests.$values.map((test) => (
                    <li className="data-entry-test-group-li" key={test.id}>
                      {test.subject}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p>No test groups found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default DataEntry;
