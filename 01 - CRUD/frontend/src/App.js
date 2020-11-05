//The component that loads first and defines the route paths

import Header from './components/Header'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'

import Welcome from './components/Welcome'
import UserList from './components/UserList'
import AddUser from './components/AddUser'
import EditUser from './components/EditUser'

function App() {
  return (
    <Router>
      <Header />
      <Container>
        <Route path='/' component={Welcome} exact />
        <Route path='/userlist' component={UserList} />
        <Route path='/adduser' component={AddUser} />
        <Route path='/user/:id' component={EditUser} />
      </Container>
    </Router>
  );
}

export default App;
