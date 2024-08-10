import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import StudentList from './components/StudentList';
import AddStudent from './components/AddStudent';
import UpdateStudent from './components/UpdateStudent';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={StudentList} />
        <Route path="/add" component={AddStudent} />
        <Route path="/update/:id" component={UpdateStudent} />
      </Switch>
    </Router>
  );
};

export default App;