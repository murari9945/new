import React, { useState } from 'react';

const UserInputForm = () => {
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [users, setUsers] = useState([]);
  const [formError, setFormError] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!username.trim() || !age.trim()) {
      setFormError('Please enter both username and age.');
      return;
    }

    if (isNaN(age) || +age <= 0) {
      setFormError('Please enter a valid age.');
      return;
    }

    setFormError('');
    const newUser = {
      id: new Date().getTime().toString(),
      username,
      age,
    };

    setUsers((prevUsers) => [...prevUsers, newUser]);
    setUsername('');
    setAge('');
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
          />
        </div>
        <div>
          <label>Age:</label>
          <input type="text" value={age} onChange={handleAgeChange} />
        </div>
        <button type="submit">Add User</button>
      </form>
      {formError && <p>{formError}</p>}
      <div>
        <h3>Users:</h3>
        {users.length === 0 ? (
          <p>No users added yet.</p>
        ) : (
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                Username: {user.username}, Age: {user.age}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserInputForm;
