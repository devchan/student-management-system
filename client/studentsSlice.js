import { createSlice } from '@reduxjs/toolkit';

const studentsSlice = createSlice({
  name: 'students',
  initialState: [],
  reducers: {
    setStudents: (state, action) => action.payload,
    addStudent: (state, action) => [...state, action.payload],
    updateStudent: (state, action) => state.map(student =>
      student.id === action.payload.id ? action.payload : student
    ),
    deleteStudent: (state, action) => state.filter(student => student.id !== action.payload),
  },
});

export const { setStudents, addStudent, updateStudent, deleteStudent } = studentsSlice.actions;

export default studentsSlice.reducer;
