import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Link } from 'react-router-dom'
import { decodeToken } from '../tools/constantes'

function NavBar() {
  const { usuario } = decodeToken()
  return (
    <Navbar expand="lg" className="bg-pateleta-300">
      <Container>
        <Link to="/">
          <Navbar.Brand href="/">ButtyBB</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link to="/clientes">
              <Nav.Link href="/clientes">Clientes</Nav.Link>
            </Link>
            <Link to="/proveedores">
              <Nav.Link href="/proveedores">Proveedores</Nav.Link>
            </Link>
            <Link to="/usuarios">
              <Nav.Link href="/usuarios">Usuarios</Nav.Link>
            </Link>
            <Link to="/productos">
              <Nav.Link href="/productos">Productos</Nav.Link>
            </Link>
            <NavDropdown title={usuario} id="basic-nav-dropdown">
              <Link to="/logout">
                <NavDropdown.Item href="/logout">
                  Cerrar Sesion.
                </NavDropdown.Item>
              </Link>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar
