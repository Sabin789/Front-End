
import {Container, Button } from 'react-bootstrap'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Products from './Components/Products';
import FormComponent from './Components/Form';

function App() {
  return (
    <Container className="App">
     <FormComponent />
      <Products />

    </Container>
  );
}

export default App;
