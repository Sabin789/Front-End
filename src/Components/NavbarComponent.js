
import { Nav,Container,Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
const NavbarComponent = () => {
    return (  <Navbar bg="primary" variant="dark">
    <Container>
   <Link to={"/"} >  <Navbar.Brand>Navbar</Navbar.Brand></Link>
      <Nav className="me-auto">
      <Link to={"/"} className="nav-link"> Home</Link>
      <Link to={"/post"} className="nav-link"> New Product</Link>
      </Nav>
    </Container>
  </Navbar> );
}
 
export default NavbarComponent;