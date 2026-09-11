import { Navbar, Nav, Container } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import logo from "../assets/react.svg";

function Header() {
  return (
    <header>
      <Navbar bg="dark" variant="dark" collapseOnSelect expand="md">
        <Container>
          <Navbar.Brand>
            <img src={logo} alt="logo" />
            HimalayanShop
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar" />
          <Navbar.Collapse id="navbar">
            <Nav className="ms-auto">
              <Nav.Link>
                <FaShoppingCart /> Cart
              </Nav.Link>
              <Nav.Link>
                <FaUser /> Login
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
