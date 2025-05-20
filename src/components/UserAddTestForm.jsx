import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserAddTest } from '../redux/slice/TestSlice';
import '../css/UserAddTestForm.css';

const UserAddTestForm = ({ userId, onClose }) => {
  const [subject, setSubject] = useState('');
  const dispatch = useDispatch();
  const { isLoading, error, message } = useSelector((state) => state.test);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject) {
      alert('Please enter a subject');
      return;
    }


    dispatch(UserAddTest({ userId, subject }));
    setSubject('');
    onClose();
  };

  return (
    <div className="user-test-container">
      <form onSubmit={handleSubmit} className="user-test-form">
        <div className="user-test-input-container">
          <label className="user-test-label">Subject:</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter test subject"
            className="user-test-input"
          />
        </div>
        <button type="submit" disabled={isLoading} className="user-test-button">
          {isLoading ? 'Adding...' : 'Add Test'}
        </button>
      </form>


      {error && <div className="user-test-error">{error}</div>}
    </div>
  );
};

export default UserAddTestForm;
