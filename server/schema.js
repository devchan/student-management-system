const { gql } = require('apollo-server-express');

let students = [];

const typeDefs = gql`
  type Student {
    id: ID!
    name: String!
    age: Int!
    email: String!
  }

  type Query {
    students: [Student]
    student(id: ID!): Student
  }

  type Mutation {
    addStudent(name: String!, age: Int!, email: String!): Student
    updateStudent(id: ID!, name: String, age: Int, email: String): Student
    deleteStudent(id: ID!): Student
  }
`;

const resolvers = {
  Query: {
    students: () => students,
    student: (_, { id }) => students.find(student => student.id === id),
  },
  Mutation: {
    addStudent: (_, { name, age, email }) => {
      const newStudent = { id: `${students.length + 1}`, name, age, email };
      students.push(newStudent);
      return newStudent;
    },
    updateStudent: (_, { id, name, age, email }) => {
      const student = students.find(student => student.id === id);
      if (student) {
        if (name !== undefined) student.name = name;
        if (age !== undefined) student.age = age;
        if (email !== undefined) student.email = email;
      }
      return student;
    },
    deleteStudent: (_, { id }) => {
      const studentIndex = students.findIndex(student => student.id === id);
      if (studentIndex !== -1) {
        const deletedStudent = students.splice(studentIndex, 1);
        return deletedStudent[0];
      }
      return null;
    },
  },
};

module.exports = { typeDefs, resolvers };
