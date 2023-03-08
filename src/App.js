
import {Container, Button } from 'react-bootstrap'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Products from './Components/Products';
import FormComponent from './Components/Form';
import NavbarComponent from './Components/NavbarComponent';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
        <BrowserRouter>
         <NavbarComponent />

    <Container className="App">
    <Routes>
   
     <Route element={  <FormComponent />} path="/post"></Route>
     <Route element={    <Products />} path="/"></Route>
    
      </Routes>
    </Container>
    </BrowserRouter>
    </>
  );
}

export default App;
