import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, gql } from '@apollo/client';
import { updateStudent } from '../studentsSlice';

const UPDATE_STUDENT = gql`
  mutation UpdateStudent($id: ID!, $name: String, $age: Int, $email: String) {
    updateStudent(id: $id, name: $name, age: $age, email: $email) {
      id
      name
      age
      email
    }
  }
`;

const UpdateStudent = ({ match }) => {
  const { id } = match.params;
  const student = useSelector(state => state.students.find(student => student.id === id));
  const [name, setName] = useState(student.name);
  const [age, setAge] = useState(student.age);
  const [email, setEmail] = useState(student.email);
  const dispatch = useDispatch();
  const [updateStudentMutation] = useMutation(UPDATE_STUDENT);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await updateStudentMutation({ variables: { id, name, age: parseInt(age), email } });
    dispatch(updateStudent(data.updateStudent));
  };

  return (
    <div>
      <h1>Update Student</h1>
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
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateStudent;
