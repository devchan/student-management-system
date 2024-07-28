import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux';
import client from './apolloClient';
import { store } from './store';
import './App.css';
import StudentList from './components/StudentList';
import AddStudent from './components/AddStudent';
import UpdateStudent from './components/UpdateStudent';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/" exact component={StudentList} />
            <Route path="/add" component={AddStudent} />
            <Route path="/update/:id" component={UpdateStudent} />
          </Switch>
        </Router>
      </Provider>
    </ApolloProvider>
  );
};

export default App;
