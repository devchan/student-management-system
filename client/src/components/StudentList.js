import React, { useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { setStudents, deleteStudent } from '../studentsSlice';

const GET_STUDENTS = gql`
  query GetStudents {
    students {
      id
      name
      age
      email
    }
  }
`;

const DELETE_STUDENT = gql`
  mutation DeleteStudent($id: ID!) {
    deleteStudent(id: $id) {
      id
    }
  }
`;

const StudentList = () => {
  const { loading, error, data } = useQuery(GET_STUDENTS);
  const dispatch = useDispatch();
  const students = useSelector(state => state.students);

  useEffect(() => {
    if (data) {
      dispatch(setStudents(data.students));
    }
  }, [data, dispatch]);

  const handleDelete = async (id) => {
    await client.mutate({ mutation: DELETE_STUDENT, variables: { id } });
    dispatch(deleteStudent(id));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Student List</h1>
      <ul>
        {students.map(student => (
          <li key={student.id}>
            {student.name} - {student.age} - {student.email}
            <button onClick={() => handleDelete(student.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;
