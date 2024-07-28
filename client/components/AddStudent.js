import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useMutation, gql } from '@apollo/client';
import { addStudent } from '../studentsSlice';

const ADD_STUDENT = gql`
  mutation AddStudent($name: String!, $age: Int!, $email: String!) {
    addStudent(name: $name, age: $age, email: $email) {
      id
      name
      age
      email
    }
  }
`;

const AddStudent = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const [addStudentMutation] = useMutation(ADD_STUDENT);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await addStudentMutation({ variables: { name, age: parseInt(age), email } });
    dispatch(addStudent(data.addStudent));
    setName('');
    setAge('');
    setEmail('');
  };

  return (
    <div>
      <h1>Add Student</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddStudent;
