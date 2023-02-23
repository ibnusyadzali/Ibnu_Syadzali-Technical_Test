import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

function MyNavbar() {
  return (
    <Navbar bg="white" className="Nav fixed-top">
      <Container>
        <Navbar.Brand>
          <img className="logo" src="https://res.cloudinary.com/dnh89xvo5/image/upload/v1677114961/My_Company_bmczx4.png" alt="" />
        </Navbar.Brand>
        <Link to={"/"} className="nav-link fw-bold" style={{ color: "#B99B6B" }}>
          My Company
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto fw-bold">
            <Link to={"/"} className="nav-link">
              Home
            </Link>
            <Link to={"/department"} className="nav-link">
              Department
            </Link>
            <Link to={"/jabatan"} className="nav-link">
              Jabatan
            </Link>
            <Link to={"/karyawan"} className="nav-link">
              Karyawan
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
