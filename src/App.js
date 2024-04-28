import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Components/Login';
import { Container } from'react-bootstrap';
import Header from './Components/Header';
import Contacts from './Components/Contacts';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  const isAuthenticated = sessionStorage.getItem('token');
  return (
    <div className="App">
      <Header Auth={isAuthenticated}></Header>
      <Container>
      <Router>
        <Routes>
          <Route exact path="/" element={<Contacts />} />
          <Route exact path="/login" element={<Login />} />
          <Route render={() => isAuthenticated ? <Contacts /> : <Navigate to="/login" replace={true} />} />
        </Routes>
      </Router>
      </Container>
    </div>
  );
}

export default App;