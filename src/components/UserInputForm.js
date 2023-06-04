import React, { useState, useRef } from 'react';
import Modal from 'react-modal';

const UserInputForm = () => {
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [users, setUsers] = useState([]);
  const [formError, setFormError] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const usernameRef = useRef();
  const ageRef = useRef();
  const collegeNameRef = useRef();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleCollegeNameChange = (event) => {
    setCollegeName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newUsername = usernameRef.current.value.trim();
    const newAge = ageRef.current.value.trim();
    const newCollegeName = collegeNameRef.current.value.trim();

    if (!newUsername || !newAge || !newCollegeName) {
      setFormError('Please enter all fields.');
      openModal();
      return;
    }

    if (isNaN(newAge) || +newAge <= 0) {
      setFormError('Please enter a valid age.');
      openModal();
      return;
    }

    setFormError('');
    const newUser = {
      id: new Date().getTime().toString(),
      username: newUsername,
      age: newAge,
      collegeName: newCollegeName,
    };

    setUsers((prevUsers) => [...prevUsers, newUser]);
    setUsername('');
    setAge('');
    setCollegeName('');
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            ref={usernameRef}
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type="text"
            value={age}
            onChange={handleAgeChange}
            ref={ageRef}
          />
        </div>
        <div>
          <label>College Name:</label>
          <input
            type="text"
            value={collegeName}
            onChange={handleCollegeNameChange}
            ref={collegeNameRef}
          />
        </div>
        <button type="submit">Add User</button>
      </form>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Form Error Modal"
      >
        <h2>Error</h2>
        <p>{formError}</p>
        <button onClick={closeModal}>Close</button>
      </Modal>

      <div>
        <h3>Users:</h3>
        {users.length === 0 ? (
          <p>No users added yet.</p>
        ) : (
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                Username: {user.username}, Age: {user.age}, College Name: {user.collegeName}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserInputForm;
